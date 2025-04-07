
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ServiceActivationFormData } from '@/types';

interface DatacomFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleGeneratePassword: () => void;
}

const DatacomForm: React.FC<DatacomFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  handleGeneratePassword
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="client">Nome Cliente</Label>
          <Input
            id="client"
            name="client"
            value={formData.client}
            onChange={handleInputChange}
            placeholder="Nome completo do cliente"
          />
        </div>
        <div>
          <Label htmlFor="snNumber">SN</Label>
          <Input
            id="snNumber"
            name="snNumber"
            value={formData.snNumber || ''}
            onChange={handleInputChange}
            placeholder="Número de série"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="datacomUsername">UserName</Label>
          <Input
            id="datacomUsername"
            name="datacomUsername"
            value={formData.datacomUsername || ''}
            onChange={handleInputChange}
            placeholder="Nome de usuário DataCom"
          />
        </div>
        <div>
          <Label htmlFor="datacomPassword">Password</Label>
          <div className="flex gap-2">
            <Input
              id="datacomPassword"
              name="datacomPassword"
              value={formData.datacomPassword || ''}
              onChange={handleInputChange}
              placeholder="Senha"
            />
            <Button type="button" variant="outline" onClick={handleGeneratePassword}>
              Gerar
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="pppoe">PPPOE</Label>
          <Input
            id="pppoe"
            name="pppoe"
            value={formData.pppoe}
            onChange={handleInputChange}
            placeholder="Informação PPPoE"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="location">Local</Label>
          <Input
            id="location"
            name="location"
            value={formData.location || ''}
            onChange={handleInputChange}
            placeholder="Localização"
          />
        </div>
        <div>
          <Label htmlFor="fiber">Fibra</Label>
          <Input
            id="fiber"
            name="fiber"
            value={formData.fiber || ''}
            onChange={handleInputChange}
            placeholder="Informação da fibra"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="managementIP">IP de Gerência</Label>
          <Input
            id="managementIP"
            name="managementIP"
            value={formData.managementIP || ''}
            onChange={handleInputChange}
            placeholder="IP para gerenciamento"
          />
        </div>
        <div>
          <Label htmlFor="wifiPassword">Senha WiFi</Label>
          <Input
            id="wifiPassword"
            name="wifiPassword"
            value={formData.wifiPassword || ''}
            onChange={handleInputChange}
            placeholder="Senha do WiFi"
          />
        </div>
      </div>
    </div>
  );
};

export default DatacomForm;
