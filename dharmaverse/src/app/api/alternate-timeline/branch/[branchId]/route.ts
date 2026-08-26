import { alternateTimelineEngine } from '@/lib/kurukshetra/AlternateTimelineEngine';

export async function GET(req: Request, { params }: { params: Promise<{ branchId: string }> }) {
  try {
    const resolvedParams = await params;
    const branch = alternateTimelineEngine.getBranch(resolvedParams.branchId);

    if (!branch) {
      return Response.json({ error: "Branch not found" }, { status: 404 });
    }

    return Response.json(branch);
  } catch (error) {
    console.error("Alternate Timeline GET API Error:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
