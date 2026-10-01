import { connectDB } from "./config/db";
import { env } from "./config/env";
import { app } from "./app";

const port = env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server started successfully on port: ${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
