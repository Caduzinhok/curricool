
interface HeaderFormProps {
    template: string;
    language?: string;
    setLanguage?: React.Dispatch<React.SetStateAction<"pt" | "en">>;
    setTemplate: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeaderForm({ template, setTemplate, language, setLanguage }: HeaderFormProps) {
    return (
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Editar Currículo</h2>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <select
                        value={language}
                        onChange={(e) => setLanguage && setLanguage(e.target.value.toString() as "pt" | "en")}
                        className="
                              text-sm
                              border
                              border-gray-300
                              rounded-md
                              px-3
                              py-2
                              bg-white
                              text-gray-900
                              shadow-sm
                              focus:outline-none
                              focus:ring-2
                              focus:ring-blue-500
                              focus:border-blue-500
                              transition
                              duration-150
                              ease-in-out
                            "
                    >
                        <option value="pt">Português</option>
                        <option value="en">English</option>
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={template}
                        onChange={(e) => setTemplate(e.target.value)}
                        className="
                              text-sm
                              border
                              border-gray-300
                              rounded-md
                              px-3
                              py-2
                              bg-white
                              text-gray-900
                              shadow-sm
                              focus:outline-none
                              focus:ring-2
                              focus:ring-blue-500
                              focus:border-blue-500
                              transition
                              duration-150
                              ease-in-out
                            "
                    >
                        <option value="ATS">ATS</option>
                        <option value="clean">Clean</option>
                    </select>
                </div>

            </div>
        </div>
    )
}