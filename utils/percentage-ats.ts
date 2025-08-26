import { ResumeData, Score } from "@/types/types";
import { hardSkills as allHardSkills } from "./hard-skills";
import { softSkills as allSoftSkills } from "./soft-skills";

// Normaliza texto
const normalize = (text: string) =>
  text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// Escapa caracteres especiais para regex
function escapeRegex(word: string): string {
  return word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Verifica se palavra inteira existe no texto
function containsWholeWord(text: string, word: string): boolean {
  const escaped = escapeRegex(word);
  const regex = new RegExp(`\\b${escaped}\\b`, "i");
  return regex.test(text);
}

// Função principal de análise ATS
export function analisarATS(vaga: string, resume: ResumeData): Score {
  const vagaNormalized = normalize(vaga);

  // Extrair skills da vaga
  const hardSkillsVaga = allHardSkills.filter((skill) =>
  {
    return containsWholeWord(vagaNormalized, normalize(skill))
  }
  );
  const softSkillsVaga = allSoftSkills.filter((skill) => {
    return containsWholeWord(vagaNormalized, normalize(skill));
  });

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

  let keywordsFound: string[] = [];
  let scoreTotal = 0;
  let scoreTotalMaxVaga = 0;

  function processSkills(skills: string[], multiplier: number) {
    skills.forEach((skill) => {
      // Peso máximo = maior peso entre todas as seções × multiplicador
      const maxWeight = Math.max(...sections.map((s) => s.peso)) * multiplier;
      scoreTotalMaxVaga += maxWeight;

      let skillWeight = 0;

      // Acumula peso se encontrado em qualquer seção, sem ultrapassar maxWeight
      for (const sec of sections) {
        if (containsWholeWord(sec.text, skill)) {
          skillWeight += sec.peso * multiplier;
          if (skillWeight >= maxWeight) {
            skillWeight = maxWeight;
            break;
          }
        }
      }

      if (skillWeight > 0) keywordsFound.push(skill);
      scoreTotal += skillWeight;
    });
  }

  // Processa hard e soft skills
  processSkills(hardSkillsVaga, 1);   // Hard skill = peso total
  processSkills(softSkillsVaga, 0.5); // Soft skill = metade do peso

  // Faltantes
  const keywordsMissing = [
    ...hardSkillsVaga.filter((k) => !keywordsFound.includes(k)),
    ...softSkillsVaga.filter((k) => !keywordsFound.includes(k)),
  ];

  const totalKeywords = hardSkillsVaga.length + softSkillsVaga.length;
  const score = scoreTotalMaxVaga > 0 ? ((scoreTotal / scoreTotalMaxVaga) * 100).toFixed(2) : "0.00";

  return { score, keywordsFound, keywordsMissing, totalKeywords };
}
