document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const intro = document.getElementById("intro");
    const journey = document.getElementById("journey");
    const invitation = document.getElementById("invitation");
    const startJourney = document.getElementById("startJourney");
    const monthDisplay = document.getElementById("monthDisplay");
    const monthTitle = document.getElementById("monthTitle");
    const monthImage = document.getElementById("monthImage");
    const monthCaption = document.getElementById("monthCaption");
    const nextMonth = document.getElementById("nextMonth");
    const backButton = document.getElementById("backButton");
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const backToJourney = document.getElementById("backToJourney");
  
    // Journey Data
    const months = [
      { title: "November 2023", image: "./images/1.jpeg", caption: "Yie" },
      { title: "December 2023", image: "./images/2.jpeg", caption: "ganda mo dito (sa lahat naman)" },
      { title: "January 2024", image: "./images/3.jpeg", caption: "FIRST hello natin (i think)" },
      { title: "February 2024", image: "./images/4.jpeg", caption: "kunware pa nag wwork" },
      { title: "March 2024", image: "./images/5.jpeg", caption: "tanggal angas ko pero maganda ka dito e" },
      { title: "April 2024", image: "./images/6.jpeg", caption: "FIRST kiss (hi tita)" },
      { title: "May 2024", image: "./images/7.jpeg", caption: "last day of school yehey" },
      { title: "June 2024", image: "./images/8.jpeg", caption: "shopping day pero ako lang gumagastos" },
      { title: "July 2024", image: "./images/9.jpeg", caption: "1 magna cum laude and 1 valedictorian" },
      { title: "August 2024", image: "./images/10.jpeg", caption: "name tag says it all" },
      { title: "September 2024", image: "./images/11.jpeg", caption: "sports: bowling added to resume" },
      { title: "October 2024", image: "./images/12.jpeg", caption: "willing maging sapatos for u" },
      { title: "November 2024", image: "./images/13.jpg", caption: "???????" },
    ];
  
    let currentMonth = 0;
  
    // Start Journey
    startJourney.addEventListener("click", () => {
      intro.classList.add("hidden");
      journey.classList.remove("hidden");
      showMonth();
    });
  
    // Show Month
    function showMonth() {
      const month = months[currentMonth];
      monthTitle.textContent = month.title;
      monthImage.src = month.image;
      monthCaption.textContent = month.caption;
      if (currentMonth === months.length - 1) {
        nextMonth.textContent = "click to add picture for Nov 2024";
      } else {
        nextMonth.textContent = "Next";
      }
      backButton.style.display = currentMonth > 0 ? "inline-block" : "none"; // Show back button if not on first month
    }
  
    // Next Month
    nextMonth.addEventListener("click", () => {
      if (currentMonth < months.length - 1) {
        currentMonth++;
        showMonth();
      } else {
        journey.classList.add("hidden");
        invitation.classList.remove("hidden");
      }
    });
  
    // Back Button
    backButton.addEventListener("click", () => {
      if (currentMonth > 0) {
        currentMonth--;
        showMonth();
      }
    });
  
    // Back to Journey from Invitation
    backToJourney.addEventListener("click", () => {
      invitation.classList.add("hidden");
      journey.classList.remove("hidden");
      showMonth();
    });
  
    // Final Invitation Page
    noButton.addEventListener("mouseover", () => {
      const randomX = Math.random() * 300 - 150;
      const randomY = Math.random() * 300 - 150;
      noButton.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
  
    yesButton.addEventListener("click", () => {
  // Hide the invitation and start the Hangman game
  invitation.classList.add("hidden");
  startHangmanGame();
});

function startHangmanGame() {
    const word = "Mango Tree".toUpperCase(); // The word to guess
    const container = document.createElement("div");
    const title = document.createElement("h1");
    const wordContainer = document.createElement("div");
    const lettersContainer = document.createElement("div");
    const message = document.createElement("div");
    const hangmanContainer = document.createElement("div");
    let attempts = 0;
    let guessedLetters = [];
    let correctLetters = [];
  
    // Set up container styles
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "center";
    container.style.justifyContent = "center";
    container.style.height = "100vh";
    container.style.fontFamily = "'Arial', sans-serif";
    container.style.textAlign = "center";
  
    // Set title styles
    title.textContent = "🕵️‍♂️ SOLVE MO MUNA TO 🕵️‍♀️";
    title.style.fontSize = "2rem";
    title.style.marginBottom = "20px";
  
    // Word container styles
    wordContainer.style.fontSize = "2rem";
    wordContainer.style.marginBottom = "20px";
  
    // Letters container styles
    lettersContainer.style.display = "flex";
    lettersContainer.style.flexWrap = "wrap";
    lettersContainer.style.justifyContent = "center";
    lettersContainer.style.marginBottom = "20px";
  
    // Message styles
    message.style.fontSize = "1.5rem";
    message.style.color = "green";
  
    // Hangman feedback styles
    hangmanContainer.style.marginTop = "20px";
    hangmanContainer.style.fontSize = "1.2rem";
    hangmanContainer.style.color = "orange";
  
    // Render word with placeholders
    function renderWord() {
      wordContainer.innerHTML = word
        .split("")
        .map((letter) =>
          letter === " " ? "&nbsp;" : correctLetters.includes(letter) ? letter : "_"
        )
        .join(" ");
    }
  
    // Render alphabet letters
    function renderLetters() {
      lettersContainer.innerHTML = "";
      for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement("button");
        button.textContent = letter;
        button.style.margin = "5px";
        button.style.padding = "10px 15px";
        button.style.fontSize = "1rem";
        button.style.cursor = "pointer";
  
        if (guessedLetters.includes(letter)) {
          button.disabled = true;
          button.style.backgroundColor = "#ddd";
        }
  
        button.addEventListener("click", () => handleGuess(letter));
        lettersContainer.appendChild(button);
      }
    }
  
    // Handle letter guess
    function handleGuess(letter) {
      guessedLetters.push(letter);
      if (word.includes(letter)) {
        correctLetters.push(letter);
        renderWord();
        checkWin();
      } else {
        attempts++;
        hangmanContainer.textContent = `Wrong guesses: ${attempts} / INFINITY KASE MAGANDA KA`;
      }
      renderLetters();
    }
  
    // Check if user won
    function checkWin() {
      if (word.split("").every((letter) => letter === " " || correctLetters.includes(letter))) {
        message.textContent = "🎉 GRABE! not just a pretty face ka talaga nooo 🎉";
        setTimeout(showDateDetails, 1500);
      }
    }
  
    // Show the date details when solved
    function showDateDetails() {
      alert(`
      🌹 1ST ANNIVERSARY DATE 🌹
  
      ❤️ Date: November 28, 2024
      ❤️ Time: 6:00 PM
      ❤️ Location: Mango Tree BGC, 7th Avenue
  
      BRING your PRETTY face. LEAVE your BRAIN at home.
  
      🥂 Can't wait to see you there! 🥰
      🥂 Oh and btw, buy urself a nice dress too! 🥰
      🥂 Refresh ur bank acc (mwa!) 🥰
      `);
      location.reload(); // Reset the page after displaying the details
    }
  
    // Append elements to container
    container.appendChild(title);
    container.appendChild(wordContainer);
    container.appendChild(lettersContainer);
    container.appendChild(hangmanContainer);
    container.appendChild(message);
  
    // Clear the page and append the game container
    document.body.innerHTML = "";
    document.body.appendChild(container);
  
    // Initial render
    renderWord();
    renderLetters();
  }
  

      
  });
  