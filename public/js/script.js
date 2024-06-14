document.addEventListener("DOMContentLoaded", () => {
  $("#open-post-form").click(function() {
    window.location.href = '/create_post';
  });
});


function redirectToPost(post) {
  window.location.href = `/post/${post.id}`
}