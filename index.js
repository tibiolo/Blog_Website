import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [];

// Loads posts from a json file
async function loadPostsFromFile() {
    try {
        const data = await fs.promises.readFile("posts.json", "utf8");
        if (data.length === 0) {
            return [];
        }
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading posts.json file: ", error.message);
        return [];
    }
}

// Saves posts to a json file
async function savePostsToFile() {
    try {
        await fs.promises.writeFile("posts.json", JSON.stringify(posts), "utf8");
        console.log("Posts saved successfully.");
    } catch (error) {
        console.error("Error writing posts file", error.message);
        throw error;
    }
}

// Finds Posts using PostId
function findPostById(postId) {
    try {
        const foundPost = posts.find(post => post.id === postId);
        console.log("Post Found! successfully");
        return foundPost;
    } catch (error) {
        console.error("Error while looking for post", error.message);
        throw error;
    }
}

// Loads initial posts
loadPostsFromFile().then((loadedPosts) => {
    posts = loadedPosts;

    // Webapp Initialization
    app.get("/", (req, res) => {
        res.render(__dirname + "/views/index.ejs", {
            data: posts,
            showNav: true,
        });
    });

    // Post Form submission route - calls a function which saves the post
    app.post("/submit", async (req, res) => {
        const { author, title, content } = req.body;
        const newPost = {
            id: uuidv4(),
            author: author,
            title: title,
            content: content,
        };
        posts.push(newPost);
        try {
            await savePostsToFile(); // Await the save function
            res.redirect("/");
        } catch (error) {
            console.error("Error saving posts to file: ", error.message);
            res.status(500).send("Error saving posts to file");
        }
    });

}).catch((error) => {
    console.error("Error loading posts: ", error.message);
});


// Post Creation Route
app.get("/create_post", (req, res) => {
    res.render(__dirname + "/views/create_post.ejs");
})


// Post display Route
app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    console.log(postId);
    const foundPost = findPostById(postId);
    res.render(__dirname + "/views/display_post.ejs", {
        post: foundPost,
        showNav: true,
    });
});


// Server Listening Port
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
