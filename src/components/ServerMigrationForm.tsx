
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceActivationFormData } from '@/types';

interface ServerMigrationFormProps {
  client:string;
  technician: string;
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServerMigrationForm: React.FC<ServerMigrationFormProps> = ({
  formData,
  client,
  technician,
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
            value={client}
            onChange={handleInputChange}
            placeholder="Nome do cliente"
          />
        </div>
        <div>
          <Label htmlFor="technician">Técnico</Label>
          <Input
            id="technician"
            name="technician"
            value={technician}
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
            placeholder="FHTT ou SN"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="pppoe">PPPOE</Label>
          <Input
            id="pppoe"
            name="pppoe"
            value={formData.pppoe}
            onChange={handleInputChange}
            placeholder="Informação PPPOE"
          />
        </div>

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
      </div>

      
    </div>
  );
};

export default ServerMigrationForm;
