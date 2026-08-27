import { dharmaOrchestrator } from '@/lib/agents/DharmaOrchestrator';
import { CausalityInput } from '@/lib/agents/CausalityAgent';
import { warStateEngine } from '@/lib/kurukshetra/WarStateEngine';
import { PrismaClient } from '@prisma/client';
import { auth } from '@/auth';

const prisma = new PrismaClient();

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const session = await auth();
    const { warDayId, eventId, decisionId, chosenOptionId } = await req.json();

    const decision = warStateEngine.getDecision(warDayId, decisionId);
    const chosenOption = decision?.options.find(o => o.id === chosenOptionId);
    const activeCharacters = warStateEngine.getActiveCharacters(warDayId).map((c: any) => c.characterId);

    if (!decision || !chosenOption) {
      return Response.json({ error: "Invalid canonical constraints" }, { status: 400 });
    }

    // Prepare causality inputs
    const inputs: CausalityInput = {
      decisionId,
      chosenOptionId,
      originEventId: eventId,
      originDay: warDayId,
      activeCharacters
    };

    // Construct context for orchestrator
    const context = {
      request: {
        message: `I choose: ${chosenOption.text}`,
        category: 'ALTERNATE_TIMELINE' as const,
      },
      userContext: null, // Could fetch from journeyService if needed
      canonicalContext: {
        eventId,
        warDayId,
      }
    };

    // Run the Alternate Timeline Pipeline
    const { branchData, narrative } = await dharmaOrchestrator.runAlternateTimelinePipeline(context, inputs);

    if (!branchData) {
      return Response.json({ error: "Causality engine failed to branch." }, { status: 500 });
    }

    // Persist to database
    let userId = session?.user?.id;
    if (!userId) {
      // Find guest user or create dummy for unauthenticated demo
      const guest = await prisma.user.findFirst({ where: { email: 'guest@dharmaverse.com' } });
      if (guest) userId = guest.id;
      else userId = (await prisma.user.create({ data: { email: 'guest@dharmaverse.com', isGuest: true }})).id;
    }

    const savedBranch = await prisma.simulationBranch.create({
      data: {
        userId,
        originDay: warDayId,
        originEventId: eventId,
        originState: 'active', // Should fetch from warStateEngine
        decisionId,
        chosenOptionId,
        branchSummary: branchData.branchSummary,
        causalNodes: branchData.causalNodes as any,
        affectedCharacters: branchData.causalNodes.flatMap(n => n.affectedCharacters),
        alteredEvents: branchData.alteredEvents,
        alteredRelationships: branchData.alteredRelationships,
        divergences: branchData.divergences,
        confidence: branchData.confidence,
        status: 'ACTIVE'
      }
    });

    return Response.json({ 
      branchId: savedBranch.id, 
      narrative,
      branchData 
    });

  } catch (error) {
    console.error("Alternate Timeline API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
