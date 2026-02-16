// src/modules/utils.js

export async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

export async function getRandomBlock() {
  const random = Math.random();
  if (random < 0.33) return "RETA 🏎️";
  if (random < 0.66) return "CURVA ↪️";
  return "CONFRONTO 🥊";
}

export async function getRandomItem() {
  const random = Math.random();
  if (random < 0.20) return "COGUMELO 🍄";
  if (random < 0.40) return "BOMBA 💣";
  return null;
}

// Apenas UMA declaração desta função:
export async function logRollResult(name, dice, attr, color = "\x1b[0m") {
  const n = name.padEnd(12, " ");
  const total = dice + attr;
  console.log(`${color}  ${n} 🎲 ${dice} + ${attr} = \x1b[1m${total}\x1b[0m${color === "\x1b[0m" ? "" : "\x1b[0m"}`);
}