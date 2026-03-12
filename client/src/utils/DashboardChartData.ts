/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateFinanceChartData = (
  incomes: any[],
  expenses: any[]
) => {

  const grouped: Record<string, { income: number; expense: number }> = {};

  // process income
  incomes.forEach((txn) => {
    const day = new Date(txn.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!grouped[day]) {
      grouped[day] = { income: 0, expense: 0 };
    }

    grouped[day].income += txn.amount;
  });

  // process expense
  expenses.forEach((txn) => {
    const day = new Date(txn.createdAt).toLocaleDateString("en-US", {
      weekday: "short",
    });

    if (!grouped[day]) {
      grouped[day] = { income: 0, expense: 0 };
    }

    grouped[day].expense += txn.amount;
  });

  return Object.entries(grouped).map(([day, values]) => ({
    name: day,
    income: values.income,
    expense: values.expense,
  }));
};