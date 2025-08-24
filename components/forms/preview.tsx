import { ResumeData } from "@/types/types";
import classNames from "../class-names";
import React, { RefObject } from "react";
import { Language } from "@/types/translate";

interface PreviewFormProps {
    data: ResumeData
    language: Language
    contentRef: RefObject<HTMLDivElement | null> //RefObject<HTMLDivElement>;
    TemplateComponent: React.ForwardRefExoticComponent<{ data: ResumeData, language: Language } & React.RefAttributes<HTMLDivElement>>;
}


export default function PreviewForm({data, contentRef, TemplateComponent, language}: PreviewFormProps) {
    return (
        <section className="bg-white rounded-2xl shadow-sm border p-3 h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg text-slate-800 font-semibold">Pré Visualização</h2>
                <div className="text-sm text-slate-800"></div>
            </div>
            <div className={classNames("overflow-auto border rounded-2xl py-2 bg-gray-50")}>
                <TemplateComponent ref={contentRef} data={data} language={language} />
            </div>
        </section>
    );
}