import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import Textarea from "../textarea";
import { PatchBasics } from "@/app/handlers";

interface BasicInformationProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: ResumeData;
}

export default function BasicInformationForm({ setData, data }: BasicInformationProps) {
  // Handlers básicos
  const updateBasics = (patch: PatchBasics) => setData((d: ResumeData) => ({ ...d, basics: { ...d.basics, ...patch } }));

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-50">
            <Input label="Nome" value={data.basics?.name || ""} onChange={(e) => updateBasics({ name: e.target.value })} />
            <Input label="Título" value={data.basics?.title || ""} onChange={(e) => updateBasics({ title: e.target.value })} />
            <Input label="E-mail" value={data.basics?.email || ""} onChange={(e) => updateBasics({ email: e.target.value })} />
            <Input label="Telefone" value={data.basics?.phone || ""} onChange={(e) => updateBasics({ phone: e.target.value })} />
            <Input label="Localização" value={data.basics?.location || ""} onChange={(e) => updateBasics({ location: e.target.value })} />
            <Input label="Website" value={data.basics?.website || ""} onChange={(e) => updateBasics({ website: e.target.value })} />
            <div className="md:col-span-2">
                <Textarea label="Resumo" value={data.basics?.summary || ""} onChange={(e) => updateBasics({ summary: e.target.value })} />
            </div>
        </div>

    );
}