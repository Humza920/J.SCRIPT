const result = document.querySelector(".app");
const headsButton = document.querySelector("#heads-button");
const tailsButton = document.querySelector("#tails-button");
const tossButton = document.querySelector("#toss-button");
const tossAgainButton = document.querySelector("#toss-again-button");
const coinImage = document.querySelector(".coin-image");

let userChoice = null;

function selectChoice(choice) {
  userChoice = choice;
  result.innerHTML = `You selected: <strong>${choice.toUpperCase()}</strong>`;
}

function toss() {
  if (!userChoice) {
    result.innerHTML = "Please select Heads or Tails first!";
    return;
  }

  coinImage.classList.add("spin");

  const logic = Math.ceil(Math.random() * 2);
  const outcome = logic === 1 ? "heads" : "tails";
  const message =
    userChoice === outcome ? "YOU WON THE TOSS!" : "YOU LOST THE TOSS.";

  setTimeout(() => {
    result.innerHTML = `You selected ${userChoice.toUpperCase()}.<br>The result is ${outcome.toUpperCase()}!<br><strong>${message}</strong>`;
    coinImage.classList.remove("spin");
  }, 1000);
}

function tossAgain() {
  result.innerHTML = "";
  userChoice = null;
}

headsButton.addEventListener("click", () => selectChoice("heads"));
tailsButton.addEventListener("click", () => selectChoice("tails"));
tossButton.addEventListener("click", toss);
tossAgainButton.addEventListener("click", tossAgain);