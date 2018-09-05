import {Agent} from '../agent/agent.model';

/**
 * Represents a Company
 */
export interface Company {

  /**
   * Id of company
   */
  publicId: string;

  /**
   * Name of company
   */
  name: string;

  /**
   * Agents of company
   */
  agents: Agent[];
}
