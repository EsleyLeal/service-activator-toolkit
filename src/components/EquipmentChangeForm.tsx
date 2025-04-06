import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ServiceActivationFormData, OLTOption, TopologyOption } from '@/types';

interface EquipmentChangeFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  topologyOptions: TopologyOption[];
  oltOptions: OLTOption[];
  handleGenerateWifiPassword?: () => void;
}

const EquipmentChangeForm: React.FC<EquipmentChangeFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  topologyOptions,
  oltOptions,
  handleGenerateWifiPassword
}) => {
  // Função para copiar texto para a área de transferência
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(err => {
      console.error("Erro ao copiar texto: ", err);
    });
  };

  // Extração simplificada do clientCode
  const clientCode = formData.code.split('-')[0] || formData.code;

  return (
    <div className="space-y-4">
      {/* Linha de Cliente e Técnico */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Cliente</Label>
          <Input
            id="client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Nome do cliente"
          />
        </div>
        <div>
          <Label htmlFor="technician">Técnico</Label>
          <Input
            id="technician"
            name="technician"
            value={formData.technician}
            onChange={handleInputChange}
            placeholder="Nome do técnico"
          />
        </div>
      </div>

      {/* Seleção do tipo de alteração */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="changeType">MUDAR EQUIPAMENTO</Label>
          <Select 
            value={formData.changeType} 
            onValueChange={(value) => handleSelectChange('changeType', value)}
          >
            <SelectTrigger id="changeType">
              <SelectValue placeholder="Selecione o tipo de equipamento" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fhtt">TROCA DE ONU</SelectItem>
              <SelectItem value="fhtt-patrimony">TROCAR TUDO</SelectItem>
              <SelectItem value="patrimony">TROCAR ROTEADOR</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Campos para Código e FHTT */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  <div>
    <Label htmlFor="code">Código do Cliente</Label>
    <Input
      id="code"
      name="code"
      value={formData.code}
      onChange={handleInputChange}
      placeholder="Ex: 92516"
    />
  </div>

  {/* Campo FHTT Antigo aparece somente quando a mudança envolve FHTT */}
  {(formData.changeType === 'fhtt' || formData.changeType === 'fhtt-patrimony') && (
    <div>
      <Label htmlFor="fhtt">FHTT Antigo</Label>
      <Input
        id="fhtt"
        name="fhtt"
        value={formData.fhtt}
        onChange={handleInputChange}
        placeholder="FHTT antigo"
      />
    </div>
  )}

  {/* Campo FHTT Novo aparece somente quando a mudança envolve FHTT */}
  {(formData.changeType === 'fhtt' || formData.changeType === 'fhtt-patrimony') && (
    <div>
      <Label htmlFor="fhttNew">FHTT Novo</Label>
      <Input
        id="fhttNew"
        name="fhttNew"
        value={formData.fhttNew || ''}
        onChange={handleInputChange}
        placeholder="FHTT novo"
      />
    </div>
  )}
</div>


      {/* Campos para Patrimônio (condicional), Topologia e OLT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(formData.changeType === 'fhtt-patrimony' || formData.changeType === 'patrimony') && (
          <div>
            <Label htmlFor="patrimony">Patrimônio</Label>
            <Input
              id="patrimony"
              name="patrimony"
              value={formData.patrimony}
              onChange={handleInputChange}
              placeholder="Ex: 102022"
            />
          </div>
        )}
        <div>
          <Label htmlFor="topology">Topologia</Label>
          <Select 
            value={formData.topology} 
            onValueChange={(value) => handleSelectChange('topology', value)}
          >
            <SelectTrigger id="topology">
              <SelectValue placeholder="Selecione a topologia" />
            </SelectTrigger>
            <SelectContent>
              {topologyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="olt">OLT</Label>
          <Select 
            value={formData.olt} 
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

      {/* Se a topologia for ONT, renderiza campos extras */}
      {formData.topology === 'ONT' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wifiPassword">Senha do WiFi</Label>
            <div className="flex gap-2">
              <Input
                id="wifiPassword"
                name="wifiPassword"
                value={formData.wifiPassword || ''}
                onChange={handleInputChange}
                placeholder="Senha do WiFi"
              />
              {handleGenerateWifiPassword && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleGenerateWifiPassword}
                >
                  Gerar
                </Button>
              )}
            </div>
          </div>
          {formData.code && (
            <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-gray-700 rounded-md">
              <div>
                <Label>Rede 2.4GHz</Label>
                <div
                  className="font-medium cursor-pointer text-blue-400"
                  onClick={() => copyToClipboard(`TELY_${clientCode}_2G`)}
                >
                  TELY_{clientCode}_2G
                </div>
              </div>
              <div>
                <Label>Rede 5GHz</Label>
                <div
                  className="font-medium cursor-pointer text-blue-400"
                  onClick={() => copyToClipboard(`TELY_${clientCode}_5G`)}
                >
                  TELY_{clientCode}_5G
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EquipmentChangeForm;
