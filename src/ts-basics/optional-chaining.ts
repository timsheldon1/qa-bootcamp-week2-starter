type Customer = {
  birthday?: Date;
};

function getCustomer(id: number): Customer | null {
  return id === 0
    ? null
    : { birthday: new Date("2000-01-01T00:00:00Z") };
}

console.log(getCustomer(0)?.birthday?.getFullYear());
console.log(getCustomer(1)?.birthday?.getFullYear());

const customerWithoutBirthday: Customer = {};
console.log(customerWithoutBirthday.birthday?.getFullYear());

export {};