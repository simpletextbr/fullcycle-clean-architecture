import Product from "../../../../domain/product/entity/product";
import UpdateProductUseCase from "../../../../usecase/products/update/update.product.usecase";

const product = new Product("1", "Product 1", 100);

const mockProductRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(product),
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
  };
};

describe("Update Product Use Case unit Test", () => {
  it("should update a product", async () => {
    const productRepository = mockProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "Product 1 updated",
      price: 200,
    };

    const output = {
      id: "1",
      name: "Product 1 updated",
      price: 200,
    };

    const result = await usecase.execute(input);
    expect(result).toEqual(output);
  });

  it("should not update a product with no name", async () => {
    const productRepository = mockProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);

    const input = {
      id: "1",
      name: "",
      price: 200,
    };

    await expect(usecase.execute(input)).rejects.toThrowError(
      "Name is required"
    );
  });
});
