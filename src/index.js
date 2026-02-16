// src/index.js
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { characters } from "./modules/characters.js";
import { runRace, declareWinner } from "./modules/engine.js";

const rl = readline.createInterface({ input, output });

async function main() {
  console.log("🎮 Bem-vindo ao Mario Kart Simulator JS! 🎮\n");

  // 1. Mostrar opções de personagens
  console.log("Escolha seu piloto:");
  characters.forEach((char, index) => {
    console.log(
      `${index + 1}. ${char.NOME} (Vel: ${char.VELOCIDADE}, Man: ${
        char.MANOBRABILIDADE
      }, Pod: ${char.PODER})`
    );
  });

  // 2. Capturar entrada do usuário
  let playerChoice = 0;
  while (true) {
    const answer = await rl.question("\nDigite o número do seu piloto (1-4): ");
    playerChoice = parseInt(answer) - 1;
    
    if (playerChoice >= 0 && playerChoice < characters.length) {
      break;
    }
    console.log("❌ Opção inválida. Tente novamente.");
  }

  const player1 = characters[playerChoice];
  
  // 3. Escolher oponente aleatório (mas que não seja o mesmo player)
  let opponentChoice;
  do {
    opponentChoice = Math.floor(Math.random() * characters.length);
  } while (opponentChoice === playerChoice);
  
  const player2 = characters[opponentChoice];

  console.log(`\n✅ Você escolheu: ${player1.NOME}`);
  console.log(`🥊 Seu oponente será: ${player2.NOME}`);
  
  await rl.question("\nPressione ENTER para iniciar a corrida! 🚦");

  // 4. Iniciar Corrida
  await runRace(player1, player2);
  await declareWinner(player1, player2);

  rl.close();
}

main();