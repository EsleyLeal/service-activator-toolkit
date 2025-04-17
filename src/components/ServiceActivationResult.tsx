
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ServiceActivationFormData } from '@/types';
import { ArrowUp, Check, Copy, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import electron from 'electron/electron';

interface ServiceActivationResultProps {
  formData: ServiceActivationFormData;
  ctoType?: 'conectorizada' | 'fusionada'; 
  resetForm: () => void;
}

const ServiceActivationResult: React.FC<ServiceActivationResultProps> = ({
  formData,
  
  resetForm,
}) => {
  const { toast } = useToast();
  const [sessionContent, setSessionContent] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState(false);

  const getSignalClass = () => {
    const signal = parseFloat(formData.signalStrength);
    if (!formData.signalStrength || isNaN(signal)) {
      return '';
    }
    return signal >= -15 && signal <= 27 ? 'signal-good' : 'signal-bad';
  };

  const copyToClipboard = () => {
    const resultDiv = document.getElementById('result-content');
    if (resultDiv) {
      const textToCopy = resultDiv.innerText;
      navigator.clipboard.writeText(textToCopy).then(() => {
        toast({
          title: 'Copiado!',
          description: 'Informações copiadas para a área de transferência.',
        });
      });
    }
  };

// Função para realizar o download do conteúdo, com base na data
const downloadContent = () => {
  const resultDiv = document.getElementById('result-content'); // Pega o conteúdo da div
  if (resultDiv) {
    const textToDownload = resultDiv.innerText; // Obtém o conteúdo da div como texto

    // Recupera a data atual (no formato YYYY-MM-DD)
    const currentDate = new Date();

    // Formata a data para o formato "DD/MM/YYYY"
    const formattedDate = currentDate.toLocaleDateString('pt-BR'); // "06/04/2025"

    // Recupera o conteúdo salvo do 'localStorage' (se houver)
    const savedContent = localStorage.getItem('savedContent') || '';
    const lastSavedDate = localStorage.getItem('lastSavedDate'); // Data da última vez que o conteúdo foi salvo

    // Se for o mesmo dia, adiciona o novo conteúdo ao conteúdo existente
    let combinedContent = '';
    if (lastSavedDate === formattedDate) {
      combinedContent = `${savedContent}\n=============================\n${textToDownload}`;
    } else {
      // Se for um novo dia, reinicia com a data atual e o conteúdo
      combinedContent = `${formattedDate}\n=============================\n${textToDownload}`;
    }

    // Cria um Blob (objeto que representa os dados) com o conteúdo combinado
    const blob = new Blob([combinedContent], { type: 'text/plain;charset=utf-8' });

    // Cria um link temporário para fazer o download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Cria um URL para o Blob

    // Define o nome do arquivo com "DATA ATUAL: DD/MM/YYYY"
    link.download = `DATA ATUAL: ${formattedDate}.txt`; // Define o nome do arquivo com a data formatada

    // Simula o clique no link para iniciar o download
    link.click();

    // Atualiza o 'localStorage' com o novo conteúdo e a data da última atualização
    localStorage.setItem('savedContent', combinedContent);
    localStorage.setItem('lastSavedDate', formattedDate);
  }
};

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0'); // Pega o dia e adiciona zero à esquerda, se necessário
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Pega o mês (0-11), então somamos 1
  const year = currentDate.getFullYear(); // Pega o ano completo

  // Retorna a data formatada: DD/MM/YYYY
  return `${day}/${month}/${year}`;
};


  const renderInternetActivation = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">ATIVAÇÃO INTERNET REALIZADA COM SUCESSO!</p>
      <p>CLIENTE - {formData.client}</p>
      <p>TECNICO - {formData.technician}</p>
      <p>CÓDIGO - {formData.code}</p>
      <p>FHTT - {formData.fhtt}</p>
      <p>PATRIMONIO - {formData.patrimony}</p>
      <p>TOPOLOGIA - {formData.topology}</p>
      {formData.topology === 'ONT' && (
        <>
          {/* <p>MODELO ONT - {formData.ontModel}</p> */}
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
      <p className="font-bold text-center mb-4">DATACOM REALIZADA COM SUCESSO!</p>
      <p>Nome Cliente - {formData.client}</p>
      <p>SN: {formData.snNumber}</p>
      <p>UserName: {formData.datacomUsername}</p>
      <p>Password: {formData.datacomPassword}</p>
      <p>Patrimonio: {formData.patrimony}</p>
      <p>PPPOE - {formData.pppoe}</p>
      <p>Local - {formData.location}</p>
      <p>Fibra - {formData.fiber}</p>
      <p>IP DE GERENCIA - {formData.managementIP}</p>
      <p>SENHA WIFI - {formData.wifiPassword}</p>
    </div>
  );

  const renderTelephony = () => {
    const phoneNumber = formData.phoneNumber || '';
    const phoneDisplay = document.getElementById('phoneDisplay')?.textContent || phoneNumber;
    const sipIp = formData.sipIp || '172.31.2.18';
    
    return (
      <div id="result-content" className="whitespace-pre-line text-left">
        <p className="font-bold text-center mb-4">ATIVAÇÃO DE TELEFONIA REALIZADA COM SUCESSO!</p>
        <p>NUMERO ATRIBUIDO - {phoneDisplay}</p>
        <p>SENHA SIPULSE - {formData.sipPassword}</p>
        <p>SIPSERVER - sip:{phoneDisplay}@172.31.2.18</p>
        {formData.indexValue && <p>INDEX - {formData.indexValue}</p>}
        {formData.sipIp && <p>IP - {formData.sipIp}</p>}
      </div>
    );
  };

  const renderCTOConectorizada = () => {
    let ponSlots: { [key: string]: string } = {};
  
    try {
      ponSlots = typeof formData.ponSlots === 'string'
        ? JSON.parse(formData.ponSlots)
        : formData.ponSlots || {};
    } catch (e) {
      ponSlots = {};
    }
  
    const totalPorts = parseInt(formData.portCount || "8", 10);
    const ponNumbers = Array.from({ length: totalPorts }, (_, i) => (i + 1).toString());
  
    return (
      <div id="result-content" className="whitespace-pre-line text-left">
        <p className="font-bold text-center mb-4">VERIFICAÇÃO CTO CONECTORIZADA REALIZADA COM SUCESSO!</p>
        <p>TECNICO - {formData.technician}</p>
        <p>OLT - {formData.olt}</p>
        <p>CTO - {formData.cto}</p>
        <p>RUA - {formData.streetAddress}</p>
        <p>PONTO DE REFERENCIA - {formData.referencePoint}</p>
  
        {formData.oltVendor === 'HAWUEI' && (
          <p>FRAME - {formData.frame}</p>
        )}
  
        <p>SLOT - {formData.slot}</p>
        <p>PON - {formData.pon}</p>
        
  
        {ponNumbers.map(num => (
          <p key={num}>{num} - {ponSlots[num] || ''}</p>
        ))}

      <p className='mb-4 mt-6 '>FORA NA PON - <br /><br />{formData.ponOutside}</p>
      </div>
    );
  };
  
  
  
  const renderCTOFusionada = () => {
    return (
      <div id="result-content" className="whitespace-pre-line text-left">
        <p className="font-bold text-center mb-4">VERIFICAÇÃO CTO FUSIONADA REALIZADA COM SUCESSO!</p>
        <p>TECNICO - {formData.technician}</p>
        <p>OLT - {formData.olt}</p>
        <p>CTO - {formData.cto}</p>
        <p>RUA - {formData.streetAddress}</p>
        <p>PONTO DE REFERENCIA - {formData.referencePoint}</p>
        <p>SLOT - {formData.slot} PON - {formData.pon}</p>
  
        <div className="mt-4">
          <p className="font-semibold mb-2">FUSÃO DE FIBRAS:</p>
          <div className="flex flex-wrap gap-2">
            {formData.fiberFusion?.map(color => {
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
      </div>
    );
  };
  
  
  

  const renderEquipmentChange = () => (
  <div id="result-content" className="whitespace-pre-line text-left">
    <p className="font-bold text-center mb-4">MUDANÇA DE EQUIPAMENTO REALIZADA COM SUCESSO!</p>
    <p>CLIENTE - {formData.client}</p>
    <p>TECNICO - {formData.technician}</p>
    <p>CÓDIGO - {formData.code}</p>

    {/* Condicionais para renderizar FHTT e Patrimônio conforme o tipo de mudança */}
    {formData.changeType === 'fhtt' || formData.changeType === 'fhtt-patrimony' ? (
      <>
        <p>FHTT ANTIGO - {formData.fhtt}</p>
        <p>FHTT NOVO - {formData.fhttNew}</p>
      </>
    ) : null}

    {formData.changeType === 'fhtt-patrimony' || formData.changeType === 'patrimony' ? (
      <p>PATRIMONIO - {formData.patrimony}</p>
    ) : null}

    <p>TOPOLOGIA - {formData.topology}</p>
    <p>OLT - {formData.olt}</p>

    {/* Exibição das redes e senha wifi apenas se a topologia for 'ONT' */}
    {formData.topology === 'ONT' && (
      <>
        <p>SENHA WIFI - {formData.wifiPassword}</p>
        <p>REDE 2.4GHz - TELY_{formData.code.split('-')[0] || formData.code}_2G</p>
        <p>REDE 5GHz - TELY_{formData.code.split('-')[0] || formData.code}_5G</p>
      </>
    )}
  </div>
);


  const renderEquipamentMigration = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">MIGRAÇÃO REALIZADA COM SUCESSO!</p>
      <p>CLIENTE - {formData.client}</p>
      <p>TECNICO - {formData.technician}</p>
      <p>CÓDIGO - {formData.code}</p>
      <p>FHTT - {formData.fhtt}</p>
      <p>CTO - {formData.cto}</p>
      <p>OLT - {formData.olt}</p>
    </div>
  );

  const renderOwnershipChange = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">TROCA DE TITULARIDADE REALIZADA COM SUCESSO!</p>
      <p>ANTIGO TITULAR - {formData.client}</p>
      <p>PPPoE - {formData.pppoeOwner}</p>
      <p>CHAMADO - {formData.called}</p>
      <p>ABERTO POR - {formData.openBy}</p>
      <p>NOVO TITULAR - {formData.newHolder}</p>
      <p>CPF | CNPJ - {formData.identity}</p>
      <p>FHTT - {formData.fhtt}</p>
    </div>
  );

  const renderAddressChange = () => (
    <div id="result-content" className="whitespace-pre-line text-left">
      <p className="font-bold text-center mb-4">MUDANÇA DE ENDEREÇO REALIZADA COM SUCESSO!</p>
      <p>CLIENTE - {formData.client}</p>
      <p>TECNICO - {formData.technician}</p>
      <p>FHTT - {formData.fhtt}</p>
      
      {/* Renderização condicional do parágrafo de Patrimônio */}
      {formData.patrimony && formData.patrimony.trim() !== "" && (
        <p>PATRIMÔNIO - {formData.patrimony}</p>
      )}
  
      <p>TOPOLOGIA - {formData.topology}</p>
      <p>OLT - {formData.olt}</p>
      <p>NOVA CTO - {formData.cto}</p>
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
  return formData.ctoType === 'fusionada'
    ? renderCTOFusionada()
    : renderCTOConectorizada();

      case 'equipment-change':
        return renderEquipmentChange();
        case 'server-migration':
          return renderEquipamentMigration();
        case 'ownership-change':
          return renderOwnershipChange();
        case 'address-change':
          return renderAddressChange();
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
        <div className="bg-gray-700 p-4 rounded-md mb-6">
          {renderResult()}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-2"
            title="Ao clicar em 'Nova ativação', você inicia um novo suporte. Garanta que este suporte foi copiado."
          >
            <ArrowUp size={16} />
            Nova ativação
          </Button>
          
          <Button 
            onClick={copyToClipboard}
            className="flex items-center gap-2"
          >
            <Copy size={16} />
            Copiar para Área de Transferência
          </Button>

          {/* <Button onClick={downloadContent} className="flex items-center gap-2">
              <Download size={16} />
              Baixar Resultado
            </Button> */}
        </div>
      </CardContent>

      {/* Modal customizado para confirmação */}
      {showConfirm && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-gray-800 text-white rounded-md p-6 shadow-lg max-w-sm w-full">
      <p className="text-lg mb-4">
        Tem certeza que deseja iniciar uma nova ativação?
      </p>
      <div className="flex justify-end space-x-4">
        <Button 
          onClick={() => setShowConfirm(false)} 
          variant="outline"
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            resetForm();
            setShowConfirm(false);
          }}
        >
          Sim
        </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ServiceActivationResult;
