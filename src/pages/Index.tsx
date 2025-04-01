
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
      <ServiceActivationForm />
    </div>
  );
};

export default Index;
