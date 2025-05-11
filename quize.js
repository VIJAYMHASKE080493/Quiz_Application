
document.addEventListener("DOMContentLoaded", () => {
  // LocalStorage में Quiz Data पहले से है या नहीं चेक करें
  let storedQuizData = JSON.parse(localStorage.getItem("quizData"));

  if (storedQuizData) {
    quizData = storedQuizData;  
    console.log("Quiz Data Loaded from localStorage");
  } else {
    console.log("No Quiz Data Found. Saving it...");
    localStorage.setItem("quizData", JSON.stringify(quizData));
  }

  handleSignupForm();
  handleLoginForm();
  prepareQuiz();
  displayQuestion();
  displayLeaderboard();
  displayCurrentUserScore();
});


function handleSignupForm() {
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    signupForm.addEventListener("submit", handleFormSubmit);
  } else {
    console.log("Signup form not found");
  }
  
}

function handleLoginForm() {
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      validateLogin(event);
    });
  } else {
    console.log("loginForm element not found");
  }
}

function handleFormSubmit(event) {
  event.preventDefault(); 

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!fullName || !email || !password) {
    alert("All fields are required!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  users
  if (users.find((user) => user.email === email)) {
    alert("Email already registered!");
    return;
  }

  const newUser = { id: Date.now(), fullName, email, password, score: 0,};
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  alert("Signup successful!");
  window.location.href = "quize.html";
}

function validateLogin(event) {
  event.preventDefault(); 

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.email === email && u.password === password);

  if (user) {
    alert("Login successful");
    localStorage.setItem("loggedInUserId", user.id); 
    window.location.href = "admin.html"; 
  } else {
    alert("Invalid credentials");
  }
}


let quizData = [
  {
    question: "What is the effect of the i tag?",
    answers: ["<i>", "<italic>", "<it>", "<pre>"],
    correct: 0,
  },
  {
    question: "What does the b tag do?",
    answers: [
      "It makes text bold.",
      "It italicizes text.",
      "It underlines text.",
      "It changes the font color.",
    ],
    correct: 0,
  },
  {
    question: "Which tag is used to create a hyperlink?",
    answers: ["<a>", "<href>", "<link>", "<url>"],
    correct: 0,
  },
  {
    question: "Which tag is used for the largest heading?",
    answers: ["<h6>", "<h1>", "<heading>", "<h5>"],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to create an ordered list?",
    answers: ["<ol>", "<ul>", "<li>", "<list>"],
    correct: 0,
  },
  {
    question: "Which HTML tag is used to define an image?",
    answers: ["<img>", "<picture>", "<image>", "<src>"],
    correct: 0,
  },
  {
    question: "What is the correct syntax for a comment in HTML?",
    answers: [
      "<!-- comment -->",
      "<! comment >",
      "// comment",
      "/* comment */",
    ],
    correct: 0,
  },
  {
    question: "Which attribute specifies the source of an image?",
    answers: ["src", "alt", "href", "link"],
    correct: 0,
  },
  {
    question: "What does the <title> tag define?",
    answers: [
      "The title of the document.",
      "A title for a paragraph.",
      "The main heading of the page.",
      "A title for an image.",
    ],
    correct: 0,
  },
  {
    question: "Which tag is used to define a table row?",
    answers: ["<tr>", "<td>", "<table>", "<row>"],
    correct: 0,
  },
  {
    question: "What does the <meta> tag do?",
    answers: [
      "Provides metadata about the document.",
      "Defines the main content of the page.",
      "Links an external stylesheet.",
      "Creates a hyperlink.",
    ],
    correct: 0,
  },
  {
    question: "Which tag is used to embed a video in HTML?",
    answers: ["<video>", "<embed>", "<media>", "<movie>"],
    correct: 0,
  },
  {
    question: "Which tag is used to create a form in HTML?",
    answers: ["<form>", "<input>", "<textarea>", "<submit>"],
    correct: 0,
  },
  {
    question: "What does the <br> tag do?",
    answers: [
      "Inserts a line break.",
      "Makes text bold.",
      "Adds a horizontal line.",
      "Creates a new paragraph.",
    ],
    correct: 0,
  },
  {
    question: "Which tag is used to define a dropdown list?",
    answers: ["<select>", "<option>", "<dropdown>", "<list>"],
    correct: 0,
  },
];

let currentIndex = 0;
let score = 0;
let totalQuestions = 10;
let randomQuestions = [];

function prepareQuiz() {
  randomQuestions = [...quizData]
    .sort(() => Math.random() - 0.5)
    .slice(0, totalQuestions);
}

function displayQuestion() {
  const currentQuestion = randomQuestions[currentIndex];
  const questionNumber = currentIndex + 1;

  const quesBox = document.getElementById("quesBox");
  const questionNumberElement = document.getElementById("question1");
  const optionsList = document.getElementById("optionsBox");

  if (!quesBox || !questionNumberElement || !optionsList) {
    return;
  }

  let headerText = `Question ${questionNumber} of ${totalQuestions}`;
  if (currentIndex === totalQuestions - 2) {
    headerText = "Last 2 Questions Left";
  } else if (currentIndex === totalQuestions - 1) {
    headerText = "Hey, this is the Last Question";
  }
  questionNumberElement.innerText = headerText;

  quesBox.innerText = `${questionNumber}. ${currentQuestion.question}`;

  optionsList.innerHTML = "";

  for (let i = 0; i < currentQuestion.answers.length; i++) {
    const option = currentQuestion.answers[i];
    const listItem = document.createElement("li");
    listItem.textContent = option;

    listItem.addEventListener("click", function() {
      currentQuestion.choosedAnswer = i;  
      if (i === currentQuestion.correct) {
        score += 10;  
        listItem.classList.add("correct");
      } else {
        listItem.classList.add("wrong");
        optionsList.children[currentQuestion.correct].classList.add("correct");
      }

      const allItems = optionsList.getElementsByTagName("li");
      for (let j = 0; j < allItems.length; j++) {
        allItems[j].classList.remove("selected");
      }
      listItem.classList.add("selected");
      document.getElementById("nextButton").disabled = false;
    });

    optionsList.appendChild(listItem);  
  }
  
  const previousButton = document.getElementById("previousButton");
  if (previousButton) {
    if (currentIndex === 0) {
      previousButton.style.visibility = "hidden";  
    } else {
      previousButton.style.visibility = "visible";  
    }
  }

  updateProgress();  
}



function nextQuestion() {
const currentquestion = randomQuestions[currentIndex];

if(currentquestion.choosedAnswer==null){
  alert("please select an answer before proceding forward");
  return;
}

  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    displayQuestion();
    const selectedAnswer = randomQuestions[currentIndex].choosedAnswer;
    const listItems = document.getElementById("optionsBox").children;
    Array.from(listItems).forEach((item) => item.classList.remove("selected"));
    if (selectedAnswer !== undefined) {
      listItems[selectedAnswer].classList.add("selected");
    }
  } else {
    saveScore(score);
    setTimeout(() => {
      alert("Quiz Complete! Your score: " + score);
      window.location.href = "dashboard.html";
    }, 500);
  }
}

function previousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    displayQuestion();
    const selectedAnswer = randomQuestions[currentIndex].choosedAnswer;
    const listItems = document.getElementById("optionsBox").children;
    Array.from(listItems).forEach((item) => item.classList.remove("selected"));
    if (selectedAnswer !== undefined) {
      listItems[selectedAnswer].classList.add("selected");
    }
  }
}

function updateProgress() {
  const progressPercentage = ((currentIndex + 1) / totalQuestions) * 100;
  document.getElementById("coloring").style.width = progressPercentage + "%";
}

function saveScore(score) {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.id == loggedInUserId);

  if (user) {
    const testDate = new Date().toLocaleString();

    // Time calculation
    const startTime = Number(localStorage.getItem("quizStartTime"));
    const endTime = Date.now();
    const timeTakenSec = Math.floor((endTime - startTime) / 1000);

    function formatTime(sec) {
      const mins = Math.floor(sec / 60);
      const secs = sec % 60;
      return `${mins} min ${secs} sec`;
    }

    // Prepare questions data
    const questionsData = randomQuestions.map(q => ({
      question: q.question,
      answers: q.answers,                         // ✅ Save all options
      selectedIndex: q.choosedAnswer,              // ✅ Selected option index
      selectedAnswer: q.answers[q.choosedAnswer] || null, // ✅ Selected option text
      correctIndex: q.correct,                     // ✅ Correct option index
      correctAnswer: q.answers[q.correct] || null   // ✅ Correct option text
    }));

    const correctAnswerCount = questionsData.filter(q => q.selectedIndex === q.correctIndex).length;

    // Update user data
    user.score = score;
    user.testGiven = (user.testGiven || 0) + 1;
    user.testHistory = user.testHistory || [];

    user.testHistory.push({
      testIndex: user.testHistory.length + 1,
      score: score,
      correctAnswers: correctAnswerCount,
      date: testDate,
      timeTaken: formatTime(timeTakenSec),
      timeTakenInSeconds: timeTakenSec,
      questions: questionsData
    });

    // Save updated user data
    localStorage.setItem("users", JSON.stringify(users));
    displayUserStats();
  } else {
    console.log("User not found in localStorage");
  }
}






function displayUserStats() {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((u) => u.id == loggedInUserId);

  if (user) {
    const testCount = user.testGiven || 0; // Agar undefined ho to 0 rakho
    const testGivenElement = document.getElementById("userTestGiven");

    if (testGivenElement) {
      testGivenElement.innerText = `Tests Given: ${testCount}`;
    } else {
      console.log("Element with id 'userTestGiven' not found");
    }
  }
}


function displayLeaderboard() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.sort(function(a, b) {
    return b.score - a.score;
  });

  for (let i = 0; i < 3; i++) {
    const scoreElement = document.getElementById(`score${i + 1}`);
    const nameElement = document.getElementById(`Name${i + 1}`);

    if (scoreElement && nameElement && users[i]) {
      scoreElement.textContent = `Score: ${users[i].score}`;  
      nameElement.textContent = users[i].fullName;  
    }
  }

  
  for (let i = 3; i < 10; i++) {
    const nameElement = document.getElementById(`name${i + 1}`);
    const scoreElement = document.getElementById(`score${i + 1}`);

    
    if (nameElement && scoreElement && users[i]) {
      nameElement.textContent = `#${i + 1} ${users[i].fullName}`;  
      scoreElement.textContent = users[i].score;  
    }
  }
}

function togglePassword(fieldId, iconId) {
  const passwordField = document.getElementById(fieldId);
  const eyeIcon = document.getElementById(iconId);

  if (passwordField && eyeIcon) {
    if (passwordField.type === "password") {
      passwordField.type = "text";
      eyeIcon.classList.remove("fa-eye");
      eyeIcon.classList.add("fa-eye-slash");
    } else {
      passwordField.type = "password";
      eyeIcon.classList.remove("fa-eye-slash");
      eyeIcon.classList.add("fa-eye");
    }
  } else {
    console.log("passwordField or eyeIcon not found");
  }
}

function logout() {
  if (confirm("Are you sure to logout?")) {
    localStorage.removeItem("loggedInUserId");
    window.location.href = "/quize.html";
  }
}


const score6Element = document.getElementById("score6");
const userRankLabel = document.getElementById("numbering");
const rankElement = document.getElementById("userRank");


if (score6Element) {
  
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = users.find(user => user.id == loggedInUserId);
  if (loggedInUser) {
    
    const sortedUsers = users.sort((a, b) => b.score - a.score);
    const rank = sortedUsers.findIndex(user => user.id == loggedInUserId) + 1;

    function getRankSuffix(rank) {
      if (rank === 1) return "st";
      if (rank === 2) return "nd";
      if (rank === 3) return "rd";
      return "th";
    }
    if (rank > 2 && rank <= 5)  {
      userRankLabel.textContent = `#${rank}`;
      score6Element.textContent = `${loggedInUser.fullName} - ${loggedInUser.score}`;
    } else {
      rankElement.textContent = "#6";
      score6Element.textContent = ""; 
    }

    if (rankElement) {
      console.log("rankElement...", rankElement);
      const rankWithSuffix = rank + getRankSuffix(rank);
      rankElement.innerText = `Your rank: ${rankWithSuffix}`;
    }
  }
}




function logout() {
  const modal = document.getElementById("logoutModal");
  const confirmButton = document.getElementById("confirmLogout");
  const cancelButton = document.getElementById("cancelLogout");
  const usernameDisplay = document.getElementById("usernameDisplay");

  const loggedInUserId = localStorage.getItem("loggedInUserId");
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const loggedInUser = users.find((user) => user.id == loggedInUserId);

  if (loggedInUser) {
    usernameDisplay.textContent = `Are you sure you want to logout, ${loggedInUser.fullName}?`;
  } else {
    usernameDisplay.textContent = "Are you sure you want to logout?";
  }
  if (modal) {
    modal.style.display = "flex"; 
  }
  confirmButton.onclick = function () {
    modal.style.display = "none"; 
    showFinalLogoutModal(loggedInUser); 
  };
  cancelButton.onclick = function () {
    modal.style.display = "none"; 
  };
  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
}


function showFinalLogoutModal(user) {
  const finalModal = document.getElementById("finalLogoutModal");
  const finalMessage = document.getElementById("finalConfirmationMessage");
  const confirmFinalButton = document.getElementById("confirmFinalLogout");
  const cancelFinalButton = document.getElementById("cancelFinalLogout");

  
  if (user) {
    finalMessage.textContent = `Are you really sure you want to logout, ${user.fullName}?`;
  } else {
    finalMessage.textContent = "Are you really sure you want to logout?";
  }

  if (finalModal) {
    finalModal.style.display = "flex"; 
  }
  confirmFinalButton.onclick = function () {
    localStorage.removeItem("loggedInUserId");
    window.location.href = "/quize.html"; 
  };

  
  cancelFinalButton.onclick = function () {
    finalModal.style.display = "none"; 
  };

  window.onclick = function (event) {
    if (event.target === finalModal) {
      finalModal.style.display = "none";
    }
  };
}


function displayCurrentUserScore() {

  const loggedInUserId = localStorage.getItem("loggedInUserId");

  if (!loggedInUserId) {
    console.log("No user is logged in.");
    return; 
  }

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const loggedInUser = users.find(user => user.id == loggedInUserId);

  if (loggedInUser) {
    const score = loggedInUser.score;
    const header2Element = document.getElementById("header2");

    if (header2Element) {
      header2Element.innerText = "Your Score: " + score;
    } else {
      console.log("header2 element not found.");
    }
  } else {
    console.log("User not found in localStorage.");
  }
}


function displayTimeTaken(timeTaken) {
  const ulElement = document.createElement("ul");
  ulElement.innerHTML = `Time Taken: <span>${timeTaken}</span>`;

  const parentElement = document.getElementById("someContainer"); // जहाँ भी इसे दिखाना है वहां का ID दें
  if (parentElement) {
    parentElement.appendChild(ulElement);
  } else {
    console.log("Target container not found.");
  }
}

let startTime;

function startQuiz() {
  startTime = new Date().getTime(); // Start time in milliseconds
  localStorage.setItem("quizStartTime", startTime);
}

function saveTimeTaken() {
  const startTime = localStorage.getItem("quizStartTime");
  if (startTime) {
    const endTime = new Date().getTime();
    const timeTaken = Math.floor((endTime - startTime) / 1000); // Convert to seconds
    localStorage.setItem("quizTimeTaken", timeTaken);
  }
}

function getTimeTaken() {
  const timeTaken = localStorage.getItem("quizTimeTaken");
  if (timeTaken) {
    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;
    return `Time Taken: ${minutes} min ${seconds} sec`;
  }
  return "Time not recorded.";
}

startQuiz();  // जब क्विज स्टार्ट हो
setTimeout(() => { 
  saveTimeTaken(); 
  console.log(getTimeTaken()); // टाइम को कंसोल में दिखाने के लिए
}, 5000);  // 5 सेकंड बाद टेस्ट पूरा मानकर




