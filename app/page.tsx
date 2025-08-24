"use client";
import React, { useMemo, useRef, useState, useEffect, forwardRef } from "react";
import { useReactToPrint } from "react-to-print";
import { ResumeData, TemplateProps } from "@/types/types";
import SkillsForm from "@/components/forms/skills";
import { demoData } from "@/utils/demo-data";
import ExperienceForm from "@/components/forms/experience";
import EducationForm from "@/components/forms/education";
import LanguageForm from "@/components/forms/languages";
import ProjectsForm from "@/components/forms/projects";
import PreviewForm from "@/components/forms/preview";
import BasicInformationForm from "@/components/forms/basic-information";
import HeaderForm from "@/components/forms/header-form";
import { TemplateClean } from "@/templates/TemplateClean";
import { TemplateATS } from "@/templates/TemplateATS";
import CertificateForm from "@/components/forms/certificates";

import Navbar from "@/components/navbar";
import { Download } from "lucide-react";

TemplateClean.displayName = "TemplateClean";
TemplateATS.displayName = "TemplateATS";

export default function Home() {
  const [data, setData] = useState<ResumeData>(demoData);
  const [language, setLanguage] = useState<"en" | "pt">("pt");
  const [template, setTemplate] = useState("ATS");
  const contentRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);

  // We store the resolve Promise being used in `onBeforePrint` here
  const promiseResolveRef = useRef<((value?: void | PromiseLike<void>) => void) | null>(null);


  const handlePrint = useReactToPrint({
    documentTitle: `Currículo - ${data.basics?.name || 'Sem nome'}`,
    contentRef: contentRef,
    pageStyle: `@page { size: A4; margin: 0; } body { margin: 0; }`,
    onBeforePrint: () => {
      return new Promise((resolve) => {
        promiseResolveRef.current = resolve;
        setIsPrinting(true);
      });
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      promiseResolveRef.current = null;
    },
  });

  // We watch for the state to change here, and for the Promise resolve to be available
  useEffect(() => {
    if (isPrinting && promiseResolveRef.current) {
      // Resolves the Promise, letting `react-to-print` know that the DOM updates are completed
      promiseResolveRef.current();
    }
  }, [isPrinting]);

  const TemplateATSWithLang = forwardRef<HTMLDivElement, TemplateProps>(
    (props, ref) => <TemplateATS {...props} ref={ref} />
  );
  TemplateATSWithLang.displayName = "TemplateATSWithLang";

  const TemplateCleanWithLang = forwardRef<HTMLDivElement, TemplateProps>(
    (props, ref) => <TemplateClean {...props} ref={ref} />
  );
  TemplateCleanWithLang.displayName = "TemplateCleanWithLang";

  const TemplateComponent = useMemo(() => {
    return template === "ATS" ? TemplateATSWithLang : TemplateCleanWithLang;
  }, [template, language]);



  return (
    <div className="min-h-screen bg-gradient-to-tl from-gray-800 to-gray-900 text-gray-100 flex flex-col">
      {/* Header */}
      <Navbar handlePrint={handlePrint} data={data} setData={setData} />

      {/* Hero text */}
      <div className="text-center text-gray-100 text-lg sm:text-xl md:text-2xl font-bold mt-6 px-4 sm:px-0">
        Crie seu currículo profissional em minutos e conquiste a vaga dos seus sonhos!
      </div>

      {/* Main content */}
      <main className="flex-1 mx-auto px-4 sm:px-12 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Editor */}
        <section className="border border-gray-400 rounded-2xl shadow-lg p-4 flex flex-col gap-6">
          <HeaderForm
            language={language}
            setLanguage={setLanguage}
            template={template}
            setTemplate={setTemplate}
          />
          <BasicInformationForm setData={setData} data={data} />
          <ExperienceForm setData={setData} data={data} />
          <div className="grid grid-cols-1 gap-4">
            <SkillsForm data={data} setData={setData} />
            <EducationForm setData={setData} data={data} />
            <CertificateForm data={data} setData={setData} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <LanguageForm setData={setData} data={data} />
            <ProjectsForm setData={setData} data={data} />
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm sm:text-base"
            title="Exportar PDF"
          >
            <Download size={16} />Gerar PDF
          </button>
        </section>

        {/* Preview */}
        <PreviewForm
          TemplateComponent={TemplateComponent}
          language={language}
          contentRef={contentRef}
          data={data}
        />
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-100 px-4 sm:px-0">
        © Dev StartS. Feito por{" "}
        <a
          href="https://github.com/Caduzinhok"
          className="underline"
          target="_blank"
          rel="noreferrer"
        >
          Caduzinhok
        </a>
      </footer>
    </div>

  );
}