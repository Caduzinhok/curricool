import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { Plus } from "lucide-react";
import { PatchExperience } from "@/app/handlers";
import { maskMonthYear } from "@/utils/data-handlers";

interface ExperienceFormProps {
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  data: ResumeData;
}

export default function ExperienceForm({ setData, data }: ExperienceFormProps) {
  const addExperience = () => setData((d) => ({ ...d, experience: [...(d.experience || []), { company: "", role: "", start: "", end: "", location: "", highlights: [""] }] }));
  const removeExperience = (idx: number) => setData((d: ResumeData) => ({ ...d, experience: d.experience.filter((_, i) => i !== idx) }));
  const patchExperience = (idx: number, patch: PatchExperience) => setData((d: ResumeData) => ({ ...d, experience: d.experience.map((e, i) => (i === idx ? { ...e, ...patch } : e)) }));
  const patchExperienceHighlight = (idx: number, hIdx: number, val: string) => setData((d: ResumeData) => ({
    ...d,
    experience: d.experience.map((e, i) => (i === idx ? { ...e, highlights: e.highlights.map((h: string, j: number) => (j === hIdx ? val : h)) } : e)),
  }));
  const addExperienceHighlight = (idx: number) => setData((d: ResumeData) => ({
    ...d,
    experience: d.experience.map((e, i) => (i === idx ? { ...e, highlights: [...(e.highlights || []), ""] } : e)),
  }));
  return (
    <div className="mt-6">
      <ArrayEditor<PatchExperience>
        label="Experiências"
        items={data.experience || []}
        onAdd={addExperience}
        onRemove={removeExperience}
        renderItem={(item, idx: number) => (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input label="Empresa" value={data.experience[idx].company} onChange={(e) => patchExperience(idx, { company: e.target.value })} />
            <Input label="Cargo" value={data.experience[idx].role} onChange={(e) => patchExperience(idx, { role: e.target.value })} />
            <Input
              label="Início"
              placeholder="MM/AAAA"
              value={data.experience[idx].start}
              onChange={(e) => {
                const masked = maskMonthYear(e.target.value);
                const match = /^(\d{2})\/(\d{4})$/.exec(masked);
                if (match) {
                  patchExperience(idx, { start: `${match[2]}-${match[1]}` });
                } else {
                  patchExperience(idx, { start: masked });
                }
              }}
            />
            <div className="items-start gap-2 w-full">
              <Input label="Término" value={data.experience[idx].end} placeholder="MM/YYYY" onChange={(e) => {
                const masked = maskMonthYear(e.target.value);
                const match = /^(\d{2})\/(\d{4})$/.exec(masked);
                if (match) {
                  patchExperience(idx, { end: `${match[2]}-${match[1]}` });
                } else {
                  patchExperience(idx, { end: masked });
                }
              }} />

              <div className="flex items-center mt-1 gap-2">
              <input
                type="checkbox"
                id={`current-${idx}`}
                checked={data.experience[idx].end === "Atual"}
                onChange={(e) =>
                  patchExperience(idx, { end: e.target.checked ? "Atual" : "" })
                }
              />
              <label htmlFor={`current-${idx}`} className="text-sm text-white mr-2">Atual</label>

              </div>
            </div>

            <Input label="Local" value={data.experience[idx].location} onChange={(e) => patchExperience(idx, { location: e.target.value })} />

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-white">Destaques</span>
                <button type="button" onClick={() => addExperienceHighlight(idx)} className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md text-gray-900/80 bg-gray-300 hover:bg-gray-300/80">
                  <Plus size={14} />
                  Novo destaque
                </button>
              </div>
              <div className="space-y-2">
                {(data.experience[idx].highlights || []).map((h: string, j: number) => (
                  <input
                    key={j}
                    value={h}
                    placeholder="Resultado alcançado, métrica, impacto…"
                    onChange={(e) => patchExperienceHighlight(idx, j, e.target.value)}
                    className="w-full rounded-xl border px-3 py-2 text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-black/10"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      />
    </div>
  );
}