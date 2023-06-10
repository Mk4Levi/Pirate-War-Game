import characterData from "./data.js";
import Character from "./Character.js";

let villansArray = ["mihawk", "crocodile", "buggy"];
let isWaiting = false;

function getNewMonster() {
  const nextVillainData = characterData[villansArray.shift()];
  return nextVillainData ? new Character(nextVillainData) : {};
}

function attack() {
  if (!isWaiting) {
    shanks.setDiceHtml();
    villains.setDiceHtml();
    shanks.takeDamage(villains.currentDiceScore);
    villains.takeDamage(shanks.currentDiceScore);
    render();

    if (shanks.dead) {
      endGame();
    } else if (villains.dead) {
      isWaiting = true;
      if (villansArray.length > 0) {
        setTimeout(() => {
          villains = getNewMonster();
          render();
          isWaiting = false;
        }, 1500);
      } else {
        endGame();
      }
    }
  }
}

function endGame() {
  isWaiting = true;
  const endMessage =
    shanks.health === 0 && villains.health === 0
      ? "No victors - all Pirates are Dead"
      : shanks.health > 0
      ? "Red-Haired Shanks won the battle"
      : "Cross-Guild is Victorious";

  const endEmoji =
    shanks.health === 0 && villains.health === 0
      ? "./images/tie.png"
      : shanks.health > 0
      ? "./images/win.png"
      : "./images/lose.png";

  setTimeout(() => {
    document.body.innerHTML = `
                <div class="end-game">
                    <button id="attack-button" class="restart-btn">Restart Game</button>
                    <h2>Game Over</h2> 
                    <h3>${endMessage}</h3>
                    <img class="end-img" src=${endEmoji} />
                    <br>
                </div>`;
  }, 1500);

  setTimeout(() => {
    document
      .querySelector(".restart-btn")
      .addEventListener("click", () => window.location.reload());
  }, 1500);
}

document.getElementById("attack-button").addEventListener("click", attack);

function render() {
  document.getElementById("hero").innerHTML = shanks.getCharacterHtml();
  document.getElementById("villain").innerHTML = villains.getCharacterHtml();
}

const shanks = new Character(characterData.hero);
let villains = getNewMonster();
render();
