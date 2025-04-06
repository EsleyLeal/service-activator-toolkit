import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ServiceActivationFormData } from '@/types';

interface AddressChangeFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressChangeForm: React.FC<AddressChangeFormProps> = ({
  formData,
  handleInputChange
}) => {
  const [isPatrimonyVisible, setIsPatrimonyVisible] = useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setIsPatrimonyVisible(checked);
  };

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

      <div className="flex items-center space-x-2">
        <Switch
          checked={isPatrimonyVisible}
          onCheckedChange={handleSwitchChange}
          id="equipChange"
        />
        <Label htmlFor="equipChange">ROTEADOR</Label>
      </div>

      {isPatrimonyVisible && (
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
        <Label htmlFor="olt">OLT</Label>
        <Input
          id="olt"
          name="olt"
          value={formData.olt}
          onChange={handleInputChange}
          placeholder="Selecione a OLT"
        />
      </div>

      <div>
        <Label htmlFor="cto">CTO</Label>
        <Input
          id="cto"
          name="cto"
          value={formData.cto}
          onChange={handleInputChange}
          placeholder="Identificação da CTO"
        />
      </div>
    </div>
  );
};

export default AddressChangeForm;
