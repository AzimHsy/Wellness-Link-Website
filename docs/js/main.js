document.addEventListener("DOMContentLoaded", () => {
  // ======== Libs ========
  gsap.registerPlugin(ScrollTrigger);
  gsap.registerPlugin(SplitText);

  // ======= Go to The Top of the Page when Refresh ========= //
  // window.onbeforeunload = function () {
  //   window.scrollTo(0, 0);
  // };

  // ======== Lenis setup ========
  const lenis = new Lenis({
    duration: 1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
  });

  window.lenis = lenis;
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
  window.addEventListener("load", () => {
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);
  });

  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
  });

  // ======== Customize Transitions ========
  const customEase = CustomEase.create("custom", ".87,0,.13,1");
  CustomEase.create("hop", "0.9, 0, 0.1, 1");

  // ======== Loader Intro Animations ======== //

  //  unComment for debugging ( prevent animation to load )
  if (!sessionStorage.getItem("animationPlayed")) {
    const loadTL = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: "hop",
      },
    });

    lenis.stop();

    gsap.set(".hero-img", {
      scale: 1.7,
      // rotation: -50,
    });

    gsap.to(".second-loader", {
      clipPath: "polygon(0% 45%, 25% 45%, 25% 55%, 0% 55%)",
      duration: 1,
      ease: customEase,
      delay: 1,
    });

    gsap.to(".second-loader", {
      clipPath: "polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)",
      duration: 2,
      ease: customEase,
      delay: 2,

      onStart: () => {
        gsap.to(".progress-bar", {
          width: "100vw",
          duration: 2,
          ease: customEase,
        });

        gsap.to(counter, {
          innerHTML: 100,
          duration: 2,
          ease: customEase,
          snap: { innerHTML: 1 },
        });
      },
    });

    gsap.to(".second-loader", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 1,
      ease: customEase,
      delay: 4,
      onStart: () => {
        gsap.to(".progress-bar", {
          opacity: 0,
          duration: 0.3,
        });
      },
      onComplete: () => {
        loadTL.to(
          ".word h1",
          {
            y: "0%",
            duration: 0.7,
          },
          "<"
        );

        loadTL.to(".divider", {
          scaleY: "100%",
          duration: 0.5,
          onComplete: () =>
            gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 }),
        });

        loadTL.to("#word-1 h1", {
          y: "100%",
          duration: 0.8,
          delay: 0.2,
        });

        loadTL.to(
          "#word-2 h1",
          {
            y: "-100%",
            duration: 0.7,
          },
          "<"
        );
        loadTL.to(".block", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.7,
          stagger: 0.1,
          delay: 0.1,
          onStart: () => {
            gsap.to(".hero-img", {
              scale: 1,
              duration: 1.6,
              ease: "hop",
            });
            const heroVideo = document.querySelector(".hero-video");
            heroVideo.play();

            loadTL.to(
              [".nav", ".line h1", ".line p"],
              {
                y: "0%",
                duration: 2,
                stagger: 0.2,

                onComplete: () => {
                  document.querySelector(".first-loader").style.display =
                    "none";
                },
              },
              "<"
            );

            loadTL.to(
              [".cta", ".cta-icon"],
              {
                scale: 1,
                duration: 2,
                stagger: 0.75,
                delay: 0.75,
              },
              "<"
            );

            loadTL.to(
              ".cta-label p",
              {
                y: "0%",
                duration: 2,
                delay: 0.5,
              },
              "<"
            );
          },
        });
        lenis.start();
        gsap.to(".hero-video", {
          duration: 1,
          opacity: 1,
          ease: "hop",
        });
      },
    });

    sessionStorage.setItem("animationPlayed", "true");
    // ======= unComment to Skip animation — just show elements in final state ======== //
  } else {
    document.querySelector(".first-loader").style.display = "none";
    gsap.set(
      [
        ".word h1",
        ".nav",
        ".line h1",
        ".line p",
        ".cta",
        ".cta-icon",
        ".cta-label p",
      ],
      { y: "0%" }
    );
    gsap.set(".hero-img", { scale: 1 });
    gsap.set(".hero-video", { opacity: 1 });
    gsap.set(".cta", { scale: 1 });
    gsap.set(".cta-icon", { scale: 1 });

    // Play video manually
    const heroVideo = document.querySelector(".hero-video");
    if (heroVideo) {
      heroVideo.play();
    }
  }

  // ====== Parallax scroll effect to the hero video =======

  gsap.to(".hero-video", {
    y: "30%",
    ease: "none",
    scrollTrigger: {
      // markers: true,
      trigger: ".hero-img",
      start: "clamp(top bottom)",
      end: "clamp(bottom top)",
      scrub: 1,
    },
  });

  // ======== Health Awareness Introduction Section ======== //

  // ======== SVG Draw Line Animation ========
  let introLineSVG = document.getElementById("intro-line");
  let linePath = introLineSVG.querySelector("path");

  const pathLength = linePath.getTotalLength();

  gsap.set(linePath, { strokeDasharray: pathLength });
  gsap.fromTo(
    linePath,
    {
      strokeDashoffset: pathLength,
    },
    {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".svg-container",
        start: "clamp(top center)",
        end: "clamp(bottom center)",
        scrub: 1.5,
        // markers: true,
      },
    }
  );

  gsap.set([".first-intro-img", ".img-holder-intro p"], { y: 100 });

  gsap.to([".first-intro-img", ".img-holder-intro p"], {
    y: -150,
    scrollTrigger: {
      trigger: ".img-holder-intro",
      start: "top 80%",
      end: "+=1200",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.set(".first-intro-img img", { y: "-50%" });

  gsap.to(".first-intro-img img", {
    y: "0%",
    scrollTrigger: {
      trigger: ".img-holder-intro",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1,
      // markers: true,
    },
  });

  gsap.set([".sec-intro-img", ".img-holder2-intro p"], { y: 150 });

  gsap.to([".sec-intro-img", ".img-holder2-intro p"], {
    y: -200,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".img-holder2-intro",
      start: "top bottom",
      end: "+=1000",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.set(".sec-intro-img img", { y: "-50%" });

  gsap.to(".sec-intro-img img", {
    y: "0%",
    scrollTrigger: {
      trigger: ".img-holder2-intro",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1,
      // markers: true,
    },
  });

  gsap.to(".intro-section-container", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".health-awareness-spacer",
      start: "top 80%",
      end: "+=300",
      scrub: 1,
      // markers: true,
    },
  });

  gsap.set(".deco-img img", { y: "-50%" });

  gsap.to(".deco-img img", {
    y: "0%",
    scrollTrigger: {
      trigger: ".img-holder2-intro",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1,
      // markers: true,
    },
  });

  gsap.set(".img-awareness-holder img", { y: "-30%" });

  gsap.to(".img-awareness-holder img", {
    y: "0%",
    scrollTrigger: {
      trigger: ".health-awareness-section",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.1,
      // markers: true,
    },
  });

  // ======== Features Section ======== //

  // Features Animation
  function setupHoverAnimation(
    circleSelector,
    textInfoSelector,
    textDetailSelector
  ) {
    const circle = document.querySelector(circleSelector);
    const tl = gsap.timeline({ paused: true });

    const splitDetails = new SplitText(textDetailSelector, {
      type: "lines",
    });

    tl.to(textInfoSelector, {
      duration: 1,
      yPercent: 100,
      opacity: 0,
      ease: "hop",
    }).from(
      splitDetails.lines,
      {
        duration: 0.6,
        y: 20,
        mask: "lines",
        // stagger: 0.1,
        delay: 0.3,
        opacity: 0,
        ease: "hop",
      },
      "<"
    );

    circle.addEventListener("mouseenter", () => tl.play());
    circle.addEventListener("mouseleave", () => tl.reverse());
  }

  setupHoverAnimation(".circle-info-1", ".text-info-1", ".text-detail-1");
  setupHoverAnimation(".circle-info-2", ".text-info-2", ".text-detail-2");
  setupHoverAnimation(".circle-info-3", ".text-info-3", ".text-detail-3");
  setupHoverAnimation(".circle-info-4", ".text-info-4", ".text-detail-4");

  gsap.to(".header-feature h1", {
    scrollTrigger: {
      trigger: ".spacer-1",
      pin: ".header-feature",
      pinSpacing: false,
      // markers: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.to(".feature-container", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: -300,
    duration: 1,
  });

  gsap.to(".feature1", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: -400,
    duration: 1,
  });

  gsap.to(".feature3", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
    y: -200,
    duration: 1,
  });

  // ======== Lifestyle Quiz Section ======== //

  gsap.to(".header-quiz h1", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // pin: ".header-quiz h1",
      // pinSpacing: false,
      // markers: true,
      start: "bottom 36%",
      end: "+=500",
      scrub: true,
    },
    y: 330,
  });

  gsap.to(".header-quiz h1", {
    scrollTrigger: {
      trigger: ".spacer-2",
      pin: ".spacer-2",
      pinSpacing: false,
      // markers: true,
      start: "top top",
      end: "+=250",
      scrub: true,
    },
  });

  gsap.to(".bulat", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "bottom 36%",
      end: "+=1200",
      scrub: true,
    },
    clipPath: "ellipse(43% 100% at 50% -1%)",
    duration: 1,
  });

  gsap.to(".bulat", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "bottom 25%",
      end: "+=1200",
      scrub: true,
    },
    y: 220,
    duration: 1,
  });

  gsap.from(".quiz-container", {
    scrollTrigger: {
      trigger: ".spacer-1",
      // markers: true,
      start: "bottom 25%",
      end: "+=500",
      scrub: true,
    },
    y: 0,
    duration: 1,
  });

  // ======== Depression Section ======== //

  ScrollTrigger.create({
    trigger: ".spacer-3",
    start: "top 70%",
    // markers: true,
    toggleClass: {
      targets: [document.querySelector(".video-background .overlay")],
      className: "change-bg",
    },
    toggleActions: "play reverse none none",
  });

  ScrollTrigger.create({
    trigger: ".spacer-3",
    start: "top 80%",
    toggleClass: {
      targets: [
        document.querySelector(".spacer-2"),
        document.querySelector(".black-container"),
      ],
      className: "change-bg1",
    },
    toggleActions: "play reverse none none",
  });

  gsap.to(".spacer-2", {
    scrollTrigger: {
      trigger: ".video-background",
      pin: ".spacer-2",
      pinSpacing: false,
      start: "top bottom",
      end: "+=1000",
      scrub: 1,
      // markers: true,
    },
  });

  // Parallax scroll effect on the background video
  gsap.to(".backg-video", {
    y: "-20%",
    ease: "none",
    scrollTrigger: {
      // markers: true,
      trigger: ".video-background",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  let splitAboveText = SplitText.create(".above-text", {
    type: "chars, words, lines",
  });

  gsap.from(splitAboveText.chars, {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "top 80%",
      // markers: true,
      mask: splitAboveText.chars,
      toggleActions: "play none none reset",
    },
    duration: 1,
    opacity: 0,
    stagger: { each: 0.03, from: "start" },
    // ease: power4.out,
  });

  let splitBelowText = SplitText.create(".below-text", {
    type: "chars, words, lines",
  });

  gsap.from(splitBelowText.chars, {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "top 40%",
      // markers: true,
      mask: splitBelowText.chars,
      toggleActions: "play none none reset",
    },
    duration: 1,
    opacity: 0,
    stagger: { each: 0.03, from: "start" },
    // ease: power4.out,
  });

  gsap.to(".above-img-container", {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "top 50%",
      end: "+=600",
      scrub: 1,
      // markers: true,
    },
    y: -70,
    rotate: 0,
  });

  gsap.set(".img-below-container", { y: 70, rotate: -5 });

  gsap.to(".img-below-container", {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "top 50%",
      end: "+=900",
      scrub: 1,
      // markers: true,
    },
    duration: 1,
    y: -10,
    rotate: 0,
  });

  gsap.set(".img-cover", { scaleY: 1, transformOrigin: "top" });
  gsap.to(".img-cover", {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "top 90%",
      toggleActions: "play none none reset",
      // markers: true,
    },
    scaleY: 0,
    duration: 1,
    ease: "hop",
  });

  gsap.set(".video-cover", { scaleY: 1, transformOrigin: "top" });
  gsap.to(".video-cover", {
    scrollTrigger: {
      trigger: ".spacer-3",
      start: "40% 90%",
      toggleActions: "play none none reset",
      // markers: true,
    },
    scaleY: 0,
    duration: 1,
    ease: "hop",
  });

  // ======== Depression Tips Section ======== //

  // Animate each tips with stagger
  gsap.utils.toArray(".tip").forEach((tip, i) => {
    const content = tip.children; // includes border-line, number, title, description

    // Tips content animation
    gsap.from(tip, {
      opacity: 0,
      y: 50,
      duration: 0.7,
      delay: 0.1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: tip,
        start: "top 90%",
        toggleActions: "play none none none",
        // stagger: 0.075,
        // markers: true,
      },
    });

    const line = tip.querySelector(".border-line");
    gsap.to(line, {
      width: "100%",
      scrollTrigger: {
        trigger: tip,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      duration: 1.5,
      ease: "power4.out",
    });
  });

  // ======== Depression Quiz Section ======== //

  gsap.to(".depression-header h1", {
    scrollTrigger: {
      trigger: ".spacer-4",
      start: "bottom 36%",
      end: "+=500",
      scrub: true,
      // markers: true,
    },
    y: 80,
  });

  gsap.to(".depression-header h1", {
    scrollTrigger: {
      trigger: ".spacer-5",
      pin: ".spacer-5",
      pinSpacing: false,
      start: "top top",
      end: "+=250",
      scrub: true,
      // markers: true,
    },
  });

  gsap.to(".depression-ellipse", {
    scrollTrigger: {
      trigger: ".spacer-4",
      start: "bottom 70%",
      end: "+=1200",
      scrub: true,
      // markers: true,
    },
    clipPath: "ellipse(47% 100% at 51% -1%)",
    duration: 1,
  });

  gsap.to(".depression-ellipse", {
    scrollTrigger: {
      trigger: ".spacer-4",
      start: "bottom 60%",
      end: "+=1700",
      scrub: true,
      // markers: true,
    },
    y: 150,
    duration: 1,
  });

  gsap.from(".depression-quiz", {
    scrollTrigger: {
      trigger: ".spacer-4",
      start: "bottom 25%",
      end: "+=500",
      scrub: true,
    },
    y: 0,
  });

  // ======== Health Condition Introduction  ======== //

  const split5 = SplitText.create(".health-intro-container h1", {
    type: "lines",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".spacer-6",
      start: "top 60%",
      end: "+=500",
      scrub: 1,
      // markers: true,
    },
  });

  split5.lines.forEach((line) => {
    tl.fromTo(
      line,
      { opacity: 0.2 },
      { opacity: 1, duration: 1 },
      "+=0.2" // delay between each line
    );
  });

  // ======== Health Conditions Section ======== //

  gsap.from(".health-condition-header", {
    scrollTrigger: {
      trigger: ".spacer-6",
      start: "bottom center",
      end: "+=330",
      scrub: 1,
      // markers: true,
    },
    scale: 5,
  });

  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".spacer-7",
      pin: true,
      start: "clamp(top top)",
      end: "clamp(+=1200)",
      scrub: 1,
      // markers: true,
    },
  });

  tl2
    .to(".first-row h1", { y: -150 }, 0)
    .to(".sec-row h1", { y: 150 }, 0)

    .fromTo(
      ".image-holder",
      {
        clipPath: "inset(50% 0% 50% 0% round 0%)",
        opacity: 1,
      },
      {
        clipPath: "inset(0% 0% 0% 0% round 0%)",
        width: "100vw",
        height: "100vh",
        scale: 1,
        ease: "power4.out",
      },
      0
    );

  // ======== Health Condition Images Overlay ======== //

  const containers = gsap.utils.toArray(".image-container");

  containers.forEach((container, index) => {
    const img = container.querySelector("img");
    const text = container.querySelector(".text-reveal");

    gsap.set(container, { zIndex: index + 1 });

    if (index === 0) {
      gsap.set(img, { clipPath: "inset(0% 0 0 0)" }); // First image is visible
      gsap.set(text, { clipPath: "inset(0% 0 0 0)" }); // First text is visible
      return;
    }

    const sectionHeight = window.innerHeight;
    const start = sectionHeight * (index - 0.2); // 80% of previous image
    const end = sectionHeight * (index + 1); // this image fully revealed

    // Reveal image
    gsap.fromTo(
      img,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: `${start}px top`,
          end: `${end}px top`,
          scrub: true,
        },
      }
    );

    // Reveal corresponding text using same animation
    gsap.fromTo(
      text,
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        ease: "none",
        scrollTrigger: {
          trigger: ".scroll-wrapper",
          start: `${start}px top`,
          end: `${end}px top`,
          scrub: true,
        },
      }
    );
  });

  // ======== Health Cards Section ======== //

  gsap.to(".spacer-9", {
    scrollTrigger: {
      trigger: ".spacer-9",
      pin: ".health-card-header",
      pinSpacing: false,
      start: "top top",
      end: "bottom 80%",
      // markers: true,
    },
  });

  const cards = gsap.utils.toArray(".health-card");
  const total = cards.length;

  cards.forEach((card) => {
    const index = parseInt(card.dataset.index);
    const speed = 0.05 + (total - index - 1) * 0.25;

    gsap.to(card, {
      y: () => -(window.innerHeight * speed),
      ease: "none",
      scrollTrigger: {
        trigger: ".spacer-9",
        start: "top 30%",
        end: "bottom top",
        scrub: 1,
        // markers: true,
      },
    });
  });

  const healthHeader = new SplitType(".health-card-header h1", {
    types: "lines",
    tagName: "div",
    lineClass: "line-mask",
  });

  healthHeader.lines.forEach((line) => {
    const content = line.innerHTML;
    line.innerHTML = `<span>${content}</span>`;
  });

  gsap.set(".health-card-header h1 .line-mask span", {
    y: 400,
    display: "block",
  });

  gsap.to(".health-card-header h1 .line-mask span", {
    y: 0,
    duration: 1.5,
    stagger: 0.085,
    ease: "power4.out",
    scrollTrigger: {
      trigger: ".spacer-9",
      start: "top bottom",
      // markers: true,
      toggleActions: "play none none reset",
    },
  });

  ScrollTrigger.create({
    trigger: ".spacer-10",
    start: "top 70%",
    // end: "+=1700",
    // markers: true,
    toggleClass: {
      targets: [
        document.querySelector(".spacer-10"),
        document.querySelector(".spacer-9"),
      ],
      className: "change-bg-insight",
    },
    toggleActions: "play reverse none none",
  });

  ScrollTrigger.create({
    trigger: ".spacer-10",
    start: "top 70%",
    // markers: true,
    toggleClass: {
      targets: [document.getElementById("split-text")],
      className: "change-text-insight",
    },
    toggleActions: "play reverse none none",
  });

  // ======== Health Statistics Data Section ======== //

  ScrollTrigger.batch(".health-stat-text-holder h2", {
    start: "top 80%",
    once: true, // <-- only trigger once
    onEnter: (elements) => {
      elements.forEach((el) => {
        el.style.visibility = "visible";

        const split = new SplitType(el, {
          types: "lines",
          tagName: "div",
          lineClass: "line-mask-stats",
        });

        split.lines.forEach((line) => {
          const content = line.innerHTML;
          line.innerHTML = `<span class="stats-span-anim">${content}</span>`;
        });

        gsap.set(el.querySelectorAll(".line-mask-stats .stats-span-anim"), {
          y: 100,
          display: "block",
        });

        gsap.to(el.querySelectorAll(".line-mask-stats .stats-span-anim"), {
          y: 0,
          duration: 2,
          stagger: 0.075,
          ease: "power4.out",
        });
      });
    },
  });

  gsap.utils.toArray(".health-data").forEach((el) => {
    gsap.to(el, {
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        once: true,
      },
      opacity: 1,
      y: 0,
      duration: 2,
      ease: "power4.out",
      stagger: 0.2,
    });
  });

  // ======== Footer Section ======== //

  gsap.to(".health-footer", {
    clipPath: "inset(0% 0% 0% 0%)", // fully revealed
    ease: "none",
    scrollTrigger: {
      trigger: ".footer-spacer",
      start: "clamp(top bottom)",
      end: "clamp(top center)",
      scrub: true,
      // markers: true,
    },
  });
});
