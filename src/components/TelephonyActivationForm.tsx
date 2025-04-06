
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
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
  const [useIndex, setUseIndex] = useState(false);
  const [useIp, setUseIp] = useState(false);
  const [indexValue, setIndexValue] = useState('');

  const generateRandomIndex = () => {
    const min = 100;
    const max = 1000;
    const randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;
    const indexStr = randomIndex.toString();
  
    // Atualiza o state local
    setIndexValue(indexStr);
  
    // Atualiza o formData do pai
    handleInputChange({
      target: {
        name: 'indexValue',
        value: indexStr
      }
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const getPhoneWithIndex = () => {
    if (!formData.phoneNumber || !useIndex || !indexValue) return formData.phoneNumber || '';
    return `${formData.phoneNumber}`;
  };

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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Switch
            checked={useIndex}
            onCheckedChange={setUseIndex}
            id="use-index"
          />
          <Label htmlFor="use-index">Incluir Índice</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            checked={useIp}
            onCheckedChange={setUseIp}
            id="use-ip"
          />
          <Label htmlFor="use-ip">Incluir IP</Label>
        </div>
      </div>

      {useIndex && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneIndex">Índice (100-1000)</Label>
            <div className="flex gap-2">
            <Input
  id="phoneIndex"
  value={indexValue}
  onChange={(e) => {
    setIndexValue(e.target.value);  // Atualiza state local
    handleInputChange({
      target: {
        name: 'indexValue',
        value: e.target.value
      }
    } as React.ChangeEvent<HTMLInputElement>);
  }}
  placeholder="Ex: 500"
/>
              <Button type="button" variant="outline" onClick={generateRandomIndex}>
                Gerar
              </Button>
            </div>
          </div>
          {/* <div>
            <Label htmlFor="phoneDisplay">Número com Índice</Label>
            <Input
              id="phoneDisplay"
              value={getPhoneWithIndex()}
              readOnly
              placeholder="Número com índice"
            />
          </div> */}
        </div>
      )}

      {useIp && (
        <div>
          <Label htmlFor="sipIp">IP:</Label>
          <Input
            id="sipIp"
            name="sipIp"
            value={formData.sipIp || ''}
            onChange={handleInputChange}
            placeholder="Ex: 172.31.2.18"
          />
        </div>
      )}

      <div>
        <Label htmlFor="sipServer">SIPSERVER</Label>
        <Input
  id="sipServer"
  name="sipServer"
  value={
    formData.phoneNumber 
      ? `sip:${getPhoneWithIndex()}@172.31.2.18`
      : ''
  }
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
