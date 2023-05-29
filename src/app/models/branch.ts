export interface Branch {
    id: number;
    code: string;
    name: string;
    mnemonic: string;
    location: string;
    district: {
      id: number;
      name: string;
  };
}
