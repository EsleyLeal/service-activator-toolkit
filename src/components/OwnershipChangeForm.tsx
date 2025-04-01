
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
          <Label htmlFor="client">Cliente Atual</Label>
          <Input
            id="client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Nome do cliente atual"
          />
        </div>
        <div>
          <Label htmlFor="referencePoint">Novo Titular</Label>
          <Input
            id="referencePoint"
            name="referencePoint"
            value={formData.referencePoint || ''}
            onChange={handleInputChange}
            placeholder="Nome do novo titular"
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
          <Label htmlFor="streetAddress">Documento Anterior</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress || ''}
            onChange={handleInputChange}
            placeholder="CPF/CNPJ do titular anterior"
          />
        </div>
        <div>
          <Label htmlFor="location">Documento Novo</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            placeholder="CPF/CNPJ do novo titular"
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
            placeholder="Número FHTT"
          />
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
    </div>
  );
};

export default OwnershipChangeForm;
