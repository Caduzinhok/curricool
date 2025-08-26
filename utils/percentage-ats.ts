import { ResumeData, Score } from "@/types/types";
import { hardSkills as allHardSkills } from "./hard-skills";
import { softSkills as allSoftSkills } from "./soft-skills";
import { fuzzyMatch } from "./similarity";

// Normalizar o texto
const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Escapa caracteres especiais para regex
const escapeRegex = (word: string) =>
  word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Verifica se palavra inteira existe no texto
const containsWholeWord = (text: string, word: string): boolean => {
  const regex = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
  return regex.test(text);
};

// Função principal de análise ATS
export function analisarATS(vaga: string, resume: ResumeData): Score {
  const vagaNormalized = normalize(vaga);

  // Extrair skills relevantes da vaga
  const hardSkillsVaga = allHardSkills.filter((skill) =>
    containsWholeWord(vagaNormalized, normalize(skill))
  );
  const softSkillsVaga = allSoftSkills.filter((skill) =>
    containsWholeWord(vagaNormalized, normalize(skill))
  );

  // Se não achou nenhuma skill na vaga
  if (hardSkillsVaga.length + softSkillsVaga.length === 0) {
    return { score: "0.00", keywordsFound: [], keywordsMissing: [], totalKeywords: 0 };
  }

  // Seções do currículo com pesos
  const sections = [
    { text: resume.skills.map((s) => s.name).join(" "), peso: 1 },
    { text: resume.experience.flatMap((e) => e.highlights).join(" "), peso: 3 },
    { text: resume.projects.flatMap((p) => p.highlights).join(" "), peso: 2 },
    { text: resume.certificates.map((c) => c.name).join(" "), peso: 1 },
    { text: resume.basics.summary, peso: 0.5 },
  ];

  // Peso máximo de todas as seções, usado para ser o limite a ser atingido
  const maxSectionWeight = Math.max(...sections.map((s) => s.peso));

  let keywordsFound: string[] = [];
  let scoreTotal = 0;
  let scoreTotalMaxVaga = 0;

  // Função genérica para processar skills
  const processSkills = (skills: string[], multiplier: number) => {
    for (const skill of skills) {
      const maxWeight = maxSectionWeight * multiplier;
      scoreTotalMaxVaga += maxWeight;

      let accumulatedWeight = 0;

      for (const sec of sections) {
        if (containsWholeWord(sec.text, skill) || fuzzyMatch(sec.text, skill) == true) {
          accumulatedWeight += sec.peso * multiplier;

          if (accumulatedWeight >= maxWeight) {
            accumulatedWeight = maxWeight;
            break;
          }
        }
      }

      if (accumulatedWeight > 0) keywordsFound.push(skill);
      scoreTotal += accumulatedWeight;
    }
  };

  // Processa hard e soft skills
  processSkills(hardSkillsVaga, 1);   // Hard skill = peso cheio
  processSkills(softSkillsVaga, 0.5); // Soft skill = metade

  // Palavras que faltam
  const keywordsMissing = [
    ...hardSkillsVaga.filter((k) => !keywordsFound.includes(k)),
    ...softSkillsVaga.filter((k) => !keywordsFound.includes(k)),
  ];

  const totalKeywords = hardSkillsVaga.length + softSkillsVaga.length;
  const score = ((scoreTotal / scoreTotalMaxVaga) * 100).toFixed(2);

  return { score, keywordsFound, keywordsMissing, totalKeywords };
}
