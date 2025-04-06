
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface IdentificationSectionProps {
  code: string;
  fhtt: string;
  patrimony: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IdentificationSection: React.FC<IdentificationSectionProps> = ({
  code,
  fhtt,
  patrimony,
  handleInputChange
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <Label htmlFor="code">Código do Cliente</Label>
        <Input
          id="code"
          name="code"
          value={code}
          onChange={handleInputChange}
          placeholder="Ex: 92516"
        />
      </div>
      <div>
        <Label htmlFor="fhtt">FHTT</Label>
        <Input
          id="fhtt"
          name="fhtt"
          value={fhtt}
          onChange={handleInputChange}
          placeholder="FHTT ou SN"
        />
      </div>
      <div>
        <Label htmlFor="patrimony">Patrimônio</Label>
        <Input
          id="patrimony"
          name="patrimony"
          value={patrimony}
          onChange={handleInputChange}
          placeholder="Ex: 102022"
        />
      </div>
    </div>
  );
};

export default IdentificationSection;
