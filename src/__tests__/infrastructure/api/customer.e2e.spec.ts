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
        name: "John Doe first",
        address: {
          street: "123 Main St",
          number: 1,
          zip: "12345",
          city: "Anytown",
        },
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toEqual("John Doe first");
    expect(response.body.address.street).toEqual("123 Main St");
    expect(response.body.address.number).toEqual(1);
    expect(response.body.address.zip).toEqual("12345");
    expect(response.body.address.city).toEqual("Anytown");
  });

  it("should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "John Doe",
    });

    expect(response.status).toBe(500);
  });

  it("should list all customers", async () => {
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

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        address: {
          street: "456 Main St",
          number: 2,
          zip: "6789",
          city: "Anytown",
        },
      });

    expect(response2.status).toBe(201);

    const listResponse = await request(app).get("/customer").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.customers.length).toBe(3);
    const customer = listResponse.body.customers[1];
    expect(customer.name).toBe("John Doe");
    expect(customer.address.street).toBe("123 Main St");
    const customer2 = listResponse.body.customers[2];
    expect(customer2.name).toBe("Jane Doe");
    expect(customer2.address.street).toBe("456 Main St");
  });

  it("should list all customers in XML", async () => {
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

    const response2 = await request(app)
      .post("/customer")
      .send({
        name: "Jane Doe",
        address: {
          street: "456 Main St",
          number: 2,
          zip: "6789",
          city: "Anytown",
        },
      });

    expect(response2.status).toBe(201);

    const listResponseXML = await request(app)
      .get("/customer")
      .set("Accept", "application/xml")
      .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain("<name>John Doe</name>");
    expect(listResponseXML.text).toContain("<street>123 Main St</street>");
  });
});
