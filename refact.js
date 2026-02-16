// src/modules/engine.js
import { styles } from "./styles.js";
import { rollDice, getRandomBlock, logRollResult, getRandomItem } from "./utils.js";

/**
 * Executa a lógica principal da corrida
 * @param {Object} p1 - Objeto do Jogador 1
 * @param {Object} p2 - Objeto do Jogador 2 (CPU)
 * @param {Number} totalRounds - Quantidade de rodadas
 */
export async function runRace(p1, p2, totalRounds) {
  for (let round = 1; round <= totalRounds; round++) {
    // Cabeçalho da rodada com estilo de informação
    const roundTitle = `─── ROUND ${round.toString().padStart(2, '0')} DE ${totalRounds.toString().padStart(2, '0')} 🏁 ───`;
    console.log(`\n${styles.paint(styles.info, roundTitle)}`);

    const block = await getRandomBlock();
    console.log(`${styles.paint(styles.bold, "Pista:")} ${block}`);

    let dice1 = await rollDice();
    let dice2 = await rollDice();
    let total1 = 0, total2 = 0;

    // Lógica de Atributos (Reta ou Curva)
    if (block.includes("RETA") || block.includes("CURVA")) {
      const isReta = block.includes("RETA");
      const attr1 = isReta ? p1.VELOCIDADE : p1.MANOBRABILIDADE;
      const attr2 = isReta ? p2.VELOCIDADE : p2.MANOBRABILIDADE;
      
      total1 = dice1 + attr1;
      total2 = dice2 + attr2;

      await logRollResult(p1.NOME, dice1, attr1, p1.COR);
      await logRollResult(p2.NOME, dice2, attr2, p2.COR);

      // --- Fase de Itens ---
      total1 += await applyItemEffect(p1);
      total2 += await applyItemEffect(p2);

      // --- Verificação de Vencedor da Rodada ---
      console.log(`${styles.paint(styles.dim, `Total Final: ${p1.NOME} (${total1}) vs ${p2.NOME} (${total2})`)}`);

      if (total1 > total2) {
        console.log(styles.paint(styles.success, `✨ ${p1.NOME} ganhou a rodada!`));
        p1.PONTOS++;
      } else if (total2 > total1) {
        console.log(styles.paint(styles.success, `✨ ${p2.NOME} ganhou a rodada!`));
        p2.PONTOS++;
      } else {
        console.log(styles.paint(styles.warning, "🤝 Empate! Ninguém pontuou."));
      }
    } 
    // Lógica de Confronto
    else {
      console.log(styles.paint(styles.error, "⚔️  BATALHA DE PODER!"));
      const power1 = dice1 + p1.PODER;
      const power2 = dice2 + p2.PODER;
      
      await logRollResult(p1.NOME, dice1, p1.PODER, p1.COR);
      await logRollResult(p2.NOME, dice2, p2.PODER, p2.COR);

      if (power1 > power2 && p2.PONTOS > 0) {
        p2.PONTOS--;
        console.log(styles.paint(styles.error, `🐢 ${p2.NOME} foi atingido e perdeu 1 ponto!`));
      } else if (power2 > power1 && p1.PONTOS > 0) {
        p1.PONTOS--;
        console.log(styles.paint(styles.error, `🐢 ${p1.NOME} foi atingido e perdeu 1 ponto!`));
      } else {
        console.log(styles.paint(styles.dim, "🛡️  O impacto foi absorvido ou ninguém tinha pontos!"));
      }
    }
    
    // Pequena pausa para o usuário acompanhar o log
    await new Promise(r => setTimeout(r, 800));
  }
}

/**
 * Função auxiliar para aplicar itens e retornar o modificador de valor
 */
async function applyItemEffect(player) {
  const item = await getRandomItem();
  if (!item) return 0;

  const isBonus = item.includes("🍄");
  const effect = isBonus ? 2 : -2;
  const style = isBonus ? styles.success : styles.error;
  
  console.log(`  ${styles.paint(style, `${item} ${player.NOME}: ${effect > 0 ? '+' : ''}${effect} pts`)}`);
  return effect;
}

/**
 * Exibe o placar final estilizado
 */
export async function declareWinner(p1, p2) {
  const line = "-".repeat(41);
  console.log(`\n${styles.paint(styles.info, `+${line}+`)}`);
  console.log(`${styles.paint(styles.info, `|`)} ${styles.paint(styles.bold, "PLACAR FINAL".padStart(26).padEnd(39))} ${styles.paint(styles.info, `|`)}`);
  console.log(`${styles.paint(styles.info, `+${line}+`)}`);
  
  const score1 = `${p1.NOME.padEnd(15)} : ${p1.PONTOS} pontos`;
  const score2 = `${p2.NOME.padEnd(15)} : ${p2.PONTOS} pontos`;
  
  console.log(`${styles.paint(styles.info, `|`)} ${score1.padEnd(39)} ${styles.paint(styles.info, `|`)}`);
  console.log(`${styles.paint(styles.info, `|`)} ${score2.padEnd(39)} ${styles.paint(styles.info, `|`)}`);
  console.log(`${styles.paint(styles.info, `+${line}+`)}`);

  if (p1.PONTOS > p2.PONTOS) {
    console.log(`\n${styles.paint(styles.success, `🌟 ${p1.NOME.toUpperCase()} É O GRANDE CAMPEÃO! 🏆`)}\n`);
  } else if (p2.PONTOS > p1.PONTOS) {
    console.log(`\n${styles.paint(styles.success, `🌟 ${p2.NOME.toUpperCase()} É O GRANDE CAMPEÃO! 🏆`)}\n`);
  } else {
    console.log(`\n${styles.paint(styles.warning, "🏁 A CORRIDA TERMINOU EM EMPATE!")}\n`);
  }
}