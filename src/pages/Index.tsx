import React, { useState, useEffect } from "react";
import ServiceActivationForm from "@/components/ServiceActivationForm";
import slogans from "@/data/slogans";
// import { getVendorByMac } from "../utils/getVendorByMac";
import { getVendorByMac } from "../utils/getVendorByMac";

// Função para formatar o vendor: insere quebra de linha após 29 caracteres
function formatVendor(text: string, limit: number = 30): string {
  if (text.length > limit) {
    return text.slice(0, limit) + "\n" + text.slice(limit);
  }
  return text;
}

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("theme");
      return savedMode ? savedMode === "dark" : false;
    }
    return false;
  });

  const [slogan, setSlogan] = useState<string>("Toolkit de Ativação de Serviços");
  const [vendor, setVendor] = useState<string | null>(null);
  const [mac, setMac] = useState<string>("");
  const [ip, setIp] = useState<string>("");


  // Atualiza o slogan aleatoriamente
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * slogans.length);
    setSlogan(slogans[randomIndex]);
  }, []);

  // Atualiza o tema
  useEffect(() => {
    if (isDarkMode) {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Atualiza o slogan periodicamente (a cada 3 minutos)
  useEffect(() => {
    let currentIndex = -1;
    const updateSlogan = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * slogans.length);
      } while (newIndex === currentIndex);
      currentIndex = newIndex;
      setSlogan(slogans[newIndex]);
    };
    updateSlogan(); // Chama imediatamente na montagem
    const interval = setInterval(updateSlogan, 180000);
    return () => clearInterval(interval);
  }, [slogans]);

  // Atualiza o vendor automaticamente quando o MAC muda
  useEffect(() => {
    if (mac.trim() === "") {
      setVendor(null);
    } else if (mac.length >= 6) {
      const result = getVendorByMac(mac);
      setVendor(result);
    }
  }, [mac]);

  const copiarMensagem = (tipo: "compatível" | "incompatível") => {
    let mensagem = "";
    if (tipo === "compatível") {
      mensagem = "Equipamento compatível com o plano, não necessário a troca.";
    } else {
      mensagem =
        "Equipamento não compatível com o plano, favor mandar um técnico ao local para realizar a troca do equipamento.";
    }
    navigator.clipboard.writeText(mensagem).catch(console.error);
  };

  const handleClear = () => {
    setMac("");
    setVendor(null);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Cabeçalho */}
      <div className="mb-8 text-center">
        <h1
          className={`text-3xl font-bold ${
            isDarkMode ? "text-blue-400" : "text-blue-700"
          }`}
        >
          {slogan}
        </h1>
        <p
          className={`mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
        >
          Gerenciamento de ativações, mudanças e verificações da rede
        </p>
      </div>

      {/* Layout com três colunas */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-start">
        {/* Coluna 1: Card de "ATIVAÇÃO VAREJO 2025" */}
        <div className="w-full md:w-[380px] space-y-4">
          <div className="p-1 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            <iframe
              className="w-full rounded shadow"
              src="https://forms.office.com/pages/responsepage.aspx?id=ygWfal5nYk2aT_HMz7cu2ZBbvZkClzlDv_JDKnxdx_JUREE0SjlQNzdVRDNOWVk4WTNHSTNWSVRIRCQlQCN0PWcu"
              height="730"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            >
              Carregando...
            </iframe>
          </div>
          {/* Botão para trocar o tema */}
          <div className="p-4  rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            <h2 className=" text-center text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
              Upgrade / Downgrade
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => copiarMensagem("compatível")}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Compatível
              </button>
              <button
                onClick={() => copiarMensagem("incompatível")}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Incompatível
              </button>
            </div>
          </div>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsDarkMode((prev) => !prev)}
          >
            Toggle Dark Mode
          </button>
        </div>

        {/* Coluna 2: Formulário principal */}
        <div className="md:flex-1 w-full max-w-[800px]">
          <ServiceActivationForm />
        </div>

        {/* Coluna 3: Suporte Avançado */}
        <div className="w-full md:w-[380px] space-y-4">
          {/* Card com iframe para Tratativas */}
          <div className="p-1 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            <iframe
              className="w-full rounded shadow"
              src="https://forms.office.com/pages/responsepage.aspx?id=ygWfal5nYk2aT_HMz7cu2ZBbvZkClzlDv_JDKnxdx_JUMTFBUzFUMU5HWTFUVUlEN1FGQUE2NERKRiQlQCN0PWcu"
              height="730"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
            />
          </div>
          {/* Card com a Consulta de Fabricante */}
          {/* Card de Upgrade / Downgrade */}
            <div className="border rounded bg-white dark:bg-gray-800 p-4">
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
          <div className="rounded-lg  bg-white dark:bg-gray-800 dark:border-gray-700 shadow">
            {/* Bloco de Consulta de MAC */}
            {vendor && (
  <>
    <a
      href={`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(vendor)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block mt-4 text-green-700 dark:text-green-400 cursor-pointer"
      style={{ whiteSpace: "pre-line" }}
    >
      <strong>{formatVendor(vendor, 29)}</strong>
    </a>

    {(vendor.includes("HUAWEI") || vendor.includes("TP-LINK")) && (
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          IP para teste de gerenciamento:
        </label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Ex: 192.168.1.1"
          className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
        />

        {ip && (
          <div className="mt-3 space-y-2">
            {vendor.includes("HUAWEI") ? (
              <>
                <a
                  href={`https://${ip}:8080`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-300 hover:underline"
                >
                  Acessar HUAWEI via HTTPS porta 8080
                </a>
                <a
                  href={`https://${ip}:9090`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 dark:text-blue-300 hover:underline"
                >
                  Acessar HUAWEI via HTTPS porta 9090
                </a>
              </>
            ) : (
              <>
                <a
                  href={`http://${ip}:8080`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-700 dark:text-green-300 hover:underline"
                >
                  Acessar TP-Link Porta: 8080
                </a>
                <a
                  href={`http://${ip}:9090`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-green-700 dark:text-green-300 hover:underline"
                >
                  Acessar TP-Link Porta: 9090
                </a>
              </>
            )}
          </div>
        )}
      </div>
    )}
  </>
)}

          </div>
          
            </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="mt-12 text-center border-t pt-6 text-sm text-gray-600 dark:text-gray-400">
        Desenvolvido com 💙 pelo <strong>Centro de Operações CO N1</strong> — Time unido, rede forte!
      </footer>
    </div>
  );
};

export default Index;
