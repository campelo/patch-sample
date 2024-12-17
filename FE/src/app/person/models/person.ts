import { BaseDto } from "../../shared/models/base.dto";
import { Address } from "./address";

export class Person implements BaseDto {
  id!: string;
  name?: string;
  age?: number;
  address: Address = new Address();
}