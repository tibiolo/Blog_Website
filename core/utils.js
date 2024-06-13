async function loadPostsFromFile() {
  try {
    const data = await fs.promises.readFile("posts.json", "utf8");
    if (data.length() == 0) {
      return [];
    }
    return JSON.parse(data) 
  }
}