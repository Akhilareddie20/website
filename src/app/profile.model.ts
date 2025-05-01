// src/app/models/profile.model.ts
export interface Address {
  plot: string;
  village: string;
  street: string;
  district: string;
  state: string;
}

export interface Profile {
  id: number;
  name: string;
  email: string;
  address: Address;
}