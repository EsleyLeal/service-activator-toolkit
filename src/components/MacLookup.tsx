import { useState } from "react";
import { getVendorByMac } from "../utils/getVendorByMac";

export function MacLookup() {
  const [mac, setMac] = useState("");
  const [vendor, setVendor] = useState<string | null>(null);

  const handleLookup = () => {
    const result = getVendorByMac(mac);
    setVendor(result);
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
          className="flex-1 p-2 border rounded dark:bg-gray-700 dark:text-white"
        />
        <button
          onClick={handleLookup}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Consultar
        </button>
      </div>
      {vendor && (
        <p className="mt-4 text-green-700 dark:text-green-400">
          <strong>Fabricante:</strong> {vendor}
        </p>
      )}
      {vendor === null && mac.length >= 6 && (
        <p className="mt-4 text-red-600 dark:text-red-400">
          Fabricante não encontrado.
        </p>
      )}
    </div>
  );
}
