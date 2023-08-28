import express, { Request, Response } from "express";
import { InputCreateCustomerDto } from "../../../usecase/customer/DTOs/create.customer.dto";
import CreateCustomerUseCase from "../../../usecase/customer/create/create.customer.usecase";
import customerRepository from "../../consumer/repository/customer.repository";

export const customerRoute = express.Router();

customerRoute.post("/", async (req: Request, res: Response) => {
  const usecase = new CreateCustomerUseCase(new customerRepository());

  try {
    const customerDto: InputCreateCustomerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        zip: req.body.address.zip,
        city: req.body.address.city,
      },
    };
    const result = await usecase.execute(customerDto);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ message: err });
  }
});
