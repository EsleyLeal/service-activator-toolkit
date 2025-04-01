
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
import { ServiceActivationFormData, TopologyOption } from '@/types';

interface EquipmentChangeFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  topologyOptions: TopologyOption[];
}

const EquipmentChangeForm: React.FC<EquipmentChangeFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  topologyOptions
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
            placeholder="Nome completo do cliente"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="code">Código</Label>
          <Input
            id="code"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="Código do cliente"
          />
        </div>
        <div>
          <Label htmlFor="fhtt">FHTT Antigo</Label>
          <Input
            id="fhtt"
            name="fhtt"
            value={formData.fhtt}
            onChange={handleInputChange}
            placeholder="Número FHTT atual"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fhttNew">FHTT Novo</Label>
          <Input
            id="fhttNew"
            name="fhttNew"
            value={formData.fhttNew || ''}
            onChange={handleInputChange}
            placeholder="Novo número FHTT"
          />
        </div>
        <div>
          <Label htmlFor="patrimony">Patrimônio</Label>
          <Input
            id="patrimony"
            name="patrimony"
            value={formData.patrimony}
            onChange={handleInputChange}
            placeholder="Número do patrimônio"
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
        <div>
          <Label htmlFor="location">Localidade</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            placeholder="Localidade do equipamento"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="pppoe">PPPoE</Label>
        <Input
          id="pppoe"
          name="pppoe"
          value={formData.pppoe}
          onChange={handleInputChange}
          placeholder="Informação PPPoE"
        />
      </div>
    </div>
  );
};

export default EquipmentChangeForm;
