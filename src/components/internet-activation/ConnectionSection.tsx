import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OLTOption } from '@/types';
import FormActions from '../service-activation/FormActions';

interface ConnectionSectionProps {
  cto: string;
  olt: string;
  pppoe: string;
  signalStrength: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
  
}

const ConnectionSection: React.FC<ConnectionSectionProps> = ({
  cto,
  olt,
  pppoe,
  signalStrength,
  handleInputChange,
  handleSelectChange,
  oltOptions
}) => {
  const [pppoeDisplay, setPppoeDisplay] = useState(pppoe);  // Estado para controlar o PPPoE exibido

   // Função para limpar o PPPoE
   const clearPppoe = () => {
    setPppoeDisplay(''); // zera o valor exibido
    // também zera no form/estado pai, via handleInputChange
    handleInputChange({ 
      target: { name: 'pppoe', value: '' } 
    } as React.ChangeEvent<HTMLInputElement>);
  };

 // Exemplo de uso dentro do componente
const getSignalClass = () => {
  // 1) Se não tiver nada digitado, não aplica classe
  if (!signalStrength) {
    return "";
  }

  // 2) Usa regex para extrair um número negativo/positivo, com decimais se houver
  const match = signalStrength.match(/-?\d+(\.\d+)?/);
  if (!match) {
    return "";
  }

  // 3) Converte o texto capturado para número
  const value = parseFloat(match[0]);
  if (isNaN(value)) {
    return "";
  }

  // 4) Aplica as faixas definidas:

  //   Valor (dBm)         Qualidade         Exemplo de classe
  //   -------------------------------------------------------
  //   -8 a -20            Excelente a Boa   "signal-excelente"
  //   -20 a -25           Aceitável         "signal-aceitavel"
  //   -25 a -27           Margem Baixa      "signal-margem"
  //   Abaixo de -28       Problemático      "signal-problem"

  // Observando que numericamente:
  //   -8 é maior que -20, que é maior que -25, que é maior que -27, etc.
  // Precisamos comparar de forma coerente.
  //
  // Vamos ler como intervalos:
  //   -8 >= valor >= -20 => Excelente a Boa
  //   -20 > valor >= -25 => Aceitável
  //   -25 > valor >= -27 => Margem Baixa
  //   valor < -28        => Problemático
  //
  // Mas e entre -27 e -28? O enunciado não cobriu. 
  // Aqui, vamos supor que -27.5 também entra em "Margem Baixa".
  // Se quiser ser mais estrito (somente -27 até -25), mude conforme preferir.

  if (value < -28) {
    // Menor que -28
    return "signal-problem"; 
  } else if (value < -25) {
    // -28 <= valor < -25
    return "signal-margem"; 
  } else if (value < -20) {
    // -25 <= valor < -20
    return "signal-aceitavel"; 
  } else if (value <= -8) {
    // -20 <= valor <= -8
    return "signal-excelente"; 
  } else {
    // Se for maior que -8 (por exemplo, -5 ou 0 ou 10),
    // não está no seu quadro. Você pode definir se é "excelente" ou vazio.
    return "signal-excelente"; 
  }
};

  // Função para copiar o texto para a área de transferência
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Texto copiado para a área de transferência');
    }).catch((error) => {
      console.error('Falha ao copiar: ', error);
    });
  };

  // Divide o PPPoE em duas partes
  const pppoeParts = pppoe.split('     ');
const [firstPart = '', secondPart = ''] = pppoeParts;


  // Função para gerar uma letra aleatória
  const generateRandomLetter = () => {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    return randomLetter;
  };

  const addRandomLetterToPppoe = () => {
    // Converte a primeira parte para minúsculo
    const firstName = firstPart.toLowerCase();
    // Gera a letra
    const randomLetter = generateRandomLetter();
    // Monta a parte atualizada
    const updatedFirstName = `${firstName}${randomLetter}`;
  
    // Monta o novo PPPoE com secondPart
    const newPppoe = `${updatedFirstName}     ${secondPart}`;
  
    // Atualiza tanto no estado local quanto via handleInputChange
    setPppoeDisplay(newPppoe);
    handleInputChange({
      target: { name: 'pppoe', value: newPppoe }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cto">CTO</Label>
          <Input
            id="cto"
            name="cto"
            value={cto}
            onChange={handleInputChange}
            placeholder="Identificação da CTO"
          />
        </div>
        <div>
          <Label htmlFor="olt">OLT</Label>
          <Select 
            value={olt} 
            onValueChange={(value) => handleSelectChange('olt', value)}
          >
            <SelectTrigger id="olt">
              <SelectValue placeholder="Selecione a OLT" />
            </SelectTrigger>
            <SelectContent>
              {oltOptions.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name} {option.vendor && `- ${option.vendor}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label htmlFor="pppoe">PPPoE</Label>

    <div className="flex space-x-6">
      {/* Botão que copia a primeira parte do PPPoE */}
      <button
        type="button"
        onClick={() => copyToClipboard(pppoeParts[0])}
        className="text-blue-500"
      >
        {pppoeParts[0] || ''}
      </button>

      {/* Botão que copia a segunda parte do PPPoE */}
      <button
        type="button"
        onClick={() => copyToClipboard(pppoeParts[1])}
        className="text-blue-500"
      >
        {pppoeParts[1] || ''}
      </button>
    </div>

    {/* Campo PPPoE editável */}
    <Input
      className="mt-2"
      id="pppoe"
      name="pppoe"
      value={pppoeDisplay}
      onChange={(e) => setPppoeDisplay(e.target.value)}
      placeholder="Gerado automaticamente"
    />

    {/* Botão para gerar a letra aleatória (só se tiver algo na primeira parte) */}
    <button
      type="button"
      onClick={() => {
        // Só executa se pppoeParts[0] tiver conteúdo
        if (pppoeParts[0]) {
          addRandomLetterToPppoe();
        } else {
          alert('Não há nada na primeira parte do PPPoE para adicionar a letra.');
        }
      }}
      className="text-yellow-500 mt-2 hover:text-yellow-700 focus:outline-none focus:ring-0"
    >
      PPPoE Já Existe? Clique aqui!
    </button>

    {/* Botão para limpar completamente o PPPoE */}
    <button
      type="button"
      onClick={() => {
        setPppoeDisplay('');
        // Também avisa o formulário/estado pai (se for necessário)
        handleInputChange({
          target: { name: 'pppoe', value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }}
      className="text-red-500 ml-4 mt-2 hover:text-red-700 focus:outline-none focus:ring-0"
    >
      Limpar PPPoE
    </button>
  </div>
  <div>
          <Label htmlFor="signalStrength">
            Sinal da ONU <span className="text-xs text-gray-500">(Entre -15 e 26 é bom)</span>
          </Label>
          <Input
            id="signalStrength"
            name="signalStrength"
            value={signalStrength}
            onChange={handleInputChange}
            placeholder="power(dBm)"
            className={getSignalClass()}
            
          />
        </div>
</div>
      
    </div>
  );
};

export default ConnectionSection;
