
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceActivationFormData } from '@/types';

interface OwnershipChangeFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const OwnershipChangeForm: React.FC<OwnershipChangeFormProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Antigo Titular</Label>
          <Input
            id="client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Antigo Titular"
          />
        </div>
        <div>
          <Label htmlFor="pppoeOwner">PPPoE</Label>
          <Input
            id="pppoeOwner"
            name="pppoeOwner"
            value={formData.pppoeOwner}
            onChange={handleInputChange}
            placeholder="pppoe"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="called">Chamado</Label>
          <Input
            id="called"
            name="called"
            value={formData.called}
            onChange={handleInputChange}
            placeholder="Codigo do Chamado"
          />
        </div>
        <div>
          <Label htmlFor="openBy">Aberto Por</Label>
          <Input
            id="openBy"
            name="openBy"
            value={formData.openBy}
            onChange={handleInputChange}
            placeholder="chamado aberto por quem ?"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="newHolder">Novo Titular</Label>
          <Input
            id="newHolder"
            name="newHolder"
            value={formData.newHolder || ''}
            onChange={handleInputChange}
            placeholder="Nome do novo titular"
          />
        </div>
        <div>
          <Label htmlFor="identity">CPF | CNPJ</Label>
          <Input
            id="identity"
            name="identity"
            value={formData.identity || ''}
            onChange={handleInputChange}
            placeholder="CPF ou CNPJ do novo titular"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fhtt">FHTT</Label>
          <Input
            id="fhtt"
            name="fhtt"
            value={formData.fhtt}
            onChange={handleInputChange}
            placeholder="FHTT"
          />
        </div>
        
      </div>
    </div>
  );
};

export default OwnershipChangeForm;
