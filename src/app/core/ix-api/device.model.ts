import {Tag} from './tag.model';

/**
 * Represents a device
 * @ignore
 */
export interface Device {
  publicId: string;
  name: string;
  tags: Tag[];
}
