import CreateProductUseCase from "../../../../usecase/products/create/create.product.usecase";

const mockProductRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("Create Product Use Case unit Test", () => {
  it("should create a product", async () => {
    const productRepository = mockProductRepository();
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

  it("should not create a product with a price less than zero", async () => {
    const productRepository = mockProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: -100,
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Price cannot be less than 0");
  });
});
