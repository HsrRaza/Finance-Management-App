/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateLast7DaysData = (incomes: any[]) => {
  const result: Record<string, number> = {};

  // create last 7 days with 0 values
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const day = date.toLocaleDateString("en-US", {
      weekday: "short",
    });

    result[day] = 0;
  }

  // add income values
  incomes.forEach((txn) => {
    const day = new Date(txn.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (result[day] !== undefined) {
      result[day] += Number(txn.amount);
    }
  });

  return Object.entries(result).map(([day, amount]) => ({
    name: day,
    income: amount,
  }));
};