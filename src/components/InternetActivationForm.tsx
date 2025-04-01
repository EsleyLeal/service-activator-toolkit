
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

interface InternetActivationFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
  topologyOptions: TopologyOption[];
  handleGenerateWifiPassword: () => void;
}

const InternetActivationForm: React.FC<InternetActivationFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  oltOptions,
  topologyOptions,
  handleGenerateWifiPassword
}) => {
  const getSignalClass = () => {
    const signal = parseFloat(formData.signalStrength);
    if (!formData.signalStrength || isNaN(signal)) {
      return "";
    }
    
    // For signals between -15 and 27, return "good" (green), otherwise "bad" (red)
    return (signal >= -15 && signal <= 27) ? "signal-good" : "signal-bad";
  };

  const generateWifiNames = () => {
    if (!formData.code) return null;
    
    const clientCode = formData.code.split('-')[0] || formData.code;
    
    return (
      <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-gray-100 rounded-md">
        <div>
          <Label>Rede 2.4GHz</Label>
          <div className="font-medium">TELY_{clientCode}_2G</div>
        </div>
        <div>
          <Label>Rede 5GHz</Label>
          <div className="font-medium">TELY_{clientCode}_5G</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Cliente</Label>
          <Input
            id="client"
            name="client"
            placeholder="Ex: 92633-LEONARDO ALVES DO NASCIMENTO"
            value={formData.client}
            onChange={handleInputChange}
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="code">Código</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="Ex: 92516"
          />
        </div>
        <div>
          <Label htmlFor="fhtt">FHTT</Label>
          <Input
            id="fhtt"
            name="fhtt"
            value={formData.fhtt}
            onChange={handleInputChange}
            placeholder="Número FHTT"
          />
        </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        {formData.topology === 'SWITCH' && (
          <div>
            <Label htmlFor="switchModel">Modelo do Switch</Label>
            <Input
              id="switchModel"
              name="switchModel"
              value={formData.switchModel || ''}
              onChange={handleInputChange}
              placeholder="Modelo do Switch"
            />
          </div>
        )}
        
        {formData.topology === 'ONT' && (
          <div>
            <Label htmlFor="ontModel">Modelo da ONT</Label>
            <Input
              id="ontModel"
              name="ontModel"
              value={formData.ontModel || ''}
              onChange={handleInputChange}
              placeholder="Modelo da ONT"
            />
          </div>
        )}
      </div>

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
              <Button type="button" variant="outline" onClick={handleGenerateWifiPassword}>
                Gerar
              </Button>
            </div>
          </div>
          <div>
            {generateWifiNames()}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cto">CTO</Label>
          <Input
            id="cto"
            name="cto"
            value={formData.cto}
            onChange={handleInputChange}
            placeholder="Número da CTO"
          />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pppoe">PPPoE</Label>
          <Input
            id="pppoe"
            name="pppoe"
            value={formData.pppoe}
            onChange={handleInputChange}
            placeholder="Gerado automaticamente"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            Gerado a partir do nome do cliente e patrimônio
          </p>
        </div>
        <div>
          <Label htmlFor="signalStrength">
            Sinal da ONU <span className="text-xs text-gray-500">(Entre -15 e 27 é bom)</span>
          </Label>
          <Input
            id="signalStrength"
            name="signalStrength"
            value={formData.signalStrength}
            onChange={handleInputChange}
            placeholder="Ex: -10"
            className={getSignalClass()}
          />
        </div>
      </div>
    </div>
  );
};

export default InternetActivationForm;
