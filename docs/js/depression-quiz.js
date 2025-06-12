import { questions } from "./questions/depression-qs.js";

let currentQuestion = 0;
let totalScore = 0;

function loadQuestion() {
  const q = questions[currentQuestion];

  const questionDiv = document.querySelector(".question-text-depression");
  questionDiv.textContent = q.text;

  const feedbackDiv = document.getElementById("depressionFeedback");
  const nextBtn = document.getElementById("depressionNextBtn");
  const ansElements = document.querySelectorAll(".depression-option");

  const customEase1 = CustomEase.create("hop1", "0.9, 0.1, 0.2, 1");
  const split3 = SplitText.create(questionDiv, {
    type: "chars, words, lines",
  });

  gsap.from(split3.lines, {
    ease: "power4.out",
    autoAlpha: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
  });

  function updateQuestionCounter() {
    const numberSpan = document.getElementById("depressionQuestionNum");

    gsap.to(numberSpan, {
      duration: 0.2,
      opacity: 0,
      y: 20,
      onComplete: () => {
        numberSpan.textContent = currentQuestion + 1;
        gsap.fromTo(
          numberSpan,
          { opacity: 0, y: -20 },
          { duration: 0.4, opacity: 1, y: 0 }
        );
      },
    });
  }

  updateQuestionCounter();
  feedbackDiv.innerHTML = "";
  nextBtn.style.display = "none";

  ansElements.forEach((btn, index) => {
    btn.innerHTML = `<span>${q.options[index].text}</span>`;
    btn.onclick = () => selectAnswer(index);
    btn.style.pointerEvents = "auto";
    btn.classList.remove("selected");
    btn.style.opacity = 1;
    btn.style.height = "100%";
  });
}

function selectAnswer(index) {
  const q = questions[currentQuestion];
  const selectedOption = q.options[index];
  totalScore += selectedOption.value;

  document.querySelector(".question-text-depression").textContent = "";

  document.querySelectorAll(".depression-option").forEach((btn) => {
    btn.innerHTML = "";
    btn.style.pointerEvents = "none";
    btn.style.opacity = 0;
    btn.style.height = 0;
  });

  const feedbackDiv = document.getElementById("depressionFeedback");

  feedbackDiv.innerHTML = `
    <div class="feedback-msg">
      <h2>${selectedOption.praise}</h2>
      <p>${selectedOption.feedback}</p>
    </div>
  `;

  const feedbackMsg = document.querySelector(".feedback-msg h2");
  const feedbackText = document.querySelector(".feedback-msg p");

  const split4 = SplitText.create(feedbackMsg, { type: "lines" });
  const split5 = SplitText.create(feedbackText, { type: "lines" });

  gsap.from(split4.lines, {
    ease: "power3.out",
    autoAlpha: 0,
    stagger: 0.2,
    duration: 1.2,
  });

  gsap.from(split5.lines, {
    ease: "power3.out",
    autoAlpha: 0,
    y: 10,
    stagger: 0.2,
    duration: 0.7,
  });

  document.getElementById("depressionNextBtn").style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    showFinalResult();
  }
}

window.onload = () => {
  loadQuestion();
  document
    .getElementById("depressionNextBtn")
    .addEventListener("click", nextQuestion);
};

function showFinalResult() {
  const container = document.querySelector(".depression-quiz");
  let rating = "D <br>(Needs Immediate Support)";
  let advice =
    "It looks like you're struggling significantly. Please don’t go through this alone—reach out to a mental health professional or someone you trust.";

  if (totalScore >= 35) {
    rating = "A <br>(Minimal Signs of Depression)";
    advice =
      "You're showing minimal signs of depression. That’s great—maintaining mental well-being is a continuous process. Keep nurturing your mental health with positive habits.";
  } else if (totalScore >= 25) {
    rating = "B <br>(Mild Depression)";
    advice =
      "You may be experiencing mild symptoms of depression. It’s important to talk about it and take preventive steps—consider lifestyle changes or speaking with someone.";
  } else if (totalScore >= 15) {
    rating = "C <br>(Moderate Depression)";
    advice =
      "You’re showing several signs of depression. Please consider reaching out for support—counseling, therapy, or talking to a trusted friend can make a difference.";
  }

  container.innerHTML = `
    <div class="result-depression">
      <h2><span>Screening Result:</span> ${rating}</h2>
      <p style="font-size: 1em;">${advice}</p>
    </div>
  `;

  const resultMsg = document.querySelector(".result-depression h2");
  const resultText = document.querySelector(".result-depression p");

  const split6 = SplitText.create(resultMsg, { type: "lines" });
  const split7 = SplitText.create(resultText, { type: "lines" });

  gsap.from(split6.lines, {
    ease: "power3.out",
    autoAlpha: 0,
    y: 10,
    stagger: 0.2,
    duration: 1,
  });

  gsap.from(split7.lines, {
    ease: "power3.out",
    autoAlpha: 0,
    y: 10,
    stagger: 0.3,
    duration: 0.5,
  });
}

export function initDepressionQuiz() {
  loadQuestion();
  document
    .getElementById("depressionNextBtn")
    .addEventListener("click", nextQuestion);
}
