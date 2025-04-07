import React, { useState, useEffect } from 'react';
import ServiceActivationForm from '@/components/ServiceActivationForm';
import slogans from '@/data/slogans';
import { MacLookup } from '@/components/MacLookup';

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('theme');
      return savedMode ? savedMode === 'dark' : false;
    }
    return false;
  });

  const [slogan, setSlogan] = useState<string>('Toolkit de Ativação de Serviços');

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

    updateSlogan();
    const interval = setInterval(updateSlogan, 180000);
    return () => clearInterval(interval);
  }, []);

  const copiarMensagem = (tipo: 'compatível' | 'incompatível') => {
    let mensagem = '';

    if (tipo === 'compatível') {
      mensagem = "Equipamento compatível com o plano, não necessário a troca.";
    } else if (tipo === 'incompatível') {
      mensagem = "Equipamento não compatível com o plano, favor mandar um técnico ao local para realizar a troca do equipamento.";
    }

    navigator.clipboard.writeText(mensagem).then(() => {
      console.log('Mensagem copiada com sucesso!');
    }).catch(err => {
      console.error('Erro ao copiar mensagem:', err);
    });
  };

  return (
    <div className={`min-h-screen py-8 px-4 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="mb-8 text-center">
        <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
          {slogan}
        </h1>
        <p className={`text-gray-600 mt-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Gerenciamento de ativações, mudanças e verificações da rede
        </p>
      </div>

      <style>{`
        .signal-good { color: green; font-weight: bold; }
        .signal-bad { color: red; font-weight: bold; }
        .fiber-color { width: 20px; height: 20px; border-radius: 50%; display: inline-block; margin-right: 8px; }
        .fiber-row-fusion { display: flex; align-items: center; margin-bottom: 8px; }
        .blue-fiber { background-color: #0066cc; }
        .orange-fiber { background-color: #ff9900; }
        .green-fiber { background-color: #00cc66; }
        .brown-fiber { background-color: #8B4513; }
        .gray-fiber { background-color: #999999; }
        .white-fiber { background-color: #ffffff; border: 1px solid #dddddd; }
        .red-fiber { background-color: #ff3300; }
        .black-fiber { background-color: #000000; }
        .yellow-fiber { background-color: #ffff00; }
        .violet-fiber { background-color: #9900cc; }
        .pink-fiber { background-color: #ff66cc; }
        .aqua-fiber { background-color: #00ffff; }
      `}</style>

      <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-start">
        <div className="w-full md:w-[380px]">
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
          <button
            className="mt-8 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setIsDarkMode(prev => !prev)}
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="md:flex-1 w-full max-w-[800px]">
          <ServiceActivationForm />
        </div>

        {/* Suporte Avançado */}
<div className="text-center mt-8 p-4 border rounded-lg bg-white shadow dark:bg-gray-800 dark:border-gray-700">
  <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">
    Suporte Avançado
  </h2>

  <MacLookup />

  {/* Título Upgrade/Downgrade */}
  <div className="mt-6">
    <h3 className="text-md font-medium text-gray-800 dark:text-gray-100 mb-2">
      Upgrade / Downgrade
    </h3>
    <br />

    {/* Botões centralizados */}
    <div className="flex justify-center gap-4">
      <button
        onClick={() => copiarMensagem('compatível')}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
      >
        Compatível
      </button>
      <button
        onClick={() => copiarMensagem('incompatível')}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Incompatível
      </button>
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
