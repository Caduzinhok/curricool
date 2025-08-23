import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { PatchLanguage } from "@/app/handlers";

interface LanguageFormProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: any;
}

export default function LanguageForm({ setData, data }: LanguageFormProps) {
    const addLanguage = () => setData((d: ResumeData) => ({ ...d, languages: [...d.languages, { name: "", level: "" }] }));
    const removeLanguage = (idx: number) => setData((d: ResumeData) => ({ ...d, languages: d.languages.filter((_, i) => i !== idx) }));
    const patchLanguage = (idx: number, patch: PatchLanguage) => setData((d: ResumeData) => ({ ...d, languages: d.languages.map((l, i) => (i === idx ? { ...l, ...patch } : l)) }));

    return (
        <>
            <ArrayEditor
                label="Idiomas"
                items={data.languages || []}
                onAdd={addLanguage}
                onRemove={removeLanguage}
                renderItem={(idx) => (
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Idioma" value={data.languages[idx].name} onChange={(e) => patchLanguage(idx, { name: e.target.value })} />
                        <Input label="Nível" value={data.languages[idx].level} onChange={(e) => patchLanguage(idx, { level: e.target.value })} />
                    </div>
                )}
            />
        </>
    );
}