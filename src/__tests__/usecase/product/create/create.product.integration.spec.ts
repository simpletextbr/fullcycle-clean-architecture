import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../../infrastructure/product/sequelize/model/product.model";
import CreateProductUseCase from "../../../../usecase/products/create/create.product.usecase";

describe("Create Product Use Case Integration Test", () => {
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

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const input = {
      name: "Product 1",
      price: 100,
    };

    const output = {
      id: expect.any(String),
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });
});
