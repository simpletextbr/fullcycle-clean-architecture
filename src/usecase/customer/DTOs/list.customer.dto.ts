export interface InputListCustomerDTO {}

type Customer = {
  id: string;
  name: string;
  active: boolean;
  rewardpoints: number;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
};

export interface OutputListCustomerDTO {
  customers: Customer[];
}
