import { characters, moments } from '@/data/lore';
import { mapLocations } from '@/data/mapData';
import { ExploredNode } from './NarrativeContext';

export class LoreRetrievalService {
  /**
   * Retrieves canonical character data safely for the LLM context.
   */
  getCharacterContext(characterId: string) {
    const char = characters.find((c) => c.id === characterId);
    if (!char) return null;

    // Filter out UI specific data (like image paths, colors) to save tokens
    return {
      name: char.name,
      title: char.title,
      archetype: char.archetype,
      description: char.description,
      speechStyle: char.speechStyle,
      personalityTraits: char.personalityTraits,
      strengths: char.strengths,
      weaknesses: char.weaknesses,
      relationships: char.relationships,
      timeline: char.timeline
    };
  }

  /**
   * Retrieves specific consciousness state for a character at a point in time
   */
  getCharacterConsciousness(characterId: string, stateId: string) {
    const char = characters.find((c) => c.id === characterId);
    if (!char || !char.consciousnessStates) return null;
    return char.consciousnessStates.find(s => s.id === stateId) || null;
  }

  /**
   * Retrieves the current event/moment context.
   */
  getEventContext(momentTitle: string) {
    const moment = moments.find(m => m.title === momentTitle);
    if (!moment) return null;

    return {
      title: moment.title,
      date: moment.timelineOrder,
      description: moment.description,
      tensions: moment.eventConsciousness?.eventTensions || [],
      objectives: moment.eventConsciousness?.eventObjectives || []
    };
  }

  /**
   * Retrieves a summary of the known entities based on the user's explored nodes.
   * Useful for informing the LLM about what the user already knows.
   */
  getKnownEntitiesSummary(knownCharacters: ExploredNode[], knownEvents: ExploredNode[]) {
    const charNames = knownCharacters
      .map(node => characters.find(c => c.id === node.id)?.name)
      .filter(Boolean);
      
    const eventNames = knownEvents
      .map(node => moments.find(m => m.id === node.id)?.title || mapLocations.find(l => l.id === node.id)?.name)
      .filter(Boolean);

    return {
      characters: charNames,
      events: eventNames
    };
  }
}

export const loreRetrievalService = new LoreRetrievalService();
