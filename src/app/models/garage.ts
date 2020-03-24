
interface Garage {
  _id: number,
  number: number,
  owner: {
    name: string,
    phone: string
  },
  payments: [
    {
      year: number,
      amount: number
    }
  ],
  length: number,
  width: number,
  height: number,
  manhole: boolean,
  electricity: boolean,
  water: boolean,
  forSale: boolean,
  buildDate: string,
  createdAt: string,
  updatedAt: string
}