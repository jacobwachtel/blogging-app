const API_URL = 'http://localhost:3000/api/posts';
const API_BASE_URL = 'http://localhost:3000/';

window.onload = () => {
   getPosts();
};

const getPosts = () => {
   fetch(API_URL, {
      method: 'GET',
   })
      .then((response) => response.json())
      .then((data) => buildPosts(data));
};

const buildPosts = (blogPosts) => {
   let blogPostContent = '';
   for (blog of blogPosts) {
      const { title, content, post_image, added_date, id } = blog;
      const postDate = new Date(parseInt(added_date)).toDateString();
      const postImage = `${API_BASE_URL}${post_image}`;
      const postLink = `/post.html?id=${id}`;
      blogPostContent += `
      <a class="post-link" href="${postLink}">
        <article class="post">               
            <div class="post-image" style="background-image: url(${postImage})"></div>
            <div class="post-information">
                <div class="post-id">${postDate}</div>          
                <div class="post-title"><h4>${title}</h4></div>
                <div class="post-content">${content}</div> 
            </div>
        </article>
      `;
   }
   document.querySelector('.blog-posts').innerHTML = blogPostContent;
   
};
