const words = [
  "apple",
  "table",
  "chair",
  "smile",
  "happy",
  "black",
  "white",
  "grape",
  "music",
  "beach",
  "heart",
  "light",
  "cloud",
  "sunny",
  "laugh",
  "earth",
  "water",
  "watch",
  "sweat",
  "bread",
  "house",
  "woman",
  "manly",
  "dream",
  "night",
  "right",
  "quiet",
  "sweet",
  "child",
  "ocean",
  "dance",
  "blend",
  "storm",
  "power",
  "tiger",
  "rover",
  "oasis",
  "flame",
  "spark",
  "queen",
  "clock",
  "mango",
  "honey",
  "frost",
  "globe",
  "faith",
  "image",
  "dream",
  "shiny",
  "magic",
  "peace",
  "forge",
  "mirth",
  "brave",
  "giant",
  "gloom",
  "wrist",
  "pride",
  "grind",
  "swirl",
  "solid",
  "blend",
  "lunar",
  "shake",
  "music",
  "stoic",
  "blaze",
  "bliss",
  "spoon",
  "knife",
  "sugar",
  "smart",
  "laser",
  "crown",
  "sweep",
  "brick",
  "smirk",
  "sworn",
  "swing",
  "greet",
  "sling",
  "blend",
  "sheep",
  "creek",
  "creep",
  "greet",
  "feast",
  "scent",
  "blend",
  "skirt",
  "charm",
  "slick",
  "slick",
  "strap",
  "swamp",
];

const gameData = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

const randomIndex = Math.floor(Math.random() * words.length);
const word = words[randomIndex];

let currentRowIndex = 0;
let currentColIndex = 0;

generateBoxes();
generateButtons();

const letterBoxes = document.querySelectorAll("[data-box-row]");
const buttons = document.querySelectorAll(".button");
const alertDiv = document.getElementById("alert");

function generateBoxes() {
  let boxesContainer = document.getElementById("boxes");

  [1, 2, 3, 4, 5, 6].forEach((rowNumber) => {
    let rowHtml = `<div class="box__row" data-box-row="${rowNumber}">`;
    rowHtml += createBoxes();
    rowHtml += "</div>";

    boxesContainer.innerHTML += rowHtml;
  });

  function createBoxes() {
    let boxes = "";

    for (let i = 0; i < 5; i++) {
      boxes += '<div class="box"></div>';
    }

    return boxes;
  }
}

function generateButtons() {
  let buttonsContainer = document.getElementById("buttons");
  const buttons = [
    "q",
    "w",
    "e",
    "r",
    "t",
    "y",
    "u",
    "i",
    "o",
    "p",
    "|",
    "a",
    "s",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "|",
    "enter",
    "z",
    "x",
    "c",
    "v",
    "b",
    "n",
    "m",
    "backspace",
  ];

  let rowElement = '<div class="button__row">';

  buttons.forEach((button) => {
    if (button == "|") {
      rowElement += "</div>";
      buttonsContainer.innerHTML += rowElement;
      rowElement = '<div class="button__row">';
      return;
    }

    let btnElem = `<div class="button" data-value="${button}">${button}</div>`;

    rowElement += btnElem;
  });

  buttonsContainer.innerHTML += rowElement + "</div>";
}

function shakeBoxRow(rowIndex) {
  letterBoxes[rowIndex].classList.add("shake__row");

  setTimeout(() => {
    letterBoxes[rowIndex].classList.remove("shake__row");
  }, 300);
}

function displayAlert(text, disappear) {
  alertDiv.innerText = text;
  alertDiv.classList.add("show");

  if (disappear) {
    setTimeout(() => {
      alertDiv.classList.remove("show");
    }, 2000);
  }
}

function clearBoxes() {
  const boxes = document.querySelectorAll(".box");
  boxes.forEach((box) => {
    box.innerText = "";
  });
}

function clearGameData() {
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData[i].length; j++) {
      gameData[i][j] = "";
    }
  }
}

function resetIndexes() {
  currentRowIndex = 0;
  currentColIndex = 0;
}

function removeStyles() {
  const targetClasses = [
    "letter__status",
    "letter__present",
    "letter__absent",
    "letter__correct",
  ];

  targetClasses.forEach((cssClass) => {
    document
      .querySelectorAll(`.${cssClass}`)
      .forEach((element) => element.classList.remove(cssClass));
  });
}

function gameResult() {
  let wordMatched = false;

  if (word == gameData[currentRowIndex].join("")) {
    wordMatched = true;
  }

  return wordMatched;
}

function showResultOrGoToNextRow() {
  let wordMatched = gameResult();

  if (!wordMatched) {
    goToNextRow();
  } else {
    setTimeout(() => {
      displayAlert("Well done!", false);
    }, 500);
  }
}

function updateKeyboardStyle(tileDetails) {
  tileDetails.forEach((tile) => {
    const letterBtn = document.querySelector(`[data-value="${tile.letter}"]`);
    letterBtn.classList.add("letter__status");

    if (tile.result == "correct") {
      letterBtn.classList.add("letter__correct");
    } else if (tile.result == "present") {
      letterBtn.classList.add("letter__present");
    } else {
      letterBtn.classList.add("letter__absent");
    }
  });
}

function flipTile(tileDetails) {
  [...letterBoxes[currentRowIndex].children].forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("letter__status", tileDetails[index].classname);

      if (index == 4) {
        showResultOrGoToNextRow();
        updateKeyboardStyle(tileDetails);
      }
    }, index * 250);
  });
}

function goToNextRow() {
  currentColIndex = 0;

  if (currentRowIndex < 5) {
    currentRowIndex++;
  } else {
    setTimeout(() => {
      displayAlert(`Correct word was ${word.toUpperCase()}`, false);
    }, 500);
  }
}

function showResult() {
  const splitWord = word.split("");
  const tileDetails = gameData[currentRowIndex].map((item, index) => {
    if (splitWord[index] == item) {
      return { classname: "letter__correct", letter: item, result: "correct" };
    } else if (word.includes(item)) {
      return { classname: "letter__present", letter: item, result: "present" };
    } else {
      return { classname: "letter__absent", letter: item, result: "absent" };
    }
  });

  flipTile(tileDetails);
}

buttons.forEach((button) => {
  button.addEventListener("click", handleKeyPress);
});

function isBetweenAtoZ(input) {
  const regex = /^[a-z]+$/;
  return regex.test(input);
}

window.addEventListener("keyup", handleKeyPress);

function handleKeyPress(e) {
  let key = "";

  if (e.type == "click") {
    key = e.target.dataset.value;
  } else {
    if (e.key == "Enter" || e.key == "Backspace" || isBetweenAtoZ(e.key)) {
      key = e.key;
    } else {
      return;
    }
  }

  if (key == "enter" || key == "Enter") {
    if (currentColIndex < 5) {
      shakeBoxRow(currentRowIndex);
      displayAlert("Not enough letters!", true);
      return;
    }

    showResult();

    return;
  }

  if (key == "backspace" || key == "Backspace") {
    if (currentColIndex > 0) {
      currentColIndex--;
      gameData[currentRowIndex][currentColIndex] = "";

      const currentBoxElementRow = letterBoxes[currentRowIndex];
      const currentBoxElementCol =
        currentBoxElementRow.children[currentColIndex];

      currentBoxElementCol.innerText = "";
    }

    return;
  }

  if (currentColIndex < 5) {
    gameData[currentRowIndex][currentColIndex] = key;

    const currentBoxElementRow = letterBoxes[currentRowIndex];
    const currentBoxElementCol = currentBoxElementRow.children[currentColIndex];

    currentBoxElementCol.innerText = key;
    currentBoxElementCol.classList.add("box__zoom");

    setTimeout(() => {
      currentBoxElementCol.classList.remove("box__zoom");
    }, 100);

    currentColIndex++;
  }
}
