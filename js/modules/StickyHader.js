export default function StickyHeader() {
  window.addEventListener("scroll", function (e) {
    let value = e.target.documentElement.scrollTop;

    if (value > 100) {
      this.document.querySelector(".header").classList.add("transparent");
    } else {
      this.document.querySelector(".header").classList.remove("transparent");
    }
  });
}
