const express = require('express');
const app = express();
const Post = require('./api/models/post');
const postsData = new Post();
const multer = require('multer');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      cb(null, './uploads');
   },
   filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
   },
});

// Specifies mimetype per file type uploaded
const getExt = (mimeType) => {
   switch (mimeType) {
      case 'image/png':
         return '.png';
      case 'image/jpeg':
         return '.jpeg';
   }
};

const upload = multer({ storage: storage });

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   next();
});

app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.get('/api/posts', (req, res) => {
   res.status(200).send(postsData.readData());
});

app.get('/api/posts/:id', (req, res) => {
   let postId = req.params.id;
   const foundPost = postsData.getIndividualBlog(postId);
   if (foundPost) {
      res.status(200).send(foundPost);
   } else {
      res.status(404).send('Post not Found');
   }
});

app.get('/', (req, res) => {
   res.send('Hello World!');
});

app.post('/api/posts', upload.single('post-image'), (req, res) => {
   const imageUrl = req.file.path.replace(/\\/g, '/');
   let newPost = {
      id: `${Date.now()}`,
      title: req.body.title,
      content: req.body.content,
      post_image: `${imageUrl}`,
      added_date: `${Date.now()}`,
   };
   postsData.add(newPost);
   res.status(202).send('okay');
});

app.listen(process.env.PORT || 3000, () => {
   console.log('listening on port 3000');
});
