import { Product } from "./product";

export interface Item { 
  info: Product | undefined, 
  order: number, 
  total: number   
}