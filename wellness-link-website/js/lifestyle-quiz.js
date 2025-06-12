import { questions } from "./questions/lifestyle-qs.js";

let currentQuestion = 0;
let totalScore = 0;

function loadQuestion() {
  const q = questions[currentQuestion];

  document.querySelector(".question-text").textContent = q.text;
  const ansElements = document.querySelectorAll(".ans");
  const feedbackDiv = document.getElementById("feedback");
  const nextBtn = document.getElementById("nextBtn");

  const questionDiv = document.querySelector(".question-text");
  questionDiv.textContent = q.text;

  const customEase1 = CustomEase.create("hop1", "0.9, 0.1, 0.2, 1");
  let split3 = SplitText.create(questionDiv, {
    type: "chars, words, lines",
  });
  // Animate the question in
  gsap.from(split3.lines, {
    ease: "power4.out",
    autoAlpha: 0,
    y: 30,
    stagger: 0.2,
    duration: 1,
  });

  function updateQuestionCounter() {
    const numberSpan = document.getElementById("questionNumber");

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

  updateQuestionCounter(); // call this here
  feedbackDiv.innerHTML = "";
  nextBtn.style.display = "none";

  ansElements.forEach((btn, index) => {
    btn.textContent = q.options[index].text;
    btn.onclick = () => selectAnswer(index);
    btn.style.pointerEvents = "auto";
    btn.innerHTML = `<span>${q.options[index].text}</span>`;
    btn.classList.remove("selected");
    btn.style.opacity = 1;
    btn.style.height = "100%";
  });
}

function selectAnswer(index) {
  const q = questions[currentQuestion];
  const selectedOption = q.options[index];
  totalScore += selectedOption.value;

  // Show only feedback
  document.querySelector(".question-text").textContent = "";
  document.querySelectorAll(".ans").forEach((btn) => {
    btn.textContent = "";
    btn.style.pointerEvents = "none";
    btn.style.opacity = 0;
    btn.style.height = 0;
  });

  const feedbackDiv = document.getElementById("feedback");

  feedbackDiv.innerHTML = `    
    <div class="feedback-msg">
        <h2>${selectedOption.praise}</h2>
        <p>${selectedOption.feedback}</p>
    </div>
    `;

  const feedbackMsg = document.querySelector(".feedback-msg h2");
  const feedbackText = document.querySelector(".feedback-msg p");

  const split4 = SplitText.create(feedbackMsg, {
    type: "lines",
  });

  const split5 = SplitText.create(feedbackText, {
    type: "lines",
  });

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

  document.getElementById("nextBtn").style.display = "inline-block";
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
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
};

function showFinalResult() {
  const quizContainer = document.querySelector(".quiz-container");
  let rating = "D <br> (Needs Immediate Attention)";
  let advice =
    "It looks like your current lifestyle may be affecting your well-being. Don’t worry—it’s never too late to start making small, positive changes. Reach out for support and take one step at a time.";

  if (totalScore >= 35) {
    rating = "A (Excellent)";
    advice =
      "You’re doing an excellent job maintaining a healthy lifestyle! Keep up the great habits and continue staying proactive with your well-being.";
  } else if (totalScore >= 25) {
    rating = "B (Good)";
    advice =
      "You're on the right track! A few small improvements to your routine could elevate your lifestyle to the next level. Keep going!";
  } else if (totalScore >= 15) {
    rating = "C <br> (Needs Improvement)";
    advice =
      "Your lifestyle has room for improvement. Start small—adopt healthier habits step by step, and your body and mind will thank you.";
  }

  quizContainer.innerHTML = `
    <div class="result">
      <h2><span>Lifestyle Rating:</span> ${rating}</h2>
      <p style="font-size: 1em;">${advice}</p>
    </div>
  `;

  const resultMsg = document.querySelector(".result h2");
  const resultText = document.querySelector(".result p");

  const split6 = SplitText.create(resultMsg, {
    type: "lines",
  });

  const split7 = SplitText.create(resultText, {
    type: "lines",
  });

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

export function initLifestyleQuiz() {
  loadQuestion();
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
}
