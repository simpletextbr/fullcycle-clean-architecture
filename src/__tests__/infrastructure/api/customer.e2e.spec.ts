import request from "supertest";
import { app, sequelize } from "../../../infrastructure/api/express";

describe(" E2E Test for Customer API", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "John Doe",
        address: {
          street: "123 Main St",
          number: 1,
          zip: "12345",
          city: "Anytown",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual("John Doe");
    expect(response.body.address.street).toEqual("123 Main St");
    expect(response.body.address.number).toEqual(1);
    expect(response.body.address.zip).toEqual("12345");
    expect(response.body.address.city).toEqual("Anytown");
  });
});
