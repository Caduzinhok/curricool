import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { PatchEducation } from "@/app/handlers";
import Select from "../select";
import { maskMonthYear } from "@/utils/data-handlers";

interface EducationFormProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: any;
}

export default function EducationForm({ setData, data }: EducationFormProps) {
    const addEducation = () => setData((d: ResumeData) => ({ ...d, education: [...d.education, { institution: "", degree: "", start: "", end: "", course: "", location: "", details: [] }] }));
    const removeEducation = (idx: number) => setData((d: ResumeData) => ({ ...d, education: d.education.filter((_, i) => i !== idx) }));
    const patchEducation = (idx: number, patch: PatchEducation) => setData((d: ResumeData) => ({ ...d, education: d.education.map((e, i) => (i === idx ? { ...e, ...patch } : e)) }));

    return (
        <>
            <ArrayEditor
                label="Educação"
                items={data.education || []}
                onAdd={addEducation}
                onRemove={removeEducation}
                renderItem={(idx) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Instituição" value={data.education[idx].institution} onChange={(e) => patchEducation(idx, { institution: e.target.value })} />
                        <Select
                            label="Grau"
                            value={data.education[idx].degree}
                            onChange={(e) => patchEducation(idx, { degree: e.target.value })}
                        >
                            <option value="">Selecione o grau</option>
                            <option value="Ensino Fundamental">Ensino Fundamental</option>
                            <option value="Ensino Médio">Ensino Médio</option>
                            <option value="Técnico">Técnico</option>
                            <option value="Tecnólogo">Tecnólogo</option>
                            <option value="Graduação">Graduação</option>
                            <option value="Licenciatura">Licenciatura</option>
                            <option value="Bacharelado">Bacharelado</option>
                            <option value="Pós-graduação">Pós-graduação</option>
                            <option value="Especialização">Especialização</option>
                            <option value="Mestrado">Mestrado</option>
                            <option value="Doutorado">Doutorado</option>
                            <option value="Pós-doutorado">Pós-doutorado</option>
                            <option value="MBA">MBA</option>
                        </Select>
                        <Input label="Curso" value={data.education[idx].course} onChange={(e) => patchEducation(idx, { course: e.target.value })} />
                        <Input
                            label="Início"
                            type="text"
                            placeholder="MM/AAAA"
                            value={
                                /^\d{4}-\d{2}$/.test(data.education[idx].start)
                                    ? `${data.education[idx].start.slice(5, 7)}/${data.education[idx].start.slice(0, 4)}`
                                    : data.education[idx].start
                            }
                            onChange={(e) => {
                                const masked = maskMonthYear(e.target.value);
                                const match = /^(\d{2})\/(\d{4})$/.exec(masked);
                                if (match) {
                                    patchEducation(idx, { start: `${match[2]}-${match[1]}` });
                                } else {
                                    patchEducation(idx, { start: masked });
                                }
                            }}
                            className="w-full rounded-xl border px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10"
                            maxLength={7}
                        />
                        <Input
                            label="Término"
                            type="text"
                            placeholder="MM/AAAA"
                            value={
                                /^\d{4}-\d{2}$/.test(data.education[idx].end)
                                    ? `${data.education[idx].end.slice(5, 7)}/${data.education[idx].end.slice(0, 4)}`
                                    : data.education[idx].end
                            }
                            onChange={(e) => {
                                const masked = maskMonthYear(e.target.value);
                                const match = /^(\d{2})\/(\d{4})$/.exec(masked);
                                if (match) {
                                    patchEducation(idx, { end: `${match[2]}-${match[1]}` });
                                } else {
                                    patchEducation(idx, { end: masked });
                                }
                            }}
                            className="w-full rounded-xl border px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10"
                        />
                        <Input label="Local" value={data.education[idx].location} onChange={(e) => patchEducation(idx, { location: e.target.value })} />
                    </div>
                )}
            />
        </>
    );
}