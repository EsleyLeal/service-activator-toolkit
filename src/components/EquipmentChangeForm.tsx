
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
  return (
    <div className="space-y-4">
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
          <Label htmlFor="fhtt">FHTT Antigo</Label>
          <Input
            id="fhtt"
            name="fhtt"
            value={formData.fhtt}
            onChange={handleInputChange}
            placeholder="FHTT antigo"
          />
        </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <Button type="button" variant="outline" onClick={handleGenerateWifiPassword}>
                  Gerar
                </Button>
              )}
            </div>
          </div>
          <div>
            {formData.code && (
              <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-gray-100 rounded-md">
                <div>
                  <Label>Rede 2.4GHz</Label>
                  <div className="font-medium">
                    TELY_{formData.code.split('-')[0] || formData.code}_2G
                  </div>
                </div>
                <div>
                  <Label>Rede 5GHz</Label>
                  <div className="font-medium">
                    TELY_{formData.code.split('-')[0] || formData.code}_5G
                  </div>
                </div>
              </div>
            )}
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
          <Label htmlFor="pppoe">PPPoE</Label>
          <Input
            id="pppoe"
            name="pppoe"
            value={formData.pppoe}
            onChange={handleInputChange}
            placeholder="Gerado automaticamente"
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default EquipmentChangeForm;
