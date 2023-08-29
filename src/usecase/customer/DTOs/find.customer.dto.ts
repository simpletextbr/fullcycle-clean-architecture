export interface InputFindCustomerDto {
  id: string;
}

export interface OutputFindCustomerDto {
  id: string;
  name: string;
  active: boolean;
  rewardPoints: number;
  address: {
    street: string;
    city: string;
    number: number;
    zip: string;
  };
}
