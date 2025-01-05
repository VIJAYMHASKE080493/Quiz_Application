function data() {
  const username = document.getElementById("username").value;
  const EmailID = document.getElementById("EmailID").value;
  const Password = document.getElementById("Password").value;

  if (username == "" || EmailID == "" || Password == "") {
    alert("Sabhi fields mandatory hain");
    return false;
  }
  if (username.length < 10) {
    alert("Username 10 digits ka hona chahiye!");
    return false;
  }
  if (EmailID.length < 10) {
    alert("Email ID bahut chhota hai!");
    return false;
  }
  if (Password.length < 10) {
    alert("Password kam se kam 10 characters ka hona chahiye!");
    return false;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  // if (users.length >= 6) {
  //   alert("Aap maximum 6 users hi register kar sakte hain");
  //   return false;
  // }

  const userExists = users.some((user) => user.username === username);
  if (userExists) {
    alert("Username already exists!");
    return false;
  }

  const emailExists = users.some((user) => user.email === EmailID);
  if (emailExists) {
    alert("Email already exists!");
    return false;
  }

  const newUser = { username, email: EmailID, password: Password, score: 0 };
  users.push(newUser);

  localStorage.setItem("users", JSON.stringify(users));
  alert("User successfully register ho gaya!");
  return true;
}

function updateScore(username) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (user) {
    user.score += 10;
    localStorage.setItem("users", JSON.stringify(users));
    alert(`new score: ${user.score}`);
  }
}

let currentUser = null;

function login() {
  const email = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  let users = JSON.parse(localStorage.getItem("users"));
  const user = users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    window.location.href = "admin.html";
    localStorage.setItem("userLoggedIn", JSON.stringify(user));
    alert("Login successful!");
    currentUser = user.username; 
    displayUserScore(currentUser);
  } else {
    alert("Invalid username या password!");
  }
}


function displayUserScore(username) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (user) {
    document.getElementById("score").innerText = `Score: ${user.score}`;
  } else {
    alert("User not found!");
  }
}


const quizData = [
  {
    que: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
    choosedAnswer: null,
  },
  {
    que: "Which HTML element is used to define the title of a document?",
    options: ["<head>", "<title>", "<meta>", "<footer>"],
    answer: "<title>",
    choosedAnswer: null,
  },
  {
    que: "Which CSS property controls the text size?",
    options: ["font-size", "text-size", "text-style", "font-style"],
    answer: "font-size",
    choosedAnswer: null,
  },
  {
    que: "How do you create a function in JavaScript?",
    options: [
      "function = myFunction()",
      "function myFunction()",
      "create myFunction()",
      "function:myFunction()",
    ],
    answer: "function myFunction()",
    choosedAnswer: null,
  },
  {
    que: "Which tag is used to define an internal style sheet in HTML?",
    options: ["<css>", "<style>", "<script>", "<styles>"],
    answer: "<style>",
    choosedAnswer: null,
  },
  {
    que: "What is the correct syntax to change the background color of a page in CSS?",
    options: [
      "background-color: #FFFFFF;",
      "bgcolor: #FFFFFF;",
      "color: #FFFFFF;",
      "background: #FFFFFF;",
    ],
    answer: "background-color: #FFFFFF;",
    choosedAnswer: null,
  },
  {
    que: "Which of the following is a valid JavaScript variable name?",
    options: [
      "1stVariable",
      "first-variable",
      "_firstVariable",
      "first variable",
    ],
    answer: "_firstVariable",
    choosedAnswer: null,
  },
  {
    que: "What does the 'this' keyword refer to in JavaScript?",
    options: [
      "The global object",
      "The current function",
      "The current object",
      "The previous object",
    ],
    answer: "The current object",
    choosedAnswer: null,
  },
  {
    que: "How do you link an external CSS file in HTML?",
    options: [
      "<link rel='stylesheet' href='styles.css'>",
      "<style src='styles.css'>",
      "<stylesheet>styles.css</stylesheet>",
      "<link href='styles.css' rel='stylesheet'>",
    ],
    answer: "<link rel='stylesheet' href='styles.css'>",
    choosedAnswer: null,
  },
  {
    que: "Which property is used to change the font of an element in CSS?",
    options: ["font-family", "font-style", "text-font", "font-weight"],
    answer: "font-family",
    choosedAnswer: null,
  },
  {
    que: "What does the alert() method do in JavaScript?",
    options: [
      "Displays a message",
      "Logs a message to the console",
      "Sends a notification",
      "Creates a pop-up window",
    ],
    answer: "Displays a message",
    choosedAnswer: null,
  },
  {
    que: "Which attribute is used to specify the URL of an external script in HTML?",
    options: ["src", "href", "link", "script"],
    answer: "src",
    choosedAnswer: null,
  },
  {
    question: "How can you make a numbered list in HTML?",
    options: ["<ol>", "<ul>", "<list>", "<dl>"],
    answer: "<ol>",
    choosedAnswer: null,
  },
  {
    que: "Which CSS property is used for spacing between elements?",
    options: ["margin", "padding", "spacing", "border"],
    answer: "margin",
    choosedAnswer: null,
  },
  {
    que: "What is the output of 2 + '2' in JavaScript?",
    options: ["22", "4", "undefined", "Error"],
    answer: "22",
    choosedAnswer: null,
  },
  {
    que: "What is the purpose of the <div> tag in HTML?",
    options: [
      "To define a division or section",
      "To create a hyperlink",
      "To define an image",
      "To define a table",
    ],
    answer: "To define a division or section",
    choosedAnswer: null,
  },
  {
    que: "Which CSS property controls the visibility of an element?",
    options: ["display", "visibility", "opacity", "hidden"],
    answer: "visibility",
    choosedAnswer: null,
  },
  {
    que: "How do you declare a JavaScript array?",
    options: [
      "var myArray = []",
      "var myArray = ()",
      "var myArray = {}",
      "var myArray = ||",
    ],
    answer: "var myArray = []",
    choosedAnswer: null,
  },
  {
    que: "What is the correct way to add a comment in CSS?",
    options: [
      "// this is a comment",
      "<!-- this is a comment -->",
      "/* this is a comment */",
      "# this is a comment",
    ],
    answer: "/* this is a comment */",
    choosedAnswer: null,
  },
  {
    que: "How can you select an element with the id 'myId' in JavaScript?",
    options: [
      "document.getElementById('myId')",
      "document.selectElement('myId')",
      "document.querySelector('#myId')",
      "Both A and C",
    ],
    answer: "Both A and C",
    choosedAnswer: null,
  },
];

let currentIndex = 0;
// let totalScore = 0;
const selectedQue = quizData.sort(() => Math.random() - 0.5).slice(0, 10);
console.log(selectedQue);
localStorage.setItem("quizdates", JSON.stringify(selectedQue));
let datas = JSON.parse(localStorage.getItem("quizdates")) || [];

let totalQuestions = selectedQue.length;
console.log(totalQuestions, currentIndex);

function displayRandomQuestion(currentIndex, datas) {
  let userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
  console.log(userLoggedIn);
  if (datas && datas.length > 0) {
    const randomQue = datas[currentIndex];
    document.getElementById("que-number").innerHTML = currentIndex + 1;
    document.getElementById("quesBox").innerHTML = `${currentIndex + 1}. ${
      randomQue.que
    }`;

    const list = document.getElementById("mutipleoptions");
    list.innerHTML = "";

    randomQue.options.forEach((option) => {
      const listItem = document.createElement("li");
      listItem.textContent = option;

      if (randomQue.choosedAnswer === option) {
        listItem.classList.add("selected");
        styleSelectedOption(listItem);
      }

      
      listItem.addEventListener("click", () => {
        resetSelection(list); 
        listItem.classList.add("selected");
        styleSelectedOption(listItem); 

        randomQue.choosedAnswer = option;

        localStorage.setItem("quizdates", JSON.stringify(datas));

        checkAnswer(option, randomQue, userLoggedIn.username);
      });

      list.appendChild(listItem);
    });

    const previousbtn = document.getElementById("previous-btn");
    if (previousbtn) {
      previousbtn.style.visibility = currentIndex === 0 ? "hidden" : "visible";
    }

    updateProgress();
  }
}

function styleSelectedOption(element) {
  element.style.backgroundColor = "#f3bd00";
  element.style.borderRadius = "10px";
  element.style.width = "fit-content";
}

function resetSelection(list) {
  const selectedElements = list.querySelectorAll(".selected");
  selectedElements.forEach((el) => {
    el.classList.remove("selected");
    el.style = "";
  });
}

function nextQuestion() {
  if (currentIndex < totalQuestions - 1) {
    currentIndex++;
    displayRandomQuestion(currentIndex, datas);
  } else {
    let userLoggedIn = JSON.parse(localStorage.getItem("userLoggedIn"));
    saveScore(userLoggedIn.username); 
    alert("Quiz Complete! Redirecting to dashboard.");
    window.location.href = "dashboard.html";
  }
}


function previousQuestion() {
  if (currentIndex > 0) {
    currentIndex--;
    console.log("previousQuestion", currentIndex);
    displayRandomQuestion(currentIndex, datas);
  } else {
    alert("You're already at the first question!");
  }
}

function updateProgress() {
  if (totalQuestions <= 0) {
    console.error("Invalid totalQuestions value");
    return;
  }

  if (currentIndex < 0 || currentIndex >= totalQuestions) {
    console.error("currentIndex is out of valid bounds");
    return;
  }

  const progressPercentage = Math.min(
    ((currentIndex + 1) / totalQuestions) * 100,
    100
  );

  const progressBar = document.getElementById("coloring");
  if (progressBar) {
    progressBar.style.width = progressPercentage + "%";
  } else {
    console.error("Progress bar element not found");
  }
}

let totalScore = 0;

function checkAnswer(chosenAnswer, randomQue, username) {
  if (!username) {
    alert("Please login to submit answers!");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (!user) {
    alert("User not found!");
    return;
  }

  
  if (chosenAnswer === randomQue.answer && !randomQue.isCorrect) {
    user.score += 10; 
    randomQue.isCorrect = true;
  } else if (chosenAnswer !== randomQue.answer && randomQue.isCorrect) {
    user.score -= 10; 
    randomQue.isCorrect = false;
  }

  localStorage.setItem("users", JSON.stringify(users)); 
  localStorage.setItem("quizdates", JSON.stringify(datas)); 
  document.getElementById("score").innerText = `Score: ${user.score}`; 
}


console.log(checkAnswer);

function saveScore(username) {
  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find((user) => user.username === username);

  if (!user) {
    alert("User not found! Unable to save score.");
    return;
  }

  localStorage.setItem("users", JSON.stringify(users)); 
  alert("Score saved successfully!");
}


// Window.onload = function() {
//   saveScore(currentUser, user.score);
// }

// function displayLeaderboard() {
//   let usersData = localStorage.getItem("users");
//   let users;

//   if (usersData) {
//     try {
//       users = JSON.parse(usersData);
//     } catch (error) {
//       console.error("Error reading user data:", error);
//       users = [];
//     }
//   } else {
//     users = [];
//   }

//   if (users.length === 0) {
//     console.log("No user data available");
//     const leaderboardContainer = document.getElementById("leaderboard");
//     if (leaderboardContainer) {
//       leaderboardContainer.innerHTML = "<p>No users available</p>";
//     }
//     return;
//   }

//   users.sort(function (a, b) {
//     return (b.score || 0) - (a.score || 0);
//   });

//   const leaderboard = document.getElementById("leaderboard");
//   if (leaderboard) {
//     leaderboard.innerHTML = "";

//     users.slice(0, 6).forEach((user, index) => {
//       const userElement = document.createElement("p");
//       userElement.textContent = `${index + 1}. ${
//         user.username || "Unknown"
//       } - ${user.score || 0}`;
//       leaderboard.appendChild(userElement);
//     });
//   }
// }



window.addEventListener("DOMContentLoaded", () => {
  for (let i = 1; i <= 6; i++) {
    const nameElement = document.getElementById(`Name${i}`) || document.getElementById(`name${i}`);
    const scoreElement = document.getElementById(`score${i}`);

    if (nameElement) {
      const users = JSON.parse(localStorage.getItem(`users`));
      const savedName = users[i].username
      nameElement.innerText = savedName || "Name";
    }
    
    
    if (scoreElement) {
      const users = JSON.parse(localStorage.getItem(`users`));
      const savedScore = users[i].score
            scoreElement.innerText = savedScore || "0"; 
    }
  }
  console.log("Data loaded!");
});


window.addEventListener("beforeunload", () => {
  for (let i = 1; i <= 6; i++) {
    const nameElement = document.getElementById(`Name${i}`) || document.getElementById(`name${i}`);
    const scoreElement = document.getElementById(`score${i}`);

    if (nameElement) {
      localStorage.setItem(`name${i}`, nameElement.innerText);
    }
    
    if (scoreElement) {
      localStorage.setItem(`score${i}`, scoreElement.innerText);
    }
  }
  console.log("Data saved!");
});



function setupLogoutButton() {
  var logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.onclick = function () {
      const confirmation = confirm("Are you sure you want to log out?");
      if (confirmation) {
        localStorage.removeItem("userLoggedIn");
        window.location.href = "quize.html";
      }
    };
  }
}

window.onload = function () {
  if (currentUser) {
    displayUserScore(currentUser);
  }
  // displayLeaderboard();
  setupLogoutButton();
};

// if (currentIndex == 0) {
//   // displayRandomQuestion(currentIndex, datas);
//   // console.log("displayRandomQuestion.....", displayRandomQuestion);
// }

// document.getElementById("btn").addEventListener("click", () => {
//   console.log("currentIndex...............", currentIndex);
//   nextQuestion(currentIndex);
// });

// document.getElementById("previous-btn").addEventListener("click", function () {
//   previousQuestion(currentIndex);
// });
