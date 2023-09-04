import express, { Request, RequestHandler, Response } from "express";
import { InputCreateProductDto } from "../../../usecase/products/DTOs/create.product.dto";
import CreateProductUseCase from "../../../usecase/products/create/create.product.usecase";
import ListProductUseCase from "../../../usecase/products/list/list.products.usecase";
import ProductRepository from "../../product/repository/product.repository";
import { ProductListPresenter } from "../presenters/list.presenter";

export const productRoute = express.Router();

productRoute.post("/", (async (req: Request, res: Response) => {
  const usecase = new CreateProductUseCase(new ProductRepository());
  try {
    const productDto: InputCreateProductDto = {
      name: req.body.name,
      price: req.body.price,
    };

    const result = await usecase.execute(productDto);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
}) as RequestHandler);

productRoute.get("/", (async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const result = await usecase.execute({});
  res.format({
    json: async () => res.status(200).send(result),
    xml: async () => res.status(200).send(ProductListPresenter.toXML(result)),
  });
}) as RequestHandler);
