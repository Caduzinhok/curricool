import { ResumeBasics, ResumeExperience, ResumeEducation, ResumeLanguage, ResumeProject } from '../types/types';

export type PatchBasics = Partial<ResumeBasics>;
export type PatchExperience = Partial<ResumeExperience>;
export type PatchEducation = Partial<ResumeEducation>;
export type PatchLanguage = Partial<ResumeLanguage>;
export type PatchProject = Partial<ResumeProject>;
