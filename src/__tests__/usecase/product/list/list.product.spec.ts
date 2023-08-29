import Product from "../../../../domain/product/entity/product";
import ListProductUseCase from "../../../../usecase/products/list/list.products.usecase";

const product = new Product("1", "Product 1", 100);
const product2 = new Product("2", "Product 2", 200);
const products = [product, product2];

const mockProductRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve(products)),
    update: jest.fn(),
  };
};

describe("List Product Use Case unit Test", () => {
  it("should list products", async () => {
    const productRepository = mockProductRepository();
    const usecase = new ListProductUseCase(productRepository);

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
