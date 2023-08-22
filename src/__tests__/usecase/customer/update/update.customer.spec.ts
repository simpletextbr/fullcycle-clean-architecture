import Address from "../../../../domain/customer/entity/VOs/address";
import CustomerFactory from "../../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "../../../../usecase/customer/update/update.customer.usecase";

describe("Update Customer Use Case unit Test", () => {
  const customer = CustomerFactory.createWithAddress(
    "John Doe",
    new Address("street 1", 1, "12345-678", "city 1")
  );

  const input = {
    id: customer.id,
    name: "John updated",
    active: true,
    rewardpoints: 0,
    address: {
      street: "street updated",
      city: "city updated",
      number: 2,
      zip: "12345-678-updated",
    },
  };

  const mockCustomerRepository = () => {
    return {
      create: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      update: jest.fn(),
    };
  };

  it("should update customer", async () => {
    const customerRepository = mockCustomerRepository();
    const usecase = new UpdateCustomerUseCase(customerRepository);

    const result = await usecase.execute(input);

    expect(result).toEqual(input);
  });
});
