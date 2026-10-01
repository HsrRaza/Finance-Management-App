import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().default("5001"),
  MONGO_URI: z.string().default("mongodb://localhost:27017/financetracker"),
  JWT_SECRET: z.string().default("supersecretjwtkey12345"),
  CLIENT_URL: z.string().default("http://localhost:5173"),
});

const parseEnv = () => {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    process.exit(1);
  }

  return result.data;
};

export const env = parseEnv();
