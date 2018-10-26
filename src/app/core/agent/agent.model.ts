import {Device} from '../ix-api/device.model';

/**
 * Represents an Agent
 */
export interface Agent {
  /**
   * Id of agent
   */
  publicId: string;

  /**
   * Name of agent
   */
  name: string;

  /**
   * Lsi server of agent
   */
  lsiServer: {
    /**
     * Entrypoint of lsi server
     */
    entryPoint: string;
  };
  /**
   * Devices of agent
   */
  devices: Device[];
}
