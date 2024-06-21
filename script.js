"use strict";

// Page load animation
function playAnimationOnPageLoad() {
  const pageLoadTl = gsap.timeline();
  pageLoadTl
    .to("#slide__up", {
      yPercent: 0,
      y: 0,
      stagger: 0.05,
      delay: 1.5,
      ease: "power1.out",
    })
    .to(
      ".archive__heading",
      {
        left: "0%",
        xPercent: 0,
        x: 0,
        ease: "expo.inOut",
        duration: 1.4,
      },
      "<+0.725"
    )
    .to(
      [".navigation__logo--link", ".navigation__btn"],
      {
        autoAlpha: 1,
        duration: 1,
        ease: "power2.out",
      },
      "<+0.5"
    )
    .to(
      ".archive__images .image__container",
      {
        yPercent: 0,
        y: 0,
        autoAlpha: 1,
        stagger: 0.0525,
        delay: 1.5,
        ease: "power1.out",
      },
      "<-1.55"
    );
}

// Animate gallery image on window scroll
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

window.addEventListener("load", () => {
  animateGalleryOnScroll();
  playAnimationOnPageLoad();
});

// Scale and transform images in the gallery on click
const imageContainers = document.querySelectorAll(".image__container");
let isTransformed = false;

for (let i = 0; i < imageContainers.length; i++) {
  function xTranslateValue() {
    const windowInnerWidth = window.innerWidth;
    const imageRectXValue = imageContainers[i].getBoundingClientRect().x;
    const imageWidth = imageContainers[i].getBoundingClientRect().width * 1.6;

    return windowInnerWidth - imageRectXValue - imageWidth;
  }

  function yTranslateValue() {
    const imageHeight = imageContainers[i].getBoundingClientRect().height * 2;

    return -imageHeight;
  }

  const scaleImageTl = gsap.timeline({ paused: true });

  scaleImageTl.to(imageContainers[i], {
    x: () => xTranslateValue(),
    y: () => yTranslateValue(),
    scale: 2,
    duration: 1.5,
    ease: "expo.inOut",
  });

  imageContainers[i].addEventListener("click", () => {
    if (!isTransformed) {
      scaleImageTl.play();
    } else {
      scaleImageTl.reverse();
    }
    isTransformed = !isTransformed;
  });
}

// Toggle the grid visualizer
document.addEventListener("keydown", (event) => {
  if (event.shiftKey && event.key.toLowerCase() === "g") {
    document.querySelector(".overlay").classList.toggle("active");
  }
});
