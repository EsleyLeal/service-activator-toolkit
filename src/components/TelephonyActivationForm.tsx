
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ServiceActivationFormData } from '@/types';

interface TelephonyActivationFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleGenerateSipPassword: () => void;
}

const TelephonyActivationForm: React.FC<TelephonyActivationFormProps> = ({
  formData,
  handleInputChange,
  handleGenerateSipPassword
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phoneNumber">Número Atribuído</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber || ''}
            onChange={handleInputChange}
            placeholder="Novo número de telefone"
          />
          <p className="text-xs text-gray-500 mt-1">NOVO</p>
        </div>
        <div>
          <Label htmlFor="sipPassword">Senha SIPULSE</Label>
          <div className="flex gap-2">
            <Input
              id="sipPassword"
              name="sipPassword"
              value={formData.sipPassword || ''}
              onChange={handleInputChange}
              placeholder="Gerada automaticamente"
              readOnly
            />
            <Button type="button" variant="outline" onClick={handleGenerateSipPassword}>
              Gerar
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="sipServer">SIPSERVER</Label>
        <Input
          id="sipServer"
          name="sipServer"
          value={formData.phoneNumber ? `sip:${formData.phoneNumber}@172.31.2.18` : ''}
          placeholder="Gerado automaticamente"
          readOnly
        />
        <p className="text-xs text-gray-500 mt-1">
          Formato: sip:número@172.31.2.18
        </p>
      </div>
    </div>
  );
};

export default TelephonyActivationForm;
