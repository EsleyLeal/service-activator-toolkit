
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ServiceActivationFormData, OLTOption } from '@/types';


interface CTOVerificationFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
  onFusionChange: (fusions: string[]) => void;
  onPonSlotsChange: (slots: { [key: string]: string }) => void;
  onPonOutsideChange: (outside: string[]) => void;
}

const FIBER_COLORS = [
  { name: 'Azul', class: 'blue-fiber' },
  { name: 'Laranja', class: 'orange-fiber' },
  { name: 'Verde', class: 'green-fiber' },
  { name: 'Marrom', class: 'brown-fiber' },
  { name: 'Cinza', class: 'gray-fiber' },
  { name: 'Branco', class: 'white-fiber' },
  { name: 'Vermelho', class: 'red-fiber' },
  { name: 'Preto', class: 'black-fiber' },
  { name: 'Amarelo', class: 'yellow-fiber' },
  { name: 'Violeta', class: 'violet-fiber' },
  { name: 'Rosa', class: 'pink-fiber' },
  { name: 'Aqua', class: 'aqua-fiber' }
];



const CTOVerificationForm: React.FC<CTOVerificationFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  oltOptions,
  onFusionChange,
  onPonSlotsChange,
  onPonOutsideChange
}) => {
  const [selectedFibers, setSelectedFibers] = useState<string[]>([]);
  const [ponSlots, setPonSlots] = useState<{ [key: string]: string }>({});
  const [ponOutside, setPonOutside] = useState<string[]>([]);
  const [portCount, setPortCount] = useState<"8" | "16">("8");

  const handleFiberSelection = (color: string) => {
    setSelectedFibers(prev => {
      const newSelection = prev.includes(color) 
        ? prev.filter(c => c !== color) 
        : [...prev, color];
      
      onFusionChange(newSelection);
      return newSelection;
    });
  };

  const handlePonSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const slotNumber = name.replace('pon-slot-', '');
    
    setPonSlots(prev => {
      const newSlots = { ...prev, [slotNumber]: value };
      onPonSlotsChange(newSlots);
      return newSlots;
    });
  };

  const handlePonOutsideChange = (slotNumber: string, checked: boolean) => {
    setPonOutside(prev => {
      const newOutside = checked 
        ? [...prev, slotNumber]
        : prev.filter(s => s !== slotNumber);
      
      onPonOutsideChange(newOutside);
      return newOutside;
    });
  };

  const handlePortCountChange = (value: "8" | "16") => {
    setPortCount(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div>
          <Label htmlFor="olt">OLT</Label>
          <Select 
            value={formData.olt} 
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
          <Label htmlFor="cto">CTO</Label>
          <Input
            id="cto"
            name="cto"
            value={formData.cto}
            onChange={handleInputChange}
            placeholder="Número da CTO"
          />
        </div>
        <div>
          <Label htmlFor="streetAddress">Rua</Label>
          <Input
            id="streetAddress"
            name="streetAddress"
            value={formData.streetAddress || ''}
            onChange={handleInputChange}
            placeholder="Endereço da CTO"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="referencePoint">Ponto de Referência</Label>
          <Input
            id="referencePoint"
            name="referencePoint"
            value={formData.referencePoint || ''}
            onChange={handleInputChange}
            placeholder="Ponto de referência próximo"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="slot">SLOT</Label>
            <Input
              id="slot"
              name="slot"
              value={formData.slot || ''}
              onChange={handleInputChange}
              placeholder="Número do slot"
            />
          </div>
          <div>
            <Label htmlFor="pon">PON</Label>
            <Input
              id="pon"
              name="pon"
              value={formData.pon || ''}
              onChange={handleInputChange}
              placeholder="Número PON"
            />
          </div>
        </div>
      </div>

      <Tabs defaultValue="slots" className="w-full mt-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="slots">PON Slots</TabsTrigger>
          <TabsTrigger value="fusion">Fusão de Fibras</TabsTrigger>
        </TabsList>
        
        <TabsContent value="slots" className="space-y-4 p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-2">Preenchimento de PON</h3>
          
          <div className="mb-4">
            <Label className="mb-2 block">Quantidade de Portas</Label>
            <RadioGroup 
              value={portCount} 
              onValueChange={(v) => handlePortCountChange(v as "8" | "16")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="8" id="port-8" />
                <Label htmlFor="port-8">8 Portas</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="16" id="port-16" />
                <Label htmlFor="port-16">16 Portas</Label>
              </div>
            </RadioGroup>
          </div>
          
          {Array.from({ length: parseInt(portCount) }, (_, i) => i + 1).map(num => (
            <div key={`slot-${num}`} className="flex items-center gap-4 mb-2">
              <div className="w-6">{num} -</div>
              <Input
                id={`pon-slot-${num}`}
                name={`pon-slot-${num}`}
                value={ponSlots[num.toString()] || ''}
                onChange={handlePonSlotChange}
                placeholder={`Cliente na porta ${num}`}
                className="flex-1"
              />
              <div className="flex items-center gap-2">
                <Checkbox 
                  id={`outside-${num}`}
                  checked={ponOutside.includes(num.toString())}
                  onCheckedChange={(checked) => 
                    handlePonOutsideChange(num.toString(), checked as boolean)
                  }
                />
                <Label htmlFor={`outside-${num}`} className="text-sm">
                  Fora na PON
                </Label>
              </div>
            </div>
          ))}
        </TabsContent>
        
        <TabsContent value="fusion" className="p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-2">Fusão de Fibras</h3>
          <p className="text-sm text-gray-500 mb-4">
            Selecione as cores das fibras utilizadas na fusão
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {FIBER_COLORS.map(color => (
              <div 
                key={color.name}
                className="fiber-row-fusion"
              >
                <Checkbox 
                  id={`fiber-${color.name}`}
                  checked={selectedFibers.includes(color.name)}
                  onCheckedChange={() => handleFiberSelection(color.name)}
                />
                <div className={`fiber-color ${color.class}`}></div>
                <Label htmlFor={`fiber-${color.name}`} className="ml-2 text-sm">
                  {color.name}
                </Label>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CTOVerificationForm;
