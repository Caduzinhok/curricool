import { ArrayEditor } from "../array-editor";
import { ResumeData } from "@/types/types";
import Input from "../Input";

interface CertificateFormsProps {
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    data: any;
}

export default function CertificateForm({ setData, data }: CertificateFormsProps) {
    const addCertificate = () => setData((d: ResumeData) => ({ ...d, certificates: [...d.certificates, { name: "", link: "" }] }));
    const removeCertificate = (idx: number) => setData((d: ResumeData) => ({ ...d, certificates: d.certificates.filter((_, i) => i !== idx) }));
    const patchCertificate = (idx: number, name: string) => setData((d: ResumeData) => ({ ...d, certificates: d.certificates.map((s, i) => (i === idx ? { ...s } : s)) }));

    return (
        <>
            <ArrayEditor
                label="Cursos e Certificados"
                items={data.certificates || []}
                onAdd={addCertificate}
                onRemove={removeCertificate}
                renderItem={(idx) => (
                    <Input label="Curso" value={data.certificates[idx].name} onChange={(e) => patchCertificate(idx, e.target.value)} />
                )}
            />
        </>

    );
}