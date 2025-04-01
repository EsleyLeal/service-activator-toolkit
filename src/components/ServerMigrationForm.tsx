
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ServiceActivationFormData } from '@/types';

interface ServerMigrationFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ServerMigrationForm: React.FC<ServerMigrationFormProps> = ({
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
          <Label htmlFor="location">Localidade</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            placeholder="Localidade do servidor"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="olt">OLT Atual</Label>
          <Input
            id="olt"
            name="olt"
            value={formData.olt}
            onChange={handleInputChange}
            placeholder="OLT atual"
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
      </div>

      <div className="space-y-2">
        <Label htmlFor="streetAddress">Detalhes da Migração</Label>
        <Input
          id="streetAddress"
          name="streetAddress"
          value={formData.streetAddress || ''}
          onChange={handleInputChange}
          placeholder="Detalhes sobre a migração dos servidores"
        />
      </div>
    </div>
  );
};

export default ServerMigrationForm;
