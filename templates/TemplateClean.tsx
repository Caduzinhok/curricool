import { forwardRef } from "react";
import { SectionTitle } from "@/components/SectionTitle";
import { TemplateProps } from "@/types/types";
import { fmtRange, hrefNormalize } from "@/utils/formatters";
import { translations } from "@/types/translate";

export const TemplateClean = forwardRef<HTMLDivElement, TemplateProps>(
  ({ data, language = "pt" }, ref) => {
    const t = translations[language];
    const { basics, skills, experience, education, languages, projects } = data;

    return (
      <div
        ref={ref}
        className="bg-white text-gray-900 p-8 print:p-8 w-[816px] min-h-[1056px] mx-auto font-sans text-sm leading-relaxed"
      >
        {/* Header */}
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl font-bold">{basics?.name || "Seu Nome"}</h1>
            <p className="text-base text-gray-700">{basics?.title}</p>
          </div>
          <div className="text-sm text-right leading-tight">
            {basics?.email && <div>{basics.email}</div>}
            {basics?.phone && <div>{basics.phone}</div>}
            {basics?.location && <div>{basics.location}</div>}
            {basics?.website && <div className="truncate max-w-[260px]">{basics.website}</div>}
          </div>
        </div>

        {/* Resumo */}
        {basics?.summary && (
          <div className="mt-6">
            <SectionTitle>{t.summary}</SectionTitle>
            <p className="text-sm leading-relaxed">{basics.summary}</p>
          </div>
        )}

        {/* Experiência */}
        {experience?.length > 0 && (
          <div className="mt-6">
            <SectionTitle>{t.experience}</SectionTitle>
            <div className="space-y-4">
              {experience.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm">
                    <div className="font-semibold">
                      {exp.role} • {exp.company}
                    </div>
                    <div className="text-gray-600">
                      {fmtRange(exp.start, exp.end)} • {exp.location}
                    </div>
                  </div>
                  <ul className="list-disc ml-5 text-sm leading-relaxed mt-1">
                    {exp.highlights?.map((h, j) => (
                      <li key={j}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Grid de Skills / Educação / Idiomas / Projetos */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {skills?.length > 0 && (
            <div className="col-span-1">
              <SectionTitle>{t.skills}</SectionTitle>
              <ul className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <li key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {education?.length > 0 && (
            <div className="col-span-1">
              <SectionTitle>{t.education}</SectionTitle>
              <ul className="space-y-2 text-sm">
                {education.map((e, i) => (
                  <li key={i}>
                    <div className="font-semibold">{e.institution}</div>
                    <div className="text-gray-700">
                      {e.degree} ({e.start}–{e.end})
                    </div>
                    {e.details?.length > 0 && (
                      <ul className="list-disc ml-5 text-xs mt-1">
                        {e.details.map((d, j) => (
                          <li key={j}>{d}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {languages?.length > 0 && (
            <div className="col-span-1">
              <SectionTitle>{t.languages}</SectionTitle>
              <ul className="space-y-1 text-sm">
                {languages.map((l, i) => (
                  <li key={i}>
                    {l.name} — <span className="text-gray-700">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          
          )}
          <div className="col-span-3">
            {projects?.length > 0 && (
                <div className="mt-4">
                  <SectionTitle>{t.projects}</SectionTitle>
                  <ul className="space-y-1 text-sm flex gap-3 flex-shrink flex-wrap">
                    {projects.map((p, i) => (
                      <li key={i}>
                        <span className="font-medium">{p.name}</span>{" "}
                        {p.link && (
                          <a
                            href={hrefNormalize(p.link)}
                            className="underline"
                            target="_blank"
                            rel="noreferrer"
                          >
                            {p.link}
                          </a>
                        )}
                        {p.highlights?.length > 0 && (
                          <ul className="list-disc ml-5 text-xs mt-1">
                            {p.highlights.map((h, j) => (
                              <li key={j}>{h}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
);

TemplateClean.displayName = "TemplateClean";
