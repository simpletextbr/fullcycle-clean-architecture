import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../../infrastructure/product/repository/product.repository";
import ProductModel from "../../../../infrastructure/product/sequelize/model/product.model";
import FindProductUseCase from "../../../../usecase/products/find/find.product.usecase";

describe("Find Product Use Case Integration Test", () => {
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

  it("should find product by id", async () => {
    const product = new Product("1", "Product 1", 100);

    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
    await productRepository.create(product);

    const input = {
      id: "1",
    };

    const output = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });
});
