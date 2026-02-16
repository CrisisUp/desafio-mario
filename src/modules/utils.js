// src/modules/utils.js
export async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

export async function logRollResult(characterName, block, diceResult, attribute) {
  console.log(
    `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

// Função para sortear um item (Bônus ou Azar)
export async function getRandomItem() {
  const random = Math.random();
  let result;

  switch (true) {
    case random < 0.20:
      result = "COGUMELO"; // 20% de chance (Bônus)
      break;
    case random < 0.40:
      result = "BOMBA";    // 20% de chance (Azar/Penalidade)
      break;
    default:
      result = null;       // 60% de chance de não pegar nada
      break;
  }

  return result;
}