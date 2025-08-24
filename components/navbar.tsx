import CurricoolLogo from "@/assets/logo";
import { ResumeData } from "@/types/types";
import { demoData } from "@/utils/demo-data";
import { exportJSON } from "@/utils/json";
import { Download, RefreshCw, Save } from "lucide-react";

interface NavbarProps {
    handlePrint: () => void;
    data: ResumeData;
    setData: (data: React.SetStateAction<ResumeData>) => void;
}


export default function Navbar({ handlePrint, data, setData }: NavbarProps) {
  const resetDemo = () => setData(demoData);

    return (
              <header className="sticky top-0 z-10 bg-slate-900/90 backdrop-blur-sm">
                <div className="mx-auto px-4 sm:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CurricoolLogo />
                    <CurricoolLogo />
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 mt-2 sm:mt-0">
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm sm:text-base"
                      title="Exportar PDF"
                    >
                      <Download size={16} /> PDF
                    </button>
                    <button
                      onClick={() => exportJSON(data)}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-fuchsia-700 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm sm:text-base"
                      title="Exportar JSON"
                    >
                      <Save size={16} /> JSON
                    </button>
                    <button
                      onClick={resetDemo}
                      className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-red-600 to-yellow-600 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm sm:text-base"
                      title="Restaurar exemplo"
                    >
                      <RefreshCw size={16} /> Exemplo
                    </button>
                  </div>
                </div>
              </header>
    )
}