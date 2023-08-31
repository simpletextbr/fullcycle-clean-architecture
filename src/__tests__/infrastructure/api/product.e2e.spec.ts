import request from "supertest";
import { app, sequelize } from "../../../infrastructure/api/express";

describe(" E2E Test for Product API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual("Product 1");
    expect(response.body.price).toEqual(10);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 2",
    });

    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app).post("/product").send({
      name: "Product 1",
      price: 10,
    });

    expect(response.status).toBe(201);

    const response2 = await request(app).post("/product").send({
      name: "Product 2",
      price: 20,
    });

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toEqual(3);
    const product1 = listResponse.body.products[1];
    expect(product1.name).toEqual("Product 1");
    expect(product1.price).toEqual(10);
    const product2 = listResponse.body.products[2];
    expect(product2.name).toEqual("Product 2");
    expect(product2.price).toEqual(20);
  });
});
