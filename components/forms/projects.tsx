import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { PatchProject } from "@/app/handlers";
import { Plus } from "lucide-react";

interface ProjectsFormProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: any;
}

export default function ProjectsForm({ setData, data }: ProjectsFormProps) {
    const addProject = () => setData((d: ResumeData) => ({ ...d, projects: [...d.projects, { name: "", link: "", highlights: [""] }] }));
    const removeProject = (idx: number) => setData((d: ResumeData) => ({ ...d, projects: d.projects.filter((_, i) => i !== idx) }));
    const patchProject = (idx: number, patch: PatchProject) => setData((d: ResumeData) => ({ ...d, projects: d.projects.map((p, i) => (i === idx ? { ...p, ...patch } : p)) }));
    const addProjectHighlight = (idx: number) => setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.map((p, i) => (i === idx ? { ...p, highlights: [...p.highlights, ""] } : p)),
    }));
    const patchProjectHighlight = (idx: number, hIdx: number, val: string) => setData((d: ResumeData) => ({
        ...d,
        projects: d.projects.map((p, i) => (i === idx ? { ...p, highlights: p.highlights.map((h, j) => (j === hIdx ? val : h)) } : p)),
    }));
    return (
        <>
            <ArrayEditor<PatchProject>
                label="Projetos"
                items={data.projects || []}
                onAdd={addProject}
                onRemove={removeProject}
                renderItem={(item, idx: number) => (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <Input label="Nome" value={data.projects[idx].name} onChange={(e) => patchProject(idx, { name: e.target.value })} />
                        <Input label="Link" value={data.projects[idx].link} onChange={(e) => patchProject(idx, { link: e.target.value })} />
                        <div className="sm:col-span-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-white">Destaques</span>
                                <button type="button" onClick={() => addProjectHighlight(idx)} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md text-gray-900/80 bg-gray-300 hover:bg-gray-300/80">
                                    <Plus size={16} />
                                    Novo destaque
                                </button>
                            </div>
                            <div className="space-y-2">
                                {(data.projects[idx].highlights || []).map((h: string, j: number) => (
                                    <input
                                        key={j}
                                        value={h}
                                        placeholder="Resultado, stack usada, link, métrica…"
                                        onChange={(e) => patchProjectHighlight(idx, j, e.target.value)}
                                        className="w-full rounded-xl border px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            />
        </>
    );
}