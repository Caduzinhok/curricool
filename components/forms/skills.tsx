import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";

interface SkillFormsProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: ResumeData;
}

export default function SkillsForm({ setData, data }: SkillFormsProps) {
    const addSkill = () => setData((d: ResumeData) => ({ ...d, skills: [...d.skills, { name: "" }] }));
    const removeSkill = (idx: number) => setData((d: ResumeData) => ({ ...d, skills: d.skills.filter((_, i) => i !== idx) }));
    const patchSkill = (idx: number, name: string) => setData((d: ResumeData) => ({ ...d, skills: d.skills.map((s, i) => (i === idx ? { name } : s)) }));

    return (
        <>
            <ArrayEditor
                label="Habilidades"
                items={data.skills || []}
                onAdd={addSkill}
                onRemove={removeSkill}
                renderItem={(idx) => (
                    <Input label="Habilidade" value={data.skills[idx].name} onChange={(e) => patchSkill(idx, e.target.value)} />
                )}
            />
        </>

    );
}