import CreateCustomerUseCase from "../../../../usecase/customer/create/create.customer.usecase";

describe("Create Customer Use Case unit Test", () => {
  const input = {
    name: "John Doe",
    address: {
      street: "street 1",
      city: "city 1",
      number: 1,
      zip: "12345-678",
    },
  };

  const mockCustomerRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("should create customer", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual({
      id: expect.any(String),
      name: "John Doe",
      active: true,
      rewardpoints: 0,
      address: {
        street: "street 1",
        city: "city 1",
        number: 1,
        zip: "12345-678",
      },
    });
  });

  it("should throw an error when name is not provided", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.name = "";

    await expect(usecase.execute(input)).rejects.toThrow("Name is required");
  });

  it("should throw an error when street is not provided", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new CreateCustomerUseCase(customerRepository);

    input.address.street = "";

    await expect(usecase.execute(input)).rejects.toThrow("Street is required");
  });
});
