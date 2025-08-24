import { Dispatch, SetStateAction } from "react";
import { ResumeData } from "@/types/types";
import { PatchBasics, PatchEducation, PatchExperience, PatchLanguage, PatchProject } from "@/app/handlers";

export interface DataHandlers {
  updateBasics: (patch: PatchBasics) => void;
  addExperience: () => void;
  removeExperience: (idx: number) => void;
  patchExperience: (idx: number, patch: PatchExperience) => void;
  patchExperienceHighlight: (idx: number, hIdx: number, val: string) => void;
  addExperienceHighlight: (idx: number) => void;
  addSkill: () => void;
  removeSkill: (idx: number) => void;
  patchSkill: (idx: number, name: string) => void;
  addEducation: () => void;
  removeEducation: (idx: number) => void;
  patchEducation: (idx: number, patch: PatchEducation) => void;
  addLanguage: () => void;
  removeLanguage: (idx: number) => void;
  patchLanguage: (idx: number, patch: PatchLanguage) => void;
  addProject: () => void;
  removeProject: (idx: number) => void;
  patchProject: (idx: number, patch: PatchProject) => void;
  addProjectHighlight: (idx: number) => void;
  patchProjectHighlight: (idx: number, hIdx: number, val: string) => void;
}

export function createDataHandlers(setData: Dispatch<SetStateAction<ResumeData>>): DataHandlers {
  return {
    updateBasics: (patch: PatchBasics) =>
      setData((d: ResumeData) => ({ ...d, basics: { ...d.basics, ...patch } })),

    addExperience: () =>
      setData((d) => ({
        ...d,
        experience: [
          ...(d.experience || []),
          { company: "", role: "", start: "", end: "", location: "", highlights: [""] },
        ],
      })),

    removeExperience: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        experience: d.experience.filter((_, i) => i !== idx),
      })),

    patchExperience: (idx: number, patch: PatchExperience) =>
      setData((d: ResumeData) => ({
        ...d,
        experience: d.experience.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
      })),

    patchExperienceHighlight: (idx: number, hIdx: number, val: string) =>
      setData((d: ResumeData) => ({
        ...d,
        experience: d.experience.map((e, i) =>
          i === idx
            ? { ...e, highlights: e.highlights.map((h, j) => (j === hIdx ? val : h)) }
            : e
        ),
      })),

    addExperienceHighlight: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        experience: d.experience.map((e, i) =>
          i === idx ? { ...e, highlights: [...(e.highlights || []), ""] } : e
        ),
      })),

    addSkill: () =>
      setData((d: ResumeData) => ({ ...d, skills: [...d.skills, { name: "" }] })),

    removeSkill: (idx: number) =>
      setData((d: ResumeData) => ({ ...d, skills: d.skills.filter((_, i) => i !== idx) })),

    patchSkill: (idx: number, name: string) =>
      setData((d: ResumeData) => ({
        ...d,
        skills: d.skills.map((s, i) => (i === idx ? { name } : s)),
      })),

    addEducation: () =>
      setData((d: ResumeData) => ({
        ...d,
        education: [
          ...d.education,
          { institution: "", degree: "", start: "", end: "", details: [], course: "", location: "" },
        ],
      })),

    removeEducation: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        education: d.education.filter((_, i) => i !== idx),
      })),

    patchEducation: (idx: number, patch: PatchEducation) =>
      setData((d: ResumeData) => ({
        ...d,
        education: d.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)),
      })),

    addLanguage: () =>
      setData((d: ResumeData) => ({
        ...d,
        languages: [...d.languages, { name: "", level: "" }],
      })),

    removeLanguage: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        languages: d.languages.filter((_, i) => i !== idx),
      })),

    patchLanguage: (idx: number, patch: PatchLanguage) =>
      setData((d: ResumeData) => ({
        ...d,
        languages: d.languages.map((l, i) => (i === idx ? { ...l, ...patch } : l)),
      })),

    addProject: () =>
      setData((d: ResumeData) => ({
        ...d,
        projects: [...d.projects, { name: "", link: "", highlights: [""] }],
      })),

    removeProject: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.filter((_, i) => i !== idx),
      })),

    patchProject: (idx: number, patch: PatchProject) =>
      setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.map((p, i) => (i === idx ? { ...p, ...patch } : p)),
      })),

    addProjectHighlight: (idx: number) =>
      setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.map((p, i) =>
          i === idx ? { ...p, highlights: [...p.highlights, ""] } : p
        ),
      })),

    patchProjectHighlight: (idx: number, hIdx: number, val: string) =>
      setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.map((p, i) =>
          i === idx
            ? { ...p, highlights: p.highlights.map((h, j) => (j === hIdx ? val : h)) }
            : p
        ),
      })),
  };
}


export function maskMonthYear(value: string): string {
  // Remove tudo que não for número
  let cleaned = value.replace(/\D/g, "");

  // Limita a 6 dígitos (MMYYYY)
  if (cleaned.length > 6) {
    cleaned = cleaned.slice(0, 6);
  }

  // Se já tem mais de 2 dígitos, adiciona a "/"
  if (cleaned.length > 2) {
    return cleaned.slice(0, 2) + "/" + cleaned.slice(2);
  }

  return cleaned;
}

export function formatPhoneBR(value: string) {
  // Remove tudo que não for número
  const digits = value.replace(/\D/g, "");

  // Limita a quantidade de números (55 + DDD + número)
  const limited = digits.slice(0, 13);

  // Formata conforme a quantidade de dígitos
  if (limited.length <= 2) return `+${limited}`;
  if (limited.length <= 4) return `+${limited.slice(0, 2)} ${limited.slice(2)}`;
  if (limited.length <= 9) return `+${limited.slice(0, 2)} ${limited.slice(2, 4)} ${limited.slice(4)}`;
  return `+${limited.slice(0, 2)} ${limited.slice(2, 4)} ${limited.slice(4, 9)}-${limited.slice(9)}`;
}
