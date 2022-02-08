/**
 * TODO: Finish submitNewPost function to submit form data to the API
 */

const API_URL = 'http://localhost:3000/api/posts';

const submitNewPost = () => {
   //     // HINT: Use FormData to store data to send over
   //     // HINT: Redirect the user to home page after successful submission
   const form = new FormData();
   const title = document.getElementById('form-post-title').value;
   const content = document.getElementById('form-post-content').value;
   const imageFile = document.getElementById('form-post-image');
   console.log(title, content, imageFile.name);

   form.append('title', title);
   form.append('content', content);
   form.append('post-image', imageFile.files[0]);

   fetch(API_URL, {
      method: 'POST',
      body: form,
   }).then(() => {
      setTimeout(() => {
         window.location.href = 'index.html';
      }, 1000);
   });
};
