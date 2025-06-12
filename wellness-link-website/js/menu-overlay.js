const menuToggle = document.querySelector(".menu-btn-container");
const menuOverlay = document.querySelector(".menu-overlay");
const menuContent = document.querySelector(".menu-content");
const menuPreviewImg = document.querySelector(".menu-preview-img");
const menuLinks = document.querySelectorAll(".link a");

let isOpen = false;
let isAnimating = false;

menuToggle.addEventListener("click", () => {
  if (!isOpen) openMenu();
  else closeMenu();
});

function cleanupPreviewImages() {
  const previewImages = menuPreviewImg.querySelectorAll("img");
  if (previewImages.length > 3) {
    for (let i = 0; i < previewImages.length - 3; i++) {
      menuPreviewImg.removeChild(previewImages[i]);
    }
  }
}

function resetPreviewImage() {
  menuPreviewImg.innerHTML = "";
  const defaultPreviewImg = document.createElement("img");
  defaultPreviewImg.src = "assets/images/menu-img-1.avif";
  menuPreviewImg.appendChild(defaultPreviewImg);
}

function animateMenuToggle(isOpening) {
  const open = document.querySelector("p#menu-open");
  const close = document.querySelector("p#menu-close");
  const iconIsOpen = document.querySelector("svg#open-icon");
  const iconIsClose = document.querySelector("svg#close-icon");

  // Hide the outgoing button
  gsap.to(isOpening ? open : close, {
    y: isOpening ? -10 : 10,
    rotation: 0,
    opacity: 0,
    delay: 0.25,
    duration: 0.5,
    ease: "power4.out",
    onComplete: () => {
      (isOpening ? open : close).style.display = "none";
      (isOpening ? close : open).style.display = "flex";
    },
  });
  gsap.to(isOpening ? iconIsOpen : iconIsClose, {
    y: isOpening ? -10 : 10,
    rotation: 0,
    opacity: 0,
    delay: 0.2,
    duration: 0.5,
    ease: "power4.out",
    onComplete: () => {
      (isOpening ? iconIsOpen : iconIsClose).style.display = "none";
      (isOpening ? iconIsClose : iconIsOpen).style.display = "flex";
    },
  });

  // Show the incoming button
  gsap.fromTo(
    isOpening ? close : open,
    { y: 10 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      delay: 0.5,
      duration: 0.5,
      ease: "power4.out",
    }
  );

  gsap.fromTo(
    isOpening ? iconIsClose : iconIsOpen,
    { y: 10 },
    {
      x: 0,
      y: 0,
      opacity: 1,
      delay: 0,
      duration: 0.5,
      ease: "power4.out",
    }
  );
}

function openMenu() {
  if (isAnimating || isOpen) return;
  isAnimating = true;

  animateMenuToggle(true);

  gsap.to(menuContent, {
    rotation: 0,
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
    duration: 1.25,
    ease: "power4.inOut",
  });

  gsap.to([".link a", ".social a"], {
    y: "0%",
    opacity: 1,
    duration: 1,
    delay: 0.75,
    stagger: 0.1,
    ease: "power3.out",
  });

  gsap.to(menuOverlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 175%, 0% 100%)",
    duration: 1.25,
    ease: "power4.inOut",
    onComplete: () => {
      isOpen = true;
      isAnimating = false;
      if (window.lenis) window.lenis.stop(); // stop scroll
    },
  });
}

function closeMenu() {
  if (isAnimating || !isOpen) return;
  isAnimating = true;

  animateMenuToggle(false);

  gsap.to(menuContent, {
    rotation: -15,
    x: -100,
    y: -100,
    scale: 1.5,
    duration: 1.25,
    opacity: 0,
    ease: "power4.inOut",
  });

  gsap.to(menuOverlay, {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    duration: 1.25,
    ease: "power4.inOut",
    onComplete: () => {
      isOpen = false;
      isAnimating = false;
      gsap.set([".link a", ".social a"], { y: "120%" });
      if (window.lenis) window.lenis.start();
      resetPreviewImage();
    },
  });
}

menuLinks.forEach((link) => {
  link.addEventListener("mouseover", () => {
    if (!isOpen || isAnimating) return;

    const imgSrc = link.getAttribute("data-img");
    if (!imgSrc) return;

    const previewImages = menuPreviewImg.querySelectorAll("img");
    if (
      previewImages.length > 0 &&
      previewImages[previewImages.length - 1].src.endsWith(imgSrc)
    )
      return;

    const newPreviewImg = document.createElement("img");
    newPreviewImg.src = imgSrc;
    newPreviewImg.style.opacity = "0";
    newPreviewImg.style.transform = "scale(1.25) rotate(10deg)";

    menuPreviewImg.appendChild(newPreviewImg);
    cleanupPreviewImages();

    gsap.to(newPreviewImg, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 0.75,
      ease: "power2.out",
    });
  });
});

const span = document.querySelector(".hover-slide");
const blackBg = document.querySelector(".menu-overlay");
const changeCircleColor = document.querySelector(".login-circle");
const signupBtnContainer = document.querySelector(".signup-btn-container");

const menuOverlayObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        span.classList.add("white-text-span");
        changeCircleColor.style.borderColor = "white";
        signupBtnContainer.classList.add("white-theme");
      } else {
        span.classList.remove("white-text-span");
        changeCircleColor.style.borderColor = "";
        signupBtnContainer.classList.remove("white-theme");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

menuOverlayObserver.observe(blackBg);
