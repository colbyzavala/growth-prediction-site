const PromptElement = document.getElementById("Prompt");
const InputBox = document.getElementById("Input");
const MainTable = document.getElementById("MainTable");

let Debounce = false;
let DelayTime = 2;
let Finished = false;

const Questions = [
  { type: "Number", question: "How old are you?", DataPeice: 0 },
  { type: "Number", question: "How old is your mother?", DataPeice: 0 },
  { type: "Number", question: "How old is your father?", DataPeice: 0 },
  { type: "Number", question: "How tall are you?", DataPeice: 0 },
  { type: "Number", question: "How tall is your mother?", DataPeice: 0 },
  { type: "Number", question: "How tall is your father?", DataPeice: 0 },
];

let QuestionNumb = 0;
let currentRoot = null;

window.onload = function () {
  console.log(`Window Loaded!`);
  PromptQuestion();
};

function PromptQuestion() {
  if (QuestionNumb >= Questions.length) {
    GetHeight();
    return;
  }

  InputBox.type = Questions[QuestionNumb].type === "String" ? "text" : "number";

  PromptElement.textContent = Questions[QuestionNumb].question;
}

function DisplayUserData(Data) {
  if (!Data) {
    PromptElement.textContent = "Please enter a valid answer.";
    return;
  }

  if (QuestionNumb === 0 || QuestionNumb === 3) {
    const root = document.createElement("tr");
    MainTable.append(root);
    currentRoot = root;
  }

  const td = document.createElement("td");
  currentRoot.append(td);
  
  td.textContent = Data;

  if (Questions[QuestionNumb].type === "Number") {
    Questions[QuestionNumb].DataPeice = parseFloat(Data);
  }

  QuestionNumb++;
}

function DecimalToInches(RawNumber) {
  let feet = 0;
  let inches = 0;

  if (!Number.isInteger(RawNumber)) {
    const RawString = String(RawNumber);
    const SplitInteger = RawString.split(".", 2);

    const RawInches = Number(SplitInteger[1] * 0.1) * 12;

    if (!Number.isInteger(RawInches)) {
      const SplitDecimal = String(RawInches).split(".", 2);
      inches = Number(SplitDecimal[0]);
    }

    feet = SplitInteger[0];
  } else {
    feet = RawNumber;
  }

  return `${feet} foot, ${inches} Inches!`;
}

function GetHeight() {
  // Add moms height to fathers height add 5 inches and divide by 2.
  const mothersHeight = Questions[4].DataPeice;
  const fathersHeight = Questions[5].DataPeice;

  const RawHeight = (mothersHeight + fathersHeight + 0.5) / 2;
  const DecimalHeight = Math.round(RawHeight * 10) / 10;

  const FinalHeight = DecimalToInches(DecimalHeight);

  PromptElement.textContent = `Your bound to be: ${FinalHeight}!`;
}

function OnSubmit(UserInput) {
  if (Finished===false) {
    DisplayUserData(UserInput);
    PromptQuestion();

    console.log(QuestionNumb);
    if (QuestionNumb===6) {
      Finished = true;
    }

    InputBox.value = "";
  }
}
