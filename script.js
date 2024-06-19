"use strict";

// gsap.registerPlugin(CustomEase, Flip);

// CustomEase.create("ease-in-quad", "0.55,0.085,0.68,0.53");
// CustomEase.create("ease-in-cubic", "0.55,0.055,0.675,0.19");
// CustomEase.create("ease-in-quart", "0.895,0.03,0.685,0.22");
// CustomEase.create("ease-in-quint", "0.755,0.05,0.855,0.06");
// CustomEase.create("ease-in-expo", "0.95,0.05,0.795,0.035");
// CustomEase.create("ease-in-circ", "0.6,0.04,0.98,0.335");
// CustomEase.create("ease-out-quad", "0.25,0.46,0.45,0.94");
// CustomEase.create("ease-out-cubic", "0.215,0.61,0.355,1");
// CustomEase.create("ease-out-quart", "0.165,0.84,0.44,1");
// CustomEase.create("ease-out-quint", "0.23,1,0.32,1");
// CustomEase.create("ease-out-expo", "0.19,1,0.22,1");
// CustomEase.create("ease-out-circ", "0.075,0.82,0.165,1");
// CustomEase.create("ease-in-out-quad", "0.455,0.03,0.515,0.955");
// CustomEase.create("ease-in-out-cubic", "0.645,0.045,0.355,1");
// CustomEase.create("ease-in-out-quart", "0.77,0,0.175,1");
// CustomEase.create("ease-in-out-quint", "0.86,0,0.07,1");
// CustomEase.create("ease-in-out-expo", "1,0,0,1");
// CustomEase.create("ease-in-out-circ", "0.785,0.135,0.15,0.86");

// window.addEventListener("DOMContentLoaded", playAnimationOnPageLoad);

// function playAnimationOnPageLoad() {}

// Animate the gallery image on window scroll
function animateGalleryOnScroll() {
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  let currentX = 0;
  let lastScrollY = 0;
  let startY = 0;
  let isTouching = false;

  const archiveImageGallery = document.querySelector(".archive__images");

  function handleWheelEvent(e) {
    lastScrollY += e.deltaY;
    const maxScroll = archiveImageGallery.scrollWidth - window.innerWidth;
    lastScrollY = Math.min(Math.max(lastScrollY, 0), maxScroll);
  }

  function handleTouchStart(e) {
    isTouching = true;
    startY = e.touches[0].pageY;
  }

  function handleTouchMove(e) {
    if (!isTouching) return;
    const touchY = e.touches[0].pageY;
    const deltaY = startY - touchY;
    startY = touchY;
    lastScrollY += deltaY;
    const maxScroll = archiveImageGallery.scrollWidth - window.innerWidth;
    lastScrollY = Math.min(Math.max(lastScrollY, 0), maxScroll);
  }

  function handleTouchEnd() {
    isTouching = false;
  }

  function addEventListeners() {
    if ("ontouchstart" in window) {
      window.addEventListener("touchstart", handleTouchStart);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    }
    if ("onwheel" in window) {
      window.addEventListener("wheel", handleWheelEvent);
    }
  }

  function removeEventListeners() {
    window.removeEventListener("touchstart", handleTouchStart);
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
    window.removeEventListener("wheel", handleWheelEvent);
  }

  function animate() {
    currentX = lerp(currentX, lastScrollY, 0.06);
    archiveImageGallery.style.transform = `translateX(-${currentX}px)`;
    requestAnimationFrame(animate);
  }

  addEventListeners();
  animate();

  // Listen for screen size changes and adjust event listeners accordingly
  window.addEventListener("resize", () => {
    removeEventListeners();
    addEventListeners();
  });
}

animateGalleryOnScroll();

// Toggle the grid visualizer
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "g") {
    document.querySelector(".overlay").classList.toggle("active");
  }
});
