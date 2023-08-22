import Address from "../../../../domain/customer/entity/VOs/address";
import Customer from "../../../../domain/customer/entity/customer";
import FindCustomerUseCase from "../../../../usecase/customer/find/find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("street 1", 1, "12345-678", "city 1");
customer.Address = address;

const mockCustomerRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    update: jest.fn(),
  };
};

describe("Find Customer Use Case unit Test", () => {
  it("should find customer by id", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    const output = {
      id: "123",
      name: "John Doe",
      address: {
        street: "street 1",
        city: "city 1",
        number: 1,
        zip: "12345-678",
      },
    };

    const result = await usecase.execute(input);

    expect(result).toEqual(output);
  });

  it("should not find customer by id", async () => {
    const customerRepository = mockCustomerRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const usecase = new FindCustomerUseCase(customerRepository);
    await customerRepository.create(customer);

    const input = {
      id: "123",
    };

    expect(() => {
      return usecase.execute(input);
    }).rejects.toThrow("Customer not found");
  });
});
