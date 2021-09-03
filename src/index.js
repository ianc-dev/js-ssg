const fs = require("fs");
const postMethods = require("./posts.js");
const addHomePage = require("./homepage.js");
const config = require("./config");

const posts = fs
  .readdirSync(config.dev.postsdir)
  .map(post => post.slice(0, -3))
  .map(post => postMethods.createPost(post));

if (!fs.existsSync(config.dev.outdir)) fs.mkdirSync(config.dev.outdir);

postMethods.createPosts(posts);
addHomePage(posts)
