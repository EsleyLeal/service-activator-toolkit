
import React from 'react';
import ServiceActivationForm from '@/components/ServiceActivationForm';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-blue-700">Toolkit de Ativação de Serviços</h1>
        <p className="text-gray-600 mt-2">
          Gerenciamento de ativações, mudanças e verificações da rede
        </p>
      </div>
      <style jsx global>{`
        .signal-good {
          color: green;
          font-weight: bold;
        }
        .signal-bad {
          color: red;
          font-weight: bold;
        }
        .fiber-color {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
        }
        .fiber-row-fusion {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
        }
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
      <ServiceActivationForm />
    </div>
  );
};

export default Index;
