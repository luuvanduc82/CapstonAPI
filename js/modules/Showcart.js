export default function Showcart() {
  const cart = document.querySelector(".cart");
  const modal = document.querySelector(".modal-cart");
  const overlay = document.querySelector(".overlay");
  const close = document.querySelector(".icon-close");
  cart.addEventListener("click", function (e) {
    modal.classList.toggle("active");
    overlay.classList.toggle("active");
  });
  close.addEventListener("click", function (e) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
  overlay.addEventListener("click", function (e) {
    modal.classList.remove("active");
    overlay.classList.remove("active");
  });
}
