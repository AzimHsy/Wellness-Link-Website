const introHeader = new SplitType(".intro-holder h1", {
  types: "lines",
  tagName: "div",
  lineClass: "line-mask",
});

introHeader.lines.forEach((line) => {
  const content = line.innerHTML;
  line.innerHTML = `<span>${content}</span>`;
});

gsap.set(".intro-holder h1 .line-mask span", {
  y: 400,
  display: "block",
});

gsap.to(".intro-holder h1 .line-mask span", {
  y: 0,
  duration: 1.3,
  stagger: 0.085,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".intro-section",
    start: "top bottom",
    // markers: true,
    toggleActions: "play none none reset",
  },
});

// first Image
const firstImgText = new SplitType(".img-holder-intro h2", {
  types: "lines",
  tagName: "div",
  lineClass: "line-mask",
});

firstImgText.lines.forEach((line) => {
  const content = line.innerHTML;
  line.innerHTML = `<span>${content}</span>`;
});

gsap.set(".img-holder-intro h2 .line-mask span", {
  y: 200,
  display: "block",
});

gsap.to(".img-holder-intro h2 .line-mask span", {
  y: 0,
  duration: 1.3,
  stagger: 0.085,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".img-holder-intro",
    start: "top bottom",
    // markers: true,
    toggleActions: "play none none reset",
  },
});

// Second Image
const secImgText = new SplitType(".img-holder2-intro h2", {
  types: "lines",
  tagName: "div",
  lineClass: "line-mask",
});

secImgText.lines.forEach((line) => {
  const content = line.innerHTML;
  line.innerHTML = `<span>${content}</span>`;
});

gsap.set(".img-holder2-intro h2 .line-mask span", {
  y: 400,
  display: "block",
});

gsap.to(".img-holder2-intro h2 .line-mask span", {
  y: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power4.out",
  scrollTrigger: {
    trigger: ".img-holder2-intro",
    start: "top bottom",
    // markers: true,
    toggleActions: "play none none reset",
  },
});
