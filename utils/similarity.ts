
// Normalizar o texto
const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Calcula a similaridade entre duas strings (0 a 1)
function similarity(a: string, b: string): number {
  a = normalize(a);
  b = normalize(b);

  if (a === b) return 1;

  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  const longerLength = longer.length;

  if (longerLength === 0) return 0;

  // Conta caracteres iguais na mesma ordem
  let matches = 0;
  for (let i = 0; i < shorter.length; i++) {
    if (longer.includes(shorter[i])) matches++;
  }

  return matches / longerLength;
}

// Fuzzy match com threshold de 0.8 (80%)
export function fuzzyMatch(text: string, word: string, threshold = 0.8): boolean {
  const wordsInText = normalize(text).split(/\s+/);

  for (const w of wordsInText) {
    if (similarity(w, word) >= threshold) {
      return true;
    }
  }
  return false;
}
