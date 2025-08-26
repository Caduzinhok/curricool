import { Download } from "lucide-react";
import { UseReactToPrintFn } from "react-to-print";
interface GenerateButtonProps {
    handlePrint: UseReactToPrintFn;
}

export default function GenerateButton({handlePrint}: GenerateButtonProps) {
    return (
        <button
            onClick={handlePrint}
            className="flex items-center w-full justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-600 to-sky-700 text-white font-semibold rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all duration-200 text-sm sm:text-base cursor-pointer"
            title="Exportar PDF"
        >
            <Download size={16} />Gerar PDF
        </button>
    );
}