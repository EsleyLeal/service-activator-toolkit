
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceActivationFormData } from '@/types';

interface AddressChangeFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressChangeForm: React.FC<AddressChangeFormProps> = ({
  formData,
  handleInputChange
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
          <Label htmlFor="fhtt">FHTT</Label>
          <Input
            id="fhtt"
            name="fhtt"
            value={formData.fhtt}
            onChange={handleInputChange}
            placeholder="Número FHTT"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="streetAddress">Endereço Anterior</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress || ''}
            onChange={handleInputChange}
            placeholder="Endereço anterior"
          />
        </div>
        <div>
          <Label htmlFor="referencePoint">Novo Endereço</Label>
          <Input
            id="referencePoint"
            name="referencePoint"
            value={formData.referencePoint || ''}
            onChange={handleInputChange}
            placeholder="Novo endereço"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cto">CTO Atual</Label>
          <Input
            id="cto"
            name="cto"
            value={formData.cto}
            onChange={handleInputChange}
            placeholder="CTO atual"
          />
        </div>
        <div>
          <Label htmlFor="olt">OLT</Label>
          <Input
            id="olt"
            name="olt"
            value={formData.olt}
            onChange={handleInputChange}
            placeholder="OLT"
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

export default AddressChangeForm;
