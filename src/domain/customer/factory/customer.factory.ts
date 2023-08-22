import { v4 as uuid } from "uuid";
import Address from "../entity/VOs/address";
import Customer from "../entity/customer";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(uuid(), name);
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.Address = address;
    return customer;
  }
}
