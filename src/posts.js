const config = require("./config");
const fs = require("fs");
const fm = require("front-matter");
const marked = require("marked");

const posthtml = data => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="${data.attributes.description}" />
<title>${data.attributes.title}</title>

</head>
<body>

<article>
<h2> ${data.attributes.title} </h2>
<p> ${new Date(parseInt(data.attributes.date)).toDateString()} </p>
<hr/>
${data.body}
<hr/>
</article>
`;

const createPost = postPath => {
  const data = fs.readFileSync(`${config.dev.postsdir}/${postPath}.md`, "utf8");
  const content = fm(data);
  content.body = marked(content.body);
  content.path = postPath;
  return content;
};

const createPosts = posts => {
  posts.forEach(post => {
      if (!fs.existsSync(`${config.dev.outdir}/${post.path}`))
      fs.mkdirSync(`${config.dev.outdir}/${post.path}`);

      fs.writeFile(
          `${config.dev.outdir}/${post.path}/index.html`,
          posthtml(post),
          e => {
          if (e) throw e;
          console.log(`${post.path}/index.html was created successfully`);
          }
          );
      });
};

module.exports = {
createPost: createPost,
            createPosts: createPosts
}
