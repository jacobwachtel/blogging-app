const API_URL = 'http://localhost:3001/api/posts/';
const API_BASE_URL = 'http://localhost:3001/';

window.onload = () => {
   getPost();
};

const getPostIdParam = () => {
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   return urlParams.get('id');
};

const getPost = () => {
   const postId = getPostIdParam();

   fetch(`${API_URL}${postId}`, {
      method: 'GET',
   })
      .then((response) => response.json())
      .then((data) => buildPost(data));
};

const buildPost = (data) => {
   const { title, content, post_image, added_date } = data;
   const postDate = new Date(parseInt(added_date)).toDateString();
   const postImage = `${API_BASE_URL}${post_image}`;

   document.querySelector('header').style.backgroundImage = `url(${postImage})`;
   document.getElementById('individual-post-title').innerText = title;
   document.getElementById(
      'individual-post-date'
   ).innerText = `Published on ${postDate}`;
   document.getElementById('individual-post-content').innerText = content;

   //    const headerImg = document.getElementById('post-header');
   //    headerImg.style.backgroundImage = `url${postImage}`;
};
