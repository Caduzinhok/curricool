import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";
import { PatchCertificate } from "@/app/handlers";

interface CertificateFormsProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: ResumeData;
}

export default function CertificateForm({ setData, data }: CertificateFormsProps) {
    const addCertificate = () => setData((d: ResumeData) => ({ ...d, certificates: [...d.certificates, { name: "", link: "" }] }));
    const removeCertificate = (idx: number) => setData((d: ResumeData) => ({ ...d, certificates: d.certificates.filter((_, i) => i !== idx) }));
    const patchCertificate = (idx: number, name: string) => setData((d: ResumeData) => ({ ...d, certificates: d.certificates.map((s, i) => (i === idx ? { ...s } : s)) }));

    return (
        <>
            <ArrayEditor<PatchCertificate>
                label="Cursos e Certificados"
                items={data.certificates || []}
                onAdd={addCertificate}
                onRemove={removeCertificate}
                renderItem={(item, idx: number) => (
                    <Input label="Curso" value={data.certificates[idx].name} onChange={(e) => patchCertificate(idx, e.target.value)} />
                )}
            />
        </>

    );
}