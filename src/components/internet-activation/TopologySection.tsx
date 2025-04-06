
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TopologyOption } from '@/types';

interface TopologySectionProps {
  topology: string;
  switchModel?: string;
  ontModel?: string;
  wifiPassword?: string;
  code: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  topologyOptions: TopologyOption[];
  handleGenerateWifiPassword: () => void;
}

const TopologySection: React.FC<TopologySectionProps> = ({
  topology,
  switchModel,
  ontModel,
  wifiPassword,
  code,
  handleInputChange,
  handleSelectChange,
  topologyOptions,
  handleGenerateWifiPassword
}) => {
  const generateWifiNames = () => {
    if (!code) return null;
  
    const clientCode = code.split('-')[0] || code;
  
    // Função para copiar o texto para a área de transferência
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
      }).catch(err => {
        console.error("Erro ao copiar texto: ", err);
      });
    };
  
    return (
      <div className="grid grid-cols-2 gap-4 mt-2 p-3 bg-gray-700 rounded-md">
        <div>
          <Label>Rede 2.4GHz</Label>
          <div 
            className="font-medium cursor-pointer text-blue-400" 
            onClick={() => copyToClipboard(`TELY_${clientCode}_2G`)}
          >
            TELY_{clientCode}_2G
          </div>
        </div>
        <div>
          <Label>Rede 5GHz</Label>
          <div 
            className="font-medium cursor-pointer text-blue-400" 
            onClick={() => copyToClipboard(`TELY_${clientCode}_5G`)}
          >
            TELY_{clientCode}_5G
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="topology">Topologia</Label>
          <Select 
            value={topology} 
            onValueChange={(value) => handleSelectChange('topology', value)}
          >
            <SelectTrigger id="topology">
              <SelectValue placeholder="Selecione a topologia" />
            </SelectTrigger>
            <SelectContent>
              {topologyOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* {topology === 'SWITCH' && (
          <div>
            <Label htmlFor="switchModel">Modelo do Switch</Label>
            <Input
              id="switchModel"
              name="switchModel"
              value={switchModel || ''}
              onChange={handleInputChange}
              placeholder="Modelo do Switch"
            />
          </div>
        )} */}
        
        {/* {topology === 'ONT' && (
          <div>
            <Label htmlFor="ontModel">Modelo da ONT</Label>
            <Input
              id="ontModel"
              name="ontModel"
              value={ontModel || ''}
              onChange={handleInputChange}
              placeholder="Modelo da ONT"
            />
          </div>
        )} */}
      </div>

      {topology === 'ONT' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="wifiPassword">Senha do WiFi</Label>
            <div className="flex gap-2">
              <Input
                id="wifiPassword"
                name="wifiPassword"
                value={wifiPassword || ''}
                onChange={handleInputChange}
                placeholder="Senha do WiFi"
              />
              <Button type="button" variant="outline" onClick={handleGenerateWifiPassword}>
                Gerar
              </Button>
            </div>
          </div>
          <div>
            {generateWifiNames()}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopologySection;
