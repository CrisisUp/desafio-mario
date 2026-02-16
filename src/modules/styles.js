// src/modules/styles.js

export const styles = {
  // Cores Base (ANSI)
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[90m",
  
  // Temas Semânticos
  success: "\x1b[32m",    // Verde (Vitórias)
  error: "\x1b[31m",      // Vermelho (Perdas/Confronto)
  warning: "\x1b[33m",    // Amarelo (Empates)
  info: "\x1b[36m",       // Ciano (Placar/Rodadas)
  highlight: "\x1b[35m",  // Magenta (Efeitos Especiais)
  
  /**
   * Encapsula um texto com uma cor e reseta ao final
   * @param {string} color - O código ANSI da cor
   * @param {string} text - O conteúdo a ser colorido
   * @returns {string} Texto formatado para o terminal
   */
  paint: (color, text) => `${color}${text}\x1b[0m`
};