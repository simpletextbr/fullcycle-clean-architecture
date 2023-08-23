import Product from "../../../../domain/product/entity/product";
import FindProductUseCase from "../../../../usecase/products/find/find.product.usecase";

const product = new Product("1", "Product 1", 100);

const mockProductRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find Product Use Case unit Test", () => {
  it("should find product by id", async () => {
    const productRepository = mockProductRepository();
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

  it("should not find product by id", async () => {
    const productRepository = mockProductRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const usecase = new FindProductUseCase(productRepository);
    await productRepository.create(product);

    const input = {
      id: "1",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
