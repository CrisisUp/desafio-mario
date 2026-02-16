import readline from "readline";
import { characters } from "./modules/characters.js";
import { runRace, declareWinner } from "./modules/engine.js";
import { styles } from "./modules/styles.js";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((resolve) => rl.question(q, resolve));

async function main() {
  console.clear();
  
  // Banner usando o styles.warning (amarelo) e styles.bold
  const bannerLine = "═════════════════════════════════════════";
  console.log(styles.paint(styles.warning, `╔${bannerLine}╗`));
  console.log(styles.paint(styles.warning, `║       🏎️  MARIO KART SIMULATOR JS 🏎️      ║`));
  console.log(styles.paint(styles.warning, `╚${bannerLine}╝`));

  console.log(`\n${styles.paint(styles.bold, "PILOTOS DISPONÍVEIS:")}`);
  console.log("┌────┬──────────────┬─────┬─────┬─────┐");
  console.log("│ ID │ Nome         │ VEL │ MAN │ POD │");
  console.log("├────┼──────────────┼─────┼─────┼─────┤");
  
  characters.forEach((c, i) => {
    const id = (i + 1).toString().padEnd(2);
    const nome = c.NOME.padEnd(12);
    const vel = c.VELOCIDADE.toString().padStart(3);
    const man = c.MANOBRABILIDADE.toString().padStart(3);
    const pod = c.PODER.toString().padStart(3);
    
    // Aplicando a cor específica de cada piloto na tabela
    const nomeColorido = styles.paint(c.COR, nome);
    console.log(`│ ${id} │ ${nomeColorido} │ ${vel} │ ${man} │ ${pod} │`);
  });
  console.log("└────┴──────────────┴─────┴─────┴─────┘");

  // 1. Escolha do Piloto
  const choice = await ask("\n👉 Escolha o ID do seu piloto: ");
  const p1Index = parseInt(choice) - 1;
  const p1 = characters[p1Index] || characters[0];

  // 2. Escolha do Oponente
  let cpuIdx;
  do { 
    cpuIdx = Math.floor(Math.random() * characters.length); 
  } while (cpuIdx === p1Index);
  const p2 = characters[cpuIdx];

  // 3. Escolha das Rodadas
  const roundsInput = await ask("🏁 Quantas rodadas? (Padrão 5): ");
  const rounds = parseInt(roundsInput) || 5;

  console.log(`\n${styles.paint(styles.info, `[!] Preparando pista para ${p1.NOME} vs ${p2.NOME}...`)}`);
  
  await ask(`\n${styles.paint(styles.bold, "🏁 Sente no cockpit e pressione \x1b[33mENTER\x1b[0m para a largada! 🚥 ")}`);

  // --- CONTAGEM REGRESSIVA ANIMADA COM FAROL ---
  console.clear();
  console.log(styles.paint(styles.error, "\n  🔴 3..."));
  await new Promise(r => setTimeout(r, 700));
  
  console.clear();
  console.log(styles.paint(styles.warning, "\n  🟡 2..."));
  await new Promise(r => setTimeout(r, 700));
  
  console.clear();
  console.log(styles.paint(styles.success, "\n  🟢 1..."));
  await new Promise(r => setTimeout(r, 700));
  
  console.clear();
  console.log(styles.paint(styles.success, styles.bold + "\n  🚥 GO! 🏎️💨\n"));
  await new Promise(r => setTimeout(r, 500)); 
  // -----------------------------------

  // 4. Início da Corrida
  await runRace(p1, p2, rounds);
  await declareWinner(p1, p2);

  rl.close();
}

main();