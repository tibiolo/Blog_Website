import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"))
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render(__dirname + "/index.ejs")
})


app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})