import { config } from "dotenv"
import { connectDb } from "./utils/db"
import { app } from "./app"


// config({path:"./env"})

const port = process.env.PORT ?? 5002


// db connection

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server started successfully on port: ${port}`);


        })

    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);

    })



