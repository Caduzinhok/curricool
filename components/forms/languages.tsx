import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { PatchLanguage } from "@/app/handlers";
import Select from "../select";

interface LanguageFormProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: ResumeData;
}

export default function LanguageForm({ setData, data }: LanguageFormProps) {
    const addLanguage = () => setData((d: ResumeData) => ({ ...d, languages: [...d.languages, { name: "", level: "" }] }));
    const removeLanguage = (idx: number) => setData((d: ResumeData) => ({ ...d, languages: d.languages.filter((_, i) => i !== idx) }));
    const patchLanguage = (idx: number, patch: PatchLanguage) => setData((d: ResumeData) => ({ ...d, languages: d.languages.map((l, i) => (i === idx ? { ...l, ...patch } : l)) }));

    return (
        <>
            <ArrayEditor<PatchLanguage>
                label="Idiomas"
                items={data.languages || []}
                onAdd={addLanguage}
                onRemove={removeLanguage}
                renderItem={(item, idx: number) => (
                    <div className="grid grid-cols-2 gap-3">
                        <Input label="Idioma" value={data.languages[idx].name} onChange={(e) => patchLanguage(idx, { name: e.target.value })} />
                        <Select label="Nível" value={data.languages[idx].level} onChange={(e) => patchLanguage(idx, { level: e.target.value })}>
                            <option value=""></option>
                            <option value="Básico">Básico</option>
                            <option value="Intermediário">Intermediário</option>
                            <option value="Avançado">Avançado</option>
                            <option value="Fluente">Fluente</option>
                            <option value="Nativo">Nativo</option>
                        </Select>
                    </div>
                )}
            />
        </>
    );
}