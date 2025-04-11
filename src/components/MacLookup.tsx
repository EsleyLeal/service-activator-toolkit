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

  
}
