import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import FormActions from '@/components/service-activation/FormActions';
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
  resetForm: () => void;
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
  onPonOutsideChange,
  resetForm,
}) => {
  const [selectedFibers, setSelectedFibers] = useState<{ color: string, clientName: string }[]>([]);
  const [ponSlots, setPonSlots] = useState<{ [key: string]: string }>({});
  const [ponOutside, setPonOutside] = useState<string[]>([]);
  const [portCount, setPortCount] = useState<"8" | "16">("8");
  const [activeTab, setActiveTab] = useState<'slots' | 'fusion'>('slots');
  const [oltVendor, setOltVendor] = useState<"HAWUEI" | "FIBERHOME" | "">("");
  const [canceledSlots, setCanceledSlots] = useState<string[]>([]);
  const [noCodeSlots, setNoCodeSlots] = useState<string[]>([]);
  const [newFiber, setNewFiber] = useState({ color: '', clientName: '' });

  const resetPorts = () => {
    setPonSlots({});
    setCanceledSlots([]);
    setNoCodeSlots([]);
    // Se precisar resetar outros estados relacionados, inclua aqui
  };

  const handleAddFiber = () => {
    if (newFiber.color && newFiber.clientName) {
      setSelectedFibers([...selectedFibers, newFiber]);
      setNewFiber({ color: '', clientName: '' }); // Reset the input fields
    } else {
      alert("Preencha todos os campos antes de adicionar.");
    }
  };
  

  useEffect(() => {
    if (
      Object.keys(formData.ponSlots).length === 0 &&
      formData.portCount === '' &&
      formData.oltVendor === '' &&
      formData.ctoType === ''
    ) {
      // Quando detectar um reset no formData
      setPonSlots({});
      setCanceledSlots([]);
      setNoCodeSlots([]);
    }
  }, [formData.ponSlots, formData.portCount, formData.oltVendor, formData.ctoType]);

  const handlePonSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const slotNumber = name.replace('pon-slot-', '');
    setPonSlots(prev => {
      const updated = { ...prev, [slotNumber]: value };
      onPonSlotsChange(updated); // comunica com o componente pai
      return updated;
    });
  };
  

  const handlePortCountChange = (value: "8" | "16") => {
    setPortCount(value);
    handleSelectChange('portCount', value);
  };

  const toggleCanceled = (slot: string) => {
    setCanceledSlots(prev => {
      const updated = prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot];

      updateFinalValue(slot, updated.includes(slot), noCodeSlots.includes(slot));
      return updated;
    });
  };

  const toggleNoCode = (slot: string) => {
    setNoCodeSlots(prev => {
      const updated = prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot];

      updateFinalValue(slot, canceledSlots.includes(slot), updated.includes(slot));
      return updated;
    });
  };

  const updateFinalValue = (slot: string, isCanceled: boolean, isNoCode: boolean) => {
    const current = ponSlots[slot] || '';
    const base = current
      .replace(/^Validar porta com o responsável( - )?/, '')
      .replace(/( - )?SEM CÓDIGO$/, '')
      .trim();

    const parts = [];
    if (isCanceled) parts.push('Validar porta com o responsável');
    if (base) parts.push(base);
    if (isNoCode) parts.push('SEM CÓDIGO');

    const finalValue = parts.join(' - ');

    setPonSlots(prev => {
      const updated = { ...prev, [slot]: finalValue };
      onPonSlotsChange(updated);
      return updated;
    });
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
          <Label htmlFor="referencePoint">Ponto de Referência</Label>
          <Input
            id="referencePoint"
            name="referencePoint"
            value={formData.referencePoint || ''}
            onChange={handleInputChange}
            placeholder="Ponto de Referência"
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

      <div className="space-y-4">
        {/* Botão de escolha HAWUEI/FIBERHOME */}
        <div>
          <Label className="mb-2 block">Fabricante da OLT</Label>
          <RadioGroup 
            className="flex gap-6" 
            value={formData.oltVendor || ''} 
            onValueChange={(val) => handleSelectChange("oltVendor", val)}
          > 
            <div className="flex items-center space-x-2" role="button">
              <RadioGroupItem value="HAWUEI" id="hawuei" />
              <Label htmlFor="hawuei">HAWUEI</Label>
            </div>
            <div className="flex items-center space-x-2" role="button">
              <RadioGroupItem value="FIBERHOME" id="fiberhome" />
              <Label htmlFor="fiberhome">FIBERHOME</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Campos dinâmicos baseados na escolha */}
        {formData.oltVendor === 'HAWUEI' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="frame">FRAME</Label>
              <Input id="frame" name="frame" value={formData.frame || ''} onChange={handleInputChange} placeholder="Número do frame" />
            </div>
            <div>
              <Label htmlFor="slot">SLOT</Label>
              <Input id="slot" name="slot" value={formData.slot || ''} onChange={handleInputChange} placeholder="Número do slot" />
            </div>
            <div>
              <Label htmlFor="pon">PON</Label>
              <Input id="pon" name="pon" value={formData.pon || ''} onChange={handleInputChange} placeholder="Número PON" />
            </div>
          </div>
        )}

        {formData.oltVendor === 'FIBERHOME' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="slot">SLOT</Label>
              <Input id="slot" name="slot" value={formData.slot || ''} onChange={handleInputChange} placeholder="Número do slot" />
            </div>
            <div>
              <Label htmlFor="pon">PON</Label>
              <Input id="pon" name="pon" value={formData.pon || ''} onChange={handleInputChange} placeholder="Número PON" />
            </div>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val as 'slots' | 'fusion')} className="w-full mt-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="slots">Conectoriza</TabsTrigger>
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

          {Array.from({ length: parseInt(portCount, 10) }, (_, i) => i + 1).map(num => {
  const numStr = num.toString();
  const value = ponSlots[numStr] || '';

  const isCanceled = canceledSlots.includes(numStr);
  const isNoCode = noCodeSlots.includes(numStr);


            

            return (
              <div key={`slot-${num}`} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-6">{num}</div>
                  <Input
                    id={`pon-slot-${num}`}
                    name={`pon-slot-${num}`}
                    value={value}
                    onChange={handlePonSlotChange}                   
                    placeholder={`Cliente na porta ${num}`}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-4 items-center  text-lg">
                  <Checkbox
                    id={`cancelado-${num}`}
                    checked={isCanceled}
                    onCheckedChange={() => toggleCanceled(numStr)}
                  />
                  <Label htmlFor={`cancelado-${num}`}>Cancelado</Label>
                  <Checkbox
                    id={`semcodigo-${num}`}
                    checked={isNoCode}
                    onCheckedChange={() => toggleNoCode(numStr)}
                  />
                  
                  <Label htmlFor={`semcodigo-${num}`}>SC</Label>
                </div>
              </div>
              
            );
          })}
      </TabsContent>

      <TabsContent value="fusion" className="p-4 border rounded-md">
  <h3 className="font-medium text-lg mb-2">Fusão de Fibras</h3>
  <p className="text-sm text-gray-500 mb-4">
    Selecione as cores das fibras utilizadas na fusão
  </p>
  
  {/* Campos para adicionar nova fibra */}
  <div className="space-y-4">
    <div>
      <Label className="mb-2 block">Escolha a cor da fibra</Label>
      <Select
        value={newFiber.color}
        onValueChange={(value) => setNewFiber({ ...newFiber, color: value })}
      >
        <SelectTrigger id="fiber-color">
          <SelectValue placeholder="Selecione a cor da fibra" />
        </SelectTrigger>
        <SelectContent>
          {FIBER_COLORS.map((fiber) => (
            <SelectItem key={fiber.class} value={fiber.class}>
              {fiber.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div>
      <Label className="mb-2 block">Nome do cliente</Label>
      <Input
        id="client-name"
        value={newFiber.clientName}
        onChange={(e) => setNewFiber({ ...newFiber, clientName: e.target.value })}
        placeholder="Nome do cliente"
      />
    </div>

    <button
      className="btn btn-primary"
      onClick={handleAddFiber}
    >
      Adicionar Fibra
    </button>
  </div>

  {/* Listar as fibras adicionadas */}
  <div className="mt-4">
    <h4 className="font-medium text-lg mb-2">Fibras Selecionadas:</h4>
    <ul>
      {selectedFibers.map((fiber, index) => (
        <li key={index} className="mb-2">
          <span>{fiber.clientName} - {fiber.color}</span>
        </li>
      ))}
    </ul>
  </div>
</TabsContent>
        
      </Tabs>
    </div>
  );
};

export default CTOVerificationForm;
