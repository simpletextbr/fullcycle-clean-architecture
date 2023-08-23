import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../../infrastructure/product/sequelize/model/product.model";
import UpdateProductUseCase from "../../../../usecase/products/update/update.product.usecase";

describe("Update Product Use Case Integration Test", () => {
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

  const input = {
    id: "1",
    name: "Product 1 updated",
    price: 200,
  };

  it("should update a product", async () => {
    const product = new Product("1", "Product 1", 100);

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const usecase = new UpdateProductUseCase(productRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: "1",
      name: "Product 1 updated",
      price: 200,
    });
  });
});
