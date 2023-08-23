import ProductFactory from "../../../../domain/product/factory/product.factory";

describe("Product factory unit tests", () => {
  it("should create a product", () => {
    let product = ProductFactory.create("Product 1", 100);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product 1");
    expect(product.price).toBe(100);
  });
});
