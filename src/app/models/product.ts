import { Memory } from "./memory";
export class Product {
  id: number;
  name?: string;
  price?: number;
  color?: string;
  memorySize?: string;
  display?: string;
  waterResistant?: string;
  camera?: string;
  frontCamera?: string;
  futures?: string;
  processor?: string;
  charging?: string;
  memory?: Memory[];
  images?: string[];
}
