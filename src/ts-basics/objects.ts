let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "Tim",
  retire: (date: Date) => {
    console.log(date);
  }
};

console.log(employee.id);
console.log(employee.name);
employee.retire(new Date("2030-12-31T00:00:00Z"));