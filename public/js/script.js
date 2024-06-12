document.addEventListener("DOMContentLoaded", () => {
  $("#open-post-form").click(function() {
      $(".create-post").toggle(300, function() { // 400 ms toggle duration
          $(this).toggleClass("opacity-effect");
      });
  });

  $('.post').readmore({ speed: 75, lessLink: '<a href="#">Read less</a>' });
});