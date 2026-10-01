export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  dashboard: {
    all: () => ["dashboard"] as const,
    summary: (period?: string) => ["dashboard", "summary", period ?? "30d"] as const,
  },
  transactions: {
    all: () => ["transactions"] as const,
    list: (filters?: Record<string, unknown>) => ["transactions", "list", filters] as const,
    detail: (id: string) => ["transactions", id] as const,
  },
  income: {
    all: () => ["income"] as const,
    list: (filters?: Record<string, unknown>) => ["income", "list", filters] as const,
  },
  expenses: {
    all: () => ["expenses"] as const,
    list: (filters?: Record<string, unknown>) => ["expenses", "list", filters] as const,
  },
};
