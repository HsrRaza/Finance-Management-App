"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const app_1 = require("./app");
const port = env_1.env.PORT || 5001;
(0, db_1.connectDB)()
    .then(() => {
    app_1.app.listen(port, () => {
        console.log(`Server started successfully on port: ${port}`);
    });
})
    .catch((err) => {
    console.error("MongoDB connection failed:", err);
});
