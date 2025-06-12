// ======== Number's Increment Animation ======== //
function animateValue(el, start, end, duration, isPercent) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = start + (end - start) * progress;
    el.textContent = isPercent ? `${value.toFixed(1)}%` : Math.floor(value);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

const NumberIncObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const original = el.textContent.trim();
        const isPercent = original.includes("%");
        const cleaned = original.replace(/[,%]/g, "");
        const numeric = parseFloat(cleaned);
        if (!isNaN(numeric)) {
          el.textContent = isPercent ? "0%" : "0";
          animateValue(el, 0, numeric, 1500, isPercent);
          NumberIncObserver.unobserve(el);
        }
      }
    });
  },
  { threshold: 0.6 }
);

document
  .querySelectorAll(".rates")
  .forEach((el) => NumberIncObserver.observe(el));

// ======== Trailer Cursor When Hover ======== //
const video = document.querySelector(".interactive-video");
const trailer = document.getElementById("trailer");
const icon = trailer.querySelector("ion-icon");

video.addEventListener("click", () => {
  video.muted = !video.muted;

  // Change icon based on muted state
  icon.setAttribute(
    "name",
    video.muted ? "volume-mute-outline" : "volume-high-outline"
  );
});

const animateTrailer = (e, interacting) => {
  const x = e.clientX;
  const y = e.clientY;

  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 4 : 1})`,
  };

  trailer.animate(keyframes, {
    duration: 700,
    fill: "forwards",
  });

  trailer.style.opacity = interacting ? "1" : "0";
};

window.onmousemove = (e) => {
  const interactable = e.target.closest(".interactive-video");
  const interacting = interactable !== null;

  animateTrailer(e, interacting);
};
