import { ShirtSize } from './shirt-size';

export class Product {
  id: number;
  brand?: string;
  price?: number;
  color?: string;
  gender?: string;
  popularity?: number;
  customerRating?: number;
  betterDiscount?: number;
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
