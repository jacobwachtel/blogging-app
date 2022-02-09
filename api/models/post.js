const PATH = './data.json';
const fs = require('fs');

class Post {
   get() {
      // Get Posts
      return this.readData();
   }

   getIndividualBlog(postId) {
      // Get single post
      const allPosts = this.readData();
      const foundPost = allPosts.find((post) => post.id == postId);
      return foundPost;
   }

   add(newPost) {
      //add new post
      const currentPosts = this.readData();
      currentPosts.unshift(newPost);
      this.storeData(currentPosts);
   }

   readData() {
      let rawdata = fs.readFileSync(PATH);
      let blog = JSON.parse(rawdata);
      return blog;
   }

   storeData(rawData) {
      let data = JSON.stringify(rawData);
      fs.writeFileSync(PATH, data);
   }
}

module.exports = Post;
