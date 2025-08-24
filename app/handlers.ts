import { ResumeBasics, ResumeExperience, ResumeEducation, ResumeLanguage, ResumeProject, ResumeSkill, ResumeCertificate } from '../types/types';

export type PatchBasics = Partial<ResumeBasics>;
export type PatchExperience = Partial<ResumeExperience>;
export type PatchEducation = Partial<ResumeEducation>;
export type PatchLanguage = Partial<ResumeLanguage>;
export type PatchProject = Partial<ResumeProject>;
export type PatchSkill = Partial<ResumeSkill>;
export type PatchCertificate = Partial<ResumeCertificate>;
