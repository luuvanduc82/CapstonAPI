function Product(id, name, price, image, type) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.image = image;
  this.dec = type;
}

document.addEventListener("DOMContentLoaded", function () {
  var stickySection = document.querySelector(".sticky-pro");
  if (stickySection) {
    function handleScroll() {
      var scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;

      if (scrollTop > 80) {
        // Cuộn xuống và vị trí scrollTop lớn hơn 80
        if (!stickySection.classList.contains("active")) {
          stickySection.classList.add("active");
        }
      } else {
        // Cuộn lên hoặc vị trí scrollTop nhỏ hơn hoặc bằng 80
        if (stickySection.classList.contains("active")) {
          stickySection.classList.remove("active");
        }
      }
    }
  }
  window.addEventListener("scroll", handleScroll);
});
