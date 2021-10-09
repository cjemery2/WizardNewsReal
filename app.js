const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res)=>{
  const posts = postBank.list()
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`

     res.send(html);
});

app.get("/", (req, res) => res.send());

const PORT = 3000;


app.use(express.static('public'))
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  
    if (!post.id) {
      res.status(404)
       const html = `<!DOCTYPE html>
       <html>
       <head>
         <title>Wizard News</title>
         <link rel="stylesheet" href="/style.css" />
       </head>
       <body>
         
           <header><img src="/logo.png"/>Wizard News</header>
            <h1> POST NOT FOUND</h1>
             
              
          
         
       </body>
     </html>`;
          res.send(html)
      // If the post wasn't found, just throw an error
      // throw new Error('Not Found')
  
    } else{
  let html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>
     
    </div>
  </body>
</html>`
  res.send(html);
};
    
  }
  // ... Otherwise, send the regular post detail HTML
)
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});

