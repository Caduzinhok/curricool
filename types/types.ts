import { Language } from "./translate";

export interface ResumeBasics {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
}

export interface ResumeSkill {
  name: string;
}

export interface ResumeCertificate {
  name: string;
  link?: string;
}

export interface ResumeExperience {
  company: string;
  role: string;
  start: string;
  end: string;
  location: string;
  highlights: string[];
}

export interface ResumeEducation {
  institution: string;
  degree: string;
  course: string;
  location: string;
  start: string;
  end: string;
  details: string[];
}

export interface ResumeLanguage {
  name: string;
  level: string;
}

export interface ResumeProject {
  name: string;
  link: string;
  highlights: string[];
}

export interface ResumeData {
  basics: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    summary: string;
  };
  skills: Array<{ name: string }>;
  experience: Array<{
    company: string;
    role: string;
    start: string;
    end: string;
    location: string;
    highlights: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    course: string;
    location: string;
    start: string;
    end: string;
    details: string[];
  }>;
  languages: Array<{
    name: string;
    level: string;
  }>;
  projects: Array<{
    name: string;
    link?: string;
    highlights: string[];
  }>;
  certificates: Array<{
    name: string; 
    link?: string;
  }>;
}

export interface TemplateProps {
  data: ResumeData;
  language: Language;
}

export interface TemplateProps {
  data: ResumeData;
}
