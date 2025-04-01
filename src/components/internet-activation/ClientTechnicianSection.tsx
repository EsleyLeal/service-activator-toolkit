
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ClientTechnicianSectionProps {
  client: string;
  technician: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientTechnicianSection: React.FC<ClientTechnicianSectionProps> = ({
  client,
  technician,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="client">Cliente</Label>
        <Input
          id="client"
          name="client"
          placeholder="Ex: 92633-LEONARDO ALVES DO NASCIMENTO"
          value={client}
          onChange={handleInputChange}
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
  );
};

export default ClientTechnicianSection;
