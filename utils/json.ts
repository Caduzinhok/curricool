import { ResumeData } from "@/types/types";

  // JSON helpers
  export const exportJSON = (data: ResumeData) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `curriculo-${(data?.basics?.name || "resumo").toLowerCase().replace(/\s+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  export const importJSON = async (file: File, setData: React.Dispatch<React.SetStateAction<ResumeData>>) => {
    const text = await file.text();
    try {
      const parsed = JSON.parse(text);
      setData(parsed);
    } catch (e) {
      alert("Arquivo JSON inválido");
    }
  };