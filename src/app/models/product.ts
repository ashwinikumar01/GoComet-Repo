import { ShirtSize } from './memory';

export class Product {
  id: number;
  name?: string;
  price?: number;
  color?: string;
  shirtType?: string;
  careInstruction?: string;
  shirtFabric?: string;
  sleeveType?: string;
  sizeChart?: string;
  detailedInfo?: string;
  chartRefer?: string;
  images?: string[];
  shirtSize?: ShirtSize[];
}
