export const EXPENSE_CATEGORIES = [
  "Food & Dining",
  "Shopping",
  "Housing & Rent",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Personal Care",
  "Travel",
  "Subscriptions",
  "Other",
] as const;

export const INCOME_SOURCES = [
  "Salary",
  "Freelance",
  "Investments",
  "Business",
  "Side Hustle",
  "Gifts & Grants",
  "Rental Income",
  "Other",
] as const;

export const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "#f97316", // orange
  Shopping: "#ec4899", // pink
  "Housing & Rent": "#3b82f6", // blue
  Transportation: "#8b5cf6", // purple
  Utilities: "#06b6d4", // cyan
  Entertainment: "#eab308", // yellow
  Healthcare: "#ef4444", // red
  Education: "#10b981", // emerald
  "Personal Care": "#d946ef", // fuchsia
  Travel: "#14b8a6", // teal
  Subscriptions: "#6366f1", // indigo
  Salary: "#10b981",
  Freelance: "#06b6d4",
  Investments: "#8b5cf6",
  Business: "#3b82f6",
  Other: "#6b7280", // gray
};
