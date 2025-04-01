
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceActivationFormData } from '@/types';
import { ArrowUp, Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface ServiceActivationResultProps {
  formData: ServiceActivationFormData;
  resetForm: () => void;
}

const ServiceActivationResult: React.FC<ServiceActivationResultProps> = ({
  formData,
  resetForm
}) => {
  const { toast } = useToast();

  const getSignalClass = () => {
    const signal = parseFloat(formData.signalStrength);
    if (!formData.signalStrength || isNaN(signal)) {
      return "";
    }
    return (signal >= -15 && signal <= 27) ? "signal-good" : "signal-bad";
  };

  const copyToClipboard = () => {
    const resultDiv = document.getElementById('result-content');
    if (resultDiv) {
      const textToCopy = resultDiv.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast({
          title: "Copiado!",
          description: "Informações copiadas para a área de transferência.",
        });
      });
    }
  };

  const renderInternetActivation = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">ATIVAÇÃO INTERNET REALIZADA COM SUCESSO</p>
      <p>CLIENTE - {formData.client}</p>
      <p>TECNICO - {formData.technician}</p>
      <p>CÓDIGO - {formData.code}</p>
      <p>FHTT - {formData.fhtt}</p>
      <p>PATRIMONIO - {formData.patrimony}</p>
      <p>TOPOLOGIA - {formData.topology}</p>
      {formData.topology === 'SWITCH' && <p>MODELO SWITCH - {formData.switchModel}</p>}
      {formData.topology === 'ONT' && (
        <>
          <p>MODELO ONT - {formData.ontModel}</p>
          <p>SENHA WIFI - {formData.wifiPassword}</p>
          <p>REDE 2.4GHz - TELY_{formData.code.split('-')[0] || formData.code}_2G</p>
          <p>REDE 5GHz - TELY_{formData.code.split('-')[0] || formData.code}_5G</p>
        </>
      )}
      <p>CTO - {formData.cto}</p>
      <p>OLT - {formData.olt}</p>
      <p>PPPOE - {formData.pppoe}</p>
      <p>SINAL ONU - <span className={getSignalClass()}>{formData.signalStrength}</span></p>
    </div>
  );

  const renderDatacom = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">DATACOM</p>
      <p>Nome Cliente - {formData.client}</p>
      <p>SN: {formData.snNumber}</p>
      <p>DataCom UserName: {formData.datacomUsername}</p>
      <p>Senha: {formData.datacomPassword}</p>
      <p>Patrimonio: {formData.patrimony}</p>
      <p>PPPOE - {formData.pppoe}</p>
      <p>Local - {formData.location}</p>
      <p>Fibra - {formData.fiber}</p>
      <p>IP DE GERENCIA - {formData.managementIP}</p>
      <p>SENHA WIFI - {formData.wifiPassword}</p>
    </div>
  );

  const renderTelephony = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">ATIVAÇÃO DE TELEFONIA</p>
      <p>NUMERO ATRIBUIDO - {formData.phoneNumber} NOVO</p>
      <p>SENHA SIPULSE - {formData.sipPassword}</p>
      <p>SIPSERVER - {formData.sipServer}</p>
    </div>
  );

  const renderCTOVerification = () => {
    const ponSlots = formData.ponSlots || {};
    const ponNumbers = Object.keys(ponSlots).sort((a, b) => parseInt(a) - parseInt(b));
    
    return (
      <div id="result-content" className="whitespace-pre-line text-left">
        <p className="font-bold text-center mb-4">VERIFICAÇÃO CTO</p>
        <p>TECNICO - {formData.technician}</p>
        <p>OLT - {formData.olt}</p>
        <p>CTO - {formData.cto}</p>
        <p>RUA - {formData.streetAddress}</p>
        <p>PONTO DE REFERENCIA - {formData.referencePoint}</p>
        <p>SLOT - {formData.slot} PON - {formData.pon}</p>
        
        {ponNumbers.map(num => (
          <p key={`result-pon-${num}`}>
            {num} - {ponSlots[num]}
            {formData.ponOutside?.includes(num) && " (FORA NA PON)"}
          </p>
        ))}
        
        {formData.ponOutside && formData.ponOutside.length > 0 && (
          <p className="mt-2 font-semibold">FORA NA PON</p>
        )}
        
        {formData.fiberFusion && formData.fiberFusion.length > 0 && (
          <div className="mt-4">
            <p className="font-semibold mb-2">FUSÃO DE FIBRAS:</p>
            <div className="flex flex-wrap gap-2">
              {formData.fiberFusion.map(color => {
                const fiberClass = FIBER_COLORS.find(f => f.name === color)?.class || '';
                return (
                  <div key={`fiber-${color}`} className="fiber-row-fusion">
                    <div className={`fiber-color ${fiberClass}`}></div>
                    <span>{color}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderEquipmentChange = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">MUDANÇA DE EQUIPAMENTO</p>
      <p>CLIENTE - {formData.client}</p>
      <p>TECNICO - {formData.technician}</p>
      <p>CÓDIGO - {formData.code}</p>
      <p>FHTT ANTIGO - {formData.fhtt}</p>
      <p>FHTT NOVO - {formData.fhttNew}</p>
      <p>PATRIMONIO - {formData.patrimony}</p>
      <p>TOPOLOGIA - {formData.topology}</p>
      <p>LOCALIDADE - {formData.location}</p>
      <p>PPOE - {formData.pppoe}</p>
    </div>
  );

  const FIBER_COLORS = [
    { name: 'Azul', class: 'blue-fiber' },
    { name: 'Laranja', class: 'orange-fiber' },
    { name: 'Verde', class: 'green-fiber' },
    { name: 'Marrom', class: 'brown-fiber' },
    { name: 'Cinza', class: 'gray-fiber' },
    { name: 'Branco', class: 'white-fiber' },
    { name: 'Vermelho', class: 'red-fiber' },
    { name: 'Preto', class: 'black-fiber' },
    { name: 'Amarelo', class: 'yellow-fiber' },
    { name: 'Violeta', class: 'violet-fiber' },
    { name: 'Rosa', class: 'pink-fiber' },
    { name: 'Aqua', class: 'aqua-fiber' }
  ];

  const renderResult = () => {
    switch (formData.serviceType) {
      case 'internet-activation':
        return renderInternetActivation();
      case 'datacom':
        return renderDatacom();
      case 'telephony-activation':
        return renderTelephony();
      case 'cto-verification':
        return renderCTOVerification();
      case 'equipment-change':
        return renderEquipmentChange();
      // Add other cases here based on service type
      default:
        return (
          <div>
            <p>Serviço não reconhecido ou ainda não implementado.</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="bg-green-600 text-white">
        <CardTitle className="text-center text-2xl flex items-center justify-center gap-2">
          <Check size={24} />
          Resultado
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          {renderResult()}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={resetForm}
            className="flex items-center gap-2"
          >
            <ArrowUp size={16} />
            Voltar
          </Button>
          
          <Button 
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copiar para Área de Transferência
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceActivationResult;
