// ===== SCREEN NAVIGATION =====

const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Buttons that navigate to another screen
document.querySelectorAll("[data-go]").forEach(button => {
  button.addEventListener("click", () => {
    showScreen(button.dataset.go);
  });
});


// ===== VIDEO SETUP =====

function setupVideo(videoId, placeholderId, screenId) {
  const video = document.getElementById(videoId);
  const placeholder = document.getElementById(placeholderId);

  if (!video) {
    return { video: null, placeholder: null, frame: null, screenId };
  }

  const frame = video.closest(".video-frame");

  if (frame) {
    video.addEventListener("loadedmetadata", () => {
      frame.classList.add("has-video");
    });

    video.addEventListener("canplay", () => {
      frame.classList.add("has-video");
    });

    video.addEventListener("error", () => {
      frame.classList.remove("has-video");
    });
  }

  return { video, placeholder, frame, screenId };
}

const intro = setupVideo(
  "introVideo",
  "introPlaceholder",
  "introVideoScreen"
);

const cake = setupVideo(
  "cakeVideo",
  "cakePlaceholder",
  "cakeVideoScreen"
);


// ===== FIRST HEART =====

const startBtn = document.getElementById("startBtn");

if (startBtn) {
  startBtn.addEventListener("click", () => {
    showScreen("introVideoScreen");

    if (intro.video) {
      intro.video.load();
    }
  });
}


// ===== INTRO VIDEO CONTINUE =====

const introContinue = document.getElementById("introContinue");

if (introContinue) {
  introContinue.addEventListener("click", () => {
    if (intro.video) {
      intro.video.pause();
    }

    showScreen("letterScreen");
  });
}


// ===== CAKE VIDEO =====

const cutCake = document.getElementById("cutCake");

if (cutCake) {
  cutCake.addEventListener("click", () => {
    showScreen("cakeVideoScreen");

    if (cake.video) {
      cake.video.load();

      cake.video.play().catch(() => {
        // Video playback may require a manual click.
      });
    }
  });
}


// ===== CAKE VIDEO CONTINUE =====

const cakeVideoContinue = document.getElementById("cakeVideoContinue");

if (cakeVideoContinue) {
  cakeVideoContinue.addEventListener("click", () => {
    if (cake.video) {
      cake.video.pause();
    }

    showScreen("finalScreen");
  });
}


// ===== RESTART WEBSITE =====

const restartBtn = document.getElementById("restartBtn");

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    if (intro.video) {
      intro.video.pause();
      intro.video.currentTime = 0;
    }

    if (cake.video) {
      cake.video.pause();
      cake.video.currentTime = 0;
    }

    showScreen("introScreen");
  });
}


// ===== MEMORY REVEAL: SHOW ONLY ONE PHOTO =====

const memoryCards = [
  ...document.querySelectorAll(".memory-card")
];

let currentMemory = -1;

const counter = document.getElementById("memoryCounter");
const revealMemory = document.getElementById("revealMemory");

memoryCards.forEach(card => {
  card.classList.add("hidden-memory");
  card.classList.remove("revealed");
});

if (revealMemory) {
  revealMemory.addEventListener("click", () => {
    if (memoryCards.length === 0) return;

    // Hide the previously displayed photo
    memoryCards.forEach(card => {
      card.classList.add("hidden-memory");
      card.classList.remove("revealed");
    });

    // Move to the next photo
    currentMemory++;

    // Restart from the first photo after the last one
    if (currentMemory >= memoryCards.length) {
      currentMemory = 0;
    }

    // Show only the current photo
    memoryCards[currentMemory].classList.remove("hidden-memory");
    memoryCards[currentMemory].classList.add("revealed");

    if (counter) {
      counter.textContent =
        `Memory ${String(currentMemory + 1).padStart(2, "0")} of ${String(memoryCards.length).padStart(2, "0")} ♡`;
    }
  });
}

// ===== GIFT MESSAGES =====

const giftCards = document.querySelectorAll(".gift-card");
const giftMessage = document.getElementById("giftMessage");

const giftMessages = {
message: {
icon: "💌",
title: "A Little Message for You",
text: "You are a special person, and I hope you always remember how much happiness you bring to the people around you. Keep smiling and stay happy! ❤️"
},

wish: {
icon: "✨",
title: "My Wish for You",
text: "I wish you endless happiness, good health, success, beautiful memories, and a future full of wonderful surprises. May all your dreams come true! 💗"
},

gift: {
icon: "🎁",
title: "Your Special Gift",
text: "Surprise! 🎉 Your gift is this little website, made especially for you. Every page is a small reminder that you deserve happiness, love, and lots of beautiful moments. Happy Birthday! ❤️"
}
};

giftCards.forEach(card => {
card.addEventListener("click", () => {
const giftType = card.dataset.gift;
const selectedGift = giftMessages[giftType];

if (!selectedGift || !giftMessage) return;

giftMessage.innerHTML = `
  <span class="gift-message-icon">${selectedGift.icon}</span>
  <h3>${selectedGift.title}</h3>
  <p>${selectedGift.text}</p>
`;

giftMessage.classList.remove("revealed");
void giftMessage.offsetWidth;
giftMessage.classList.add("revealed");

});
});


// ===== QUIZ PIN LOCK =====

const correctPIN = "2228";

const pinForm = document.getElementById("pinForm");
const pinInput = document.getElementById("pinInput");
const pinMessage = document.getElementById("pinMessage");

if (pinForm) {
  pinForm.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!pinInput || !pinMessage) {
      return;
    }

    const enteredPIN = pinInput.value.trim();

    if (enteredPIN === correctPIN) {
      pinMessage.textContent = "Correct PIN! Welcome! ♡";
      pinMessage.style.color = "#8dffbd";

      setTimeout(() => {
        showScreen("quizScreen");
        startQuiz();
      }, 600);

    } else {
      pinMessage.textContent = "Wrong PIN! Try again 💗";
      pinMessage.style.color = "#ff7f9f";

      pinInput.value = "";
      pinInput.focus();
    }
  });
}


// ===== QUIZ QUESTIONS =====

const quizQuestions = [
  {
    question: "1. Where are we friends from? ❤️",
    options: [
      "A. School",
      "B. IAT Exam",
      "C. College",
      "D. Online"
    ],
    answer: 1
  },

  {
    question: "2. In 1st year, which guide should I use to mark answers? 📚",
    options: [
      "A. Maths Guide",
      "B. Science Guide",
      "C. English Guide",
      "D. Computer Guide"
    ],
    answer: 2
  },

  {
    question: "3. What is my DOB? 🎂",
    options: [
      "A. 28-10-2005",
      "B. 22-08-2005",
      "C. 17-10-2005",
      "D. 22-08-2006"
    ],
    answer: 1
  },

  {
    question: "4.Who is favorite person in this world? 🥹❤️",
    options: [
      "A. Mom",
      "B. Dad",
      "C. Friends",
      "D. you"
    ],
    answer: 3
  },

  {
    question: "5. Where were we when we started the video call? 📱",
    options: [
      "A. Chennai",
      "B. Coimbatore",
      "C. Tirunelveli",
      "D. Madurai"
    ],
    answer: 0
  },

  {
    question: "6. When did we take the photo? 📸",
    options: [
      "A. 15-Oct-2026",
      "B. 16-Oct-2026",
      "C. 17-Oct-2026",
      "D. 18-Oct-2026"
    ],
    answer: 2
  },

  {
    question: "7. Naa unakku evlo pudikkum? ❤️",
    type: "text",
    answer: ""
  }
];


// ===== QUIZ ELEMENTS =====

let currentQuestion = 0;
let quizCorrectAnswers = 0;
let questionAnswered = false;

const questionCount = document.getElementById("questionCount");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");
const quizResult = document.getElementById("quizResult");
const quizScore = document.getElementById("quizScore");


// ===== START QUIZ =====

function startQuiz() {
  currentQuestion = 0;
  quizCorrectAnswers = 0;
  questionAnswered = false;

  if (quizResult) {
    quizResult.style.display = "none";
  }

  const quizCard = document.querySelector(".quiz-card");

  if (quizCard) {
    quizCard.style.display = "block";
  }

  loadQuestion();
}


// ===== LOAD QUESTION =====

function loadQuestion() {
  questionAnswered = false;

  const question = quizQuestions[currentQuestion];

  if (!question) {
    return;
  }

  if (questionCount) {
    questionCount.textContent =
      `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  }

  if (quizQuestion) {
    quizQuestion.textContent = question.question;
  }

  if (quizOptions) {
    quizOptions.innerHTML = "";
  }

  if (quizFeedback) {
    quizFeedback.textContent = "";
    quizFeedback.style.color = "";
  }

  if (nextQuestionBtn) {
    nextQuestionBtn.style.display = "none";
  }


  // ===== LAST QUESTION: PERSONAL ANSWER =====

  if (question.type === "text") {
    const answerInput = document.createElement("textarea");

    answerInput.id = "personalAnswer";
    answerInput.placeholder = "Sollu Thanalakshimi... Apro Kandipa Itha Enaku SS Eduthu Annupiru O❤️";
    answerInput.rows = 3;

    answerInput.style.width = "100%";
    answerInput.style.padding = "14px";
    answerInput.style.marginTop = "10px";
    answerInput.style.borderRadius = "12px";
    answerInput.style.resize = "vertical";
    answerInput.style.font = "inherit";
    answerInput.style.color = "white";
    answerInput.style.background = "#17152f";
    answerInput.style.border = "1px solid #ff9bdd";
    answerInput.style.boxSizing = "border-box";

    quizOptions.appendChild(answerInput);


    const sendButton = document.createElement("button");

    sendButton.type = "button";
    sendButton.textContent = "Send My Answer ❤️";
    sendButton.className = "button primary";

    sendButton.addEventListener("click", () => {
      const answer = answerInput.value.trim();

      if (!answer) {
        quizFeedback.textContent =
          "Please type your answer first! ❤️";

        return;
      }

      questionAnswered = true;

      answerInput.disabled = true;
      sendButton.disabled = true;

      quizFeedback.textContent = "Your answer: " + answer;
      quizFeedback.style.color = "#ff9bdd";

      nextQuestionBtn.textContent = "Finish Quiz 💗";
      nextQuestionBtn.style.display = "inline-block";
    });

    quizOptions.appendChild(sendButton);

    return;
  }


  // ===== MULTIPLE-CHOICE QUESTIONS =====

  question.options.forEach((option, index) => {
    const button = document.createElement("button");

    button.type = "button";
    button.textContent = option;

    button.addEventListener("click", () => {
      checkAnswer(index);
    });

    quizOptions.appendChild(button);
  });
}


// ===== CHECK ANSWER =====

function checkAnswer(selectedIndex) {
  if (questionAnswered) {
    return;
  }

  questionAnswered = true;

  const question = quizQuestions[currentQuestion];

  const optionButtons = quizOptions.querySelectorAll("button");

  optionButtons.forEach(button => {
    button.disabled = true;
  });


  if (selectedIndex === question.answer) {
    quizCorrectAnswers++;

    quizFeedback.textContent = "Correct answer! Well done! 💗";
    quizFeedback.style.color = "#8dffbd";

    optionButtons[selectedIndex].classList.add("correct-answer");

  } else {
    quizFeedback.textContent =
      `Not quite! The correct answer is: ${question.options[question.answer]} ♡`;

    quizFeedback.style.color = "#ff9bd4";

    optionButtons[selectedIndex].classList.add("wrong-answer");
    optionButtons[question.answer].classList.add("correct-answer");
  }


  nextQuestionBtn.textContent =
    currentQuestion === quizQuestions.length - 1
      ? "See Your Result ✨"
      : "Next Question →";

  nextQuestionBtn.style.display = "inline-block";
}


// ===== NEXT QUESTION =====

if (nextQuestionBtn) {
  nextQuestionBtn.addEventListener("click", () => {
    if (!questionAnswered) {
      return;
    }

    currentQuestion++;

    if (currentQuestion < quizQuestions.length) {
      loadQuestion();

    } else {
      const quizCard = document.querySelector(".quiz-card");

      if (quizCard) {
        quizCard.style.display = "none";
      }

      if (quizResult) {
        quizResult.style.display = "block";
      }

      if (quizScore) {
        quizScore.textContent =
          `You got ${quizCorrectAnswers} out of 6 correct! ♡`;
      }
    }
  });
}


// ===== FINISH QUIZ =====

const finishQuizBtn = document.getElementById("finishQuizBtn");

if (finishQuizBtn) {
  finishQuizBtn.addEventListener("click", () => {
    showScreen("cakeScreen");
  });
}


// ===== FLOATING HEARTS =====

const floating = document.querySelector(".floating-hearts");

const heartSymbols = ["♡", "✧", "♥"];

if (floating) {
  for (let i = 0; i < 12; i++) {
    const item = document.createElement("span");

    item.textContent = heartSymbols[i % heartSymbols.length];
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDelay = `${Math.random() * 12}s`;
    item.style.animationDuration = `${12 + Math.random() * 12}s`;

    floating.appendChild(item);
  }
}

