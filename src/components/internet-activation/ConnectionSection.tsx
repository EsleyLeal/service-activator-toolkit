
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
import { OLTOption } from '@/types';

interface ConnectionSectionProps {
  cto: string;
  olt: string;
  pppoe: string;
  signalStrength: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
}

const ConnectionSection: React.FC<ConnectionSectionProps> = ({
  cto,
  olt,
  pppoe,
  signalStrength,
  handleInputChange,
  handleSelectChange,
  oltOptions
}) => {
  const getSignalClass = () => {
    const signal = parseFloat(signalStrength);
    if (!signalStrength || isNaN(signal)) {
      return "";
    }
    
    // For signals between -15 and 27, return "good" (green), otherwise "bad" (red)
    return (signal >= -15 && signal <= 27) ? "signal-good" : "signal-bad";
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cto">CTO</Label>
          <Input
            id="cto"
            name="cto"
            value={cto}
            onChange={handleInputChange}
            placeholder="Número da CTO"
          />
        </div>
        <div>
          <Label htmlFor="olt">OLT</Label>
          <Select 
            value={olt} 
            onValueChange={(value) => handleSelectChange('olt', value)}
          >
            <SelectTrigger id="olt">
              <SelectValue placeholder="Selecione a OLT" />
            </SelectTrigger>
            <SelectContent>
              {oltOptions.map((option) => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name} {option.vendor && `- ${option.vendor}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="pppoe">PPPoE</Label>
          <Input
            id="pppoe"
            name="pppoe"
            value={pppoe}
            onChange={handleInputChange}
            placeholder="Gerado automaticamente"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">
            Gerado a partir do nome do cliente e patrimônio
          </p>
        </div>
        <div>
          <Label htmlFor="signalStrength">
            Sinal da ONU <span className="text-xs text-gray-500">(Entre -15 e 27 é bom)</span>
          </Label>
          <Input
            id="signalStrength"
            name="signalStrength"
            value={signalStrength}
            onChange={handleInputChange}
            placeholder="Ex: -10"
            className={getSignalClass()}
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectionSection;
