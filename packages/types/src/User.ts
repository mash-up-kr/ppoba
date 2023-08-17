export type User = {
  id: string;

  name: string;

  // '10-19' | '20-29' | '30-39' | ...
  age: string;

  gender: 'male' | 'female' | 'unknown';

  createdAt: Date;

  updatedAt: Date;
};
