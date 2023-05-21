import express from 'express';
import morgan from 'morgan';
import router from './router';
import { config as parseEnvironmentVariables } from 'dotenv';
import connectToDB from './config/db';
import { errorHandler } from './middlewares/error-handler';
import { join, dirname  } from 'path';
import { fileURLToPath } from 'url';


parseEnvironmentVariables();
connectToDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}


// Mount Router
app.use(router)

app.get('/docs', (req, res, next) => {
    // Get the directory path of the current module
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const filePath = join(__dirname, '../documentation.html');
    res.sendFile(filePath);
});

app.use(errorHandler);


const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`Server started on PORT ${PORT}`);
});


//Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1)); //Take down server
});