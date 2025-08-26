import { ResumeData, Score } from "@/types/types";
import { analisarATS } from "@/utils/percentage-ats";
import { useEffect, useState } from "react";

interface JobModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  data: ResumeData;
}

export default function JobModal({ setIsModalOpen, data }: JobModalProps) {
  const [vaga, setVaga] = useState("");
  const [score, setScore] = useState<Score | null>(null);

  const handleAnalyzeATS = (vaga: string) => {
    const result = analisarATS(vaga, data)
    setScore(result)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  // dentro do componente JobModal
  useEffect(() => {
    // Desabilita scroll do body
    document.body.style.overflow = "hidden";

    // Reabilita scroll quando o modal fechar
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center rounded-xl justify-center overflow-auto p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 max-h-[80vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-4 w-full">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-slate-700">
              Analisar Vaga
            </h2>
            <p className="text-gray-500 text-sm">
              Adicione os requisitos de uma vaga e valide o match de seu curriculo com esta vaga!
            </p>
          </div>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>

        </div>

        {/* Textarea */}
        <textarea
          className="w-full h-40 border rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Cole aqui a descrição da vaga..."
          value={vaga}
          onChange={(e) => setVaga(e.target.value)}
        />
        {score && (
          <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Resultado da Análise ATS
            </h3>

            {/* Score */}
            <div className="mb-4">
              <p className="text-gray-700 mb-1">Compatibilidade:</p>

              {(() => {
                const valor = parseFloat(score.score);
                let cor = "bg-red-600"; // padrão vermelho

                if (valor >= 70) cor = "bg-green-600";
                else if (valor >= 30) cor = "bg-orange-500"; // laranja

                return (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                      <div
                        className={`${cor} h-4 rounded-full transition-all duration-500`}
                        style={{ width: `${valor}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{valor}%</p>
                  </>
                );
              })()}
            </div>

            {/* Palavras encontradas */}
            <div className="mb-3">
              <p className="font-medium text-green-600 mb-1">Encontradas ✅</p>
              <div className="flex flex-wrap gap-2">
                {score.keywordsFound.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>

            {/* Palavras faltando */}
            <div>
              <p className="font-medium text-red-600 mb-1">Faltando ❌</p>
              <div className="flex flex-wrap gap-2">
                {score.keywordsMissing.map((word, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full"
                  >
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>

        )}
        {/* Ações */}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 rounded-xl bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              handleAnalyzeATS(vaga);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          >
            Analisar
          </button>
        </div>
      </div>
    </div>
  );
}
