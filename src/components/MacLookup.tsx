import { useState, useEffect } from "react";
import { getVendorByMac } from "../utils/getVendorByMac";

interface MacLookupProps {
  vendor: string | null;
  setVendor: (vendor: string | null) => void;
}

export function MacLookup({ vendor, setVendor }: MacLookupProps) {
  const [mac, setMac] = useState("");

  // Atualiza o vendor automaticamente assim que o mac muda
  useEffect(() => {
    if (mac.trim() === "") {
      setVendor(null);
    } else if (mac.length >= 6) {
      const result = getVendorByMac(mac);
      setVendor(result);
    }
  }, [mac, setVendor]);

  // Função para limpar os valores
  const handleClear = () => {
    setMac("");
    setVendor(null);
  };

  return (
    <div className="p-4 border rounded shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-2 text-gray-800 dark:text-gray-100">
        Consulta de Fabricante por MAC
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          value={mac}
          onChange={(e) => setMac(e.target.value)}
          placeholder="Ex: 00:1A:2B:XX:XX:XX"
          className="text-center p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleClear}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Limpar
        </button>
      </div>
      {/* Opcional: você pode remover a exibição de vendor daqui,
          já que iremos exibí-lo no index.tsx */}
    </div>
  );
}
