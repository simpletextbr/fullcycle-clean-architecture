import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../../infrastructure/product/sequelize/model/product.model";
import ListProductUseCase from "../../../../usecase/products/list/list.products.usecase";

describe("List Product Use Case Integration Test", () => {
  let sequelize: Sequelize;
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list products", async () => {
    const product = new Product("1", "Product 1", 100);
    const product2 = new Product("2", "Product 2", 200);
    const products = [product, product2];

    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
    await productRepository.create(product);
    await productRepository.create(product2);

    const output = await usecase.execute({});

    expect(output.products.length).toBe(2);
    expect(output.products[0]).toEqual({
      id: "1",
      name: "Product 1",
      price: 100,
    });
    expect(output.products[1]).toEqual({
      id: "2",
      name: "Product 2",
      price: 200,
    });
  });
});
