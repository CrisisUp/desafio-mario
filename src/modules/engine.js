import { rollDice, getRandomBlock, logRollResult, getRandomItem } from "./utils.js";

export async function runRace(player1, player2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`\n🏁 --- Rodada ${round} ---`);

    // 1. Sorteio do Bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // 2. Rolagem de Dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // 3. Cálculo de Habilidade Base
    let totalSkill1 = 0;
    let totalSkill2 = 0;

    if (block === "RETA") {
      totalSkill1 = diceResult1 + player1.VELOCIDADE;
      totalSkill2 = diceResult2 + player2.VELOCIDADE;
      await logRollResult(player1.NOME, "velocidade", diceResult1, player1.VELOCIDADE);
      await logRollResult(player2.NOME, "velocidade", diceResult2, player2.VELOCIDADE);
    }
    
    if (block === "CURVA") {
      totalSkill1 = diceResult1 + player1.MANOBRABILIDADE;
      totalSkill2 = diceResult2 + player2.MANOBRABILIDADE;
      await logRollResult(player1.NOME, "manobrabilidade", diceResult1, player1.MANOBRABILIDADE);
      await logRollResult(player2.NOME, "manobrabilidade", diceResult2, player2.MANOBRABILIDADE);
    }

    if (block === "CONFRONTO") {
      // No confronto, o item não afeta diretamente o poder (para simplificar), 
      // mas mantemos a lógica original de confronto.
      let powerResult1 = diceResult1 + player1.PODER;
      let powerResult2 = diceResult2 + player2.PODER;

      console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);
      await logRollResult(player1.NOME, "poder", diceResult1, player1.PODER);
      await logRollResult(player2.NOME, "poder", diceResult2, player2.PODER);

      if (powerResult1 > powerResult2 && player2.PONTOS > 0) {
        console.log(`🐢 ${player1.NOME} venceu! ${player2.NOME} perdeu 1 ponto.`);
        player2.PONTOS--;
      } else if (powerResult2 > powerResult1 && player1.PONTOS > 0) {
        console.log(`🐢 ${player2.NOME} venceu! ${player1.NOME} perdeu 1 ponto.`);
        player1.PONTOS--;
      } else {
        console.log(powerResult1 === powerResult2 ? "Confronto empatado!" : "Nenhum ponto perdido.");
      }
      
      // Pula o resto do loop (não aplica itens em rodada de confronto nesta versão)
      continue; 
    }

    // --- 4. FASE DOS ITENS (A Novidade!) ---
    // Sorteamos itens apenas em rodadas de corrida (Reta/Curva)
    
    // Item Player 1
    const item1 = await getRandomItem();
    if (item1 === "COGUMELO") {
        totalSkill1 += 2; // Turbo!
        console.log(`🍄 ${player1.NOME} pegou um COGUMELO! Ganhou +2 de velocidade.`);
    } else if (item1 === "BOMBA") {
        totalSkill1 -= 2; // Explodiu!
        console.log(`💣 ${player1.NOME} pegou uma BOMBA! Perdeu -2 de velocidade.`);
    }

    // Item Player 2
    const item2 = await getRandomItem();
    if (item2 === "COGUMELO") {
        totalSkill2 += 2;
        console.log(`🍄 ${player2.NOME} pegou um COGUMELO! Ganhou +2 de velocidade.`);
    } else if (item2 === "BOMBA") {
        totalSkill2 -= 2;
        console.log(`💣 ${player2.NOME} pegou uma BOMBA! Perdeu -2 de velocidade.`);
    }
    // ---------------------------------------

    // 5. Verifica quem venceu a rodada com os novos valores
    console.log(`Total Final: ${player1.NOME} (${totalSkill1}) vs ${player2.NOME} (${totalSkill2})`);

    if (totalSkill1 > totalSkill2) {
      console.log(`✨ ${player1.NOME} marcou um ponto!`);
      player1.PONTOS++;
    } else if (totalSkill2 > totalSkill1) {
      console.log(`✨ ${player2.NOME} marcou um ponto!`);
      player2.PONTOS++;
    } else {
      console.log("Empate na rodada! Ninguém pontuou.");
    }

    console.log("-----------------------------");
  }
}

// (Função declareWinner continua igual, não precisa mexer)
export async function declareWinner(player1, player2) {
  console.log("\n📢 --- Resultado Final ---");
  console.log(`${player1.NOME}: ${player1.PONTOS} ponto(s)`);
  console.log(`${player2.NOME}: ${player2.PONTOS} ponto(s)`);

  if (player1.PONTOS > player2.PONTOS)
    console.log(`\n🏆 ${player1.NOME} É O CAMPEÃO! PARABÉNS! 🏆`);
  else if (player2.PONTOS > player1.PONTOS)
    console.log(`\n🏆 ${player2.NOME} É O CAMPEÃO! PARABÉNS! 🏆`);
  else console.log("\nA corrida terminou em EMPATE!");
}