import { forwardRef } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { TemplateProps } from "@/types/types";
import { translations } from "@/types/translate";
import { demoTruthy, fmtRange } from "@/utils/formatters";


export const TemplateATS = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data, language = "pt" }, ref) => {
    const t = translations[language]; // pegando a tradução
    const { basics, experience, education, projects, languages, skills, certificates } = data;

    return (
      <div
        ref={ref}
        className="bg-white text-gray-900 p-6 print:p-6 w-[816px] min-h-[1056px] mx-auto font-sans text-sm leading-relaxed"
      >
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-center">{basics?.name || "Seu Nome"}</h1>
          <h2 className="text-md font-semibold text-center text-gray-700">{basics?.title || "Seu Cargo"}</h2>
          <div className="flex flex-wrap justify-center items-center gap-2 mt-1 text-gray-700">
            {basics?.email && <span>{basics.email}</span>}
            {basics?.phone && <span>• {basics.phone}</span>}
            {basics?.website && <span>• {basics.website}</span>}
          </div>
        </div>

        {/* Resumo */}
        {demoTruthy(basics?.summary) && (
          <div className="mt-4">
            <div className="border-b border-gray-400 pb-1">
              <SectionTitle>{t.summary}</SectionTitle>
            </div>
            <p className="mt-2 text-gray-800">{basics.summary}</p>
          </div>
        )}

        {/* Experiência */}
        {experience?.length > 0 && (
          <div className="mt-4">
            <div className="border-b border-gray-400 pb-1">
              <SectionTitle>{t.experience}</SectionTitle>
            </div>
            <div className="mt-2 space-y-3">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>{exp.company}</span>
                    <span className="text-gray-600">{exp.location}</span>
                  </div>
                  <div className="flex justify-between text-gray-800">
                    <span>{exp.role}</span>
                    <span className="text-gray-600">{fmtRange(exp.start, exp.end)}</span>
                  </div>
                  <ul className="list-disc ml-5 mt-1 text-gray-800">
                    {exp.highlights?.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}


        {/* Educação */}
        {education?.length > 0 && (
          <div className="mt-4">
            <div className="border-b border-gray-400 pb-1">
              <SectionTitle>{t.education}</SectionTitle>
            </div>
            <ul className="mt-2 space-y-2 text-gray-800">
              {education.map((e, i) => (
                <li key={i}>
                  <div className="font-semibold">{e.institution}</div>
                  <div className="flex justify-between">
                    <span>{e.degree} - {e.course}</span>
                    <span>{e.start} - {e.end}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Projetos */}
        {projects?.length > 0 && (
          <div className="mt-4">
            <div className="border-b border-gray-400 pb-1">
              <SectionTitle>{t.projects}</SectionTitle>
            </div>
            <ul className="mt-2 space-y-2 text-gray-800">
              {projects.map((project, i) => (
                <li key={i}>
                  <div className="flex justify-between font-semibold">
                    <span>{project.name}</span>
                    {project.link && (
                      <a href={project.link} className="text-blue-700 underline text-xs">
                          {project.link}
                      </a>
                    )}
                  </div>
                  <ul className="list-disc ml-5 mt-1">
                    {project.highlights?.map((highlight, j) => (
                      <li key={j}>{highlight}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}


        {/* Outros */}
        {(languages?.length > 0 || skills?.length > 0 || certificates?.length > 0) && (
          <div className="mt-4">
            <div className="border-b border-gray-400 pb-1">
              <SectionTitle>{t.others}</SectionTitle>
            </div>
            <ul className="mt-2 space-y-2 text-gray-800 list-disc ml-5">

              {certificates.length > 0 && (
                <li>
                  <span className="font-semibold">{t.courses}: </span>
                  {certificates.map((c, i) => (
                    <span key={i}>
                      {c.name}{i < certificates.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </li>
              )}
              {languages.length > 0 && (
                <li>
                  <span className="font-semibold">{t.languages}: </span>
                  {languages.map((l, i) => (
                    <span key={i}>
                      {l.name}({l.level}){i < languages.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </li>
              )}
              {skills.length > 0 && (
                <li>
                  <span className="font-semibold">{t.skills}: </span>
                  {skills.map((s, i) => (
                    <span key={i}>
                      {s.name}{i < skills.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    );
  }
);


TemplateATS.displayName = "TemplateATS";
