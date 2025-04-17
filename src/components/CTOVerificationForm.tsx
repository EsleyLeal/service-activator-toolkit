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
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
  onFusionChange: (fusions: string[]) => void;
  onPonSlotsChange: (slots: { [key: string]: string }) => void;
  onPonOutsideChange: (outside: string[]) => void;
  resetForm: () => void;
}

const FIBER_COLORS = [
  { name: 'Fibra Azul', class: 'blue-fiber' },
  { name: 'Fibra Laranja', class: 'orange-fiber' },
  { name: 'Fibra Verde', class: 'green-fiber' },
  { name: 'Fibra Marrom', class: 'brown-fiber' },
  { name: 'Fibra Cinza', class: 'gray-fiber' },
  { name: 'Fibra Branco', class: 'white-fiber' },
  { name: 'Fibra Vermelho', class: 'red-fiber' },
  { name: 'Fibra Preto', class: 'black-fiber' },
  { name: 'Fibra Amarelo', class: 'yellow-fiber' },
  { name: 'Fibra Violeta', class: 'violet-fiber' },
  { name: 'Fibra Rosa', class: 'pink-fiber' },
  { name: 'Fibra Aqua', class: 'aqua-fiber' }
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

  // NOVOS estados para Fusão
  const [canceledFusion, setCanceledFusion] = useState<number[]>([]);
  const [noCodeFusion, setNoCodeFusion] = useState<number[]>([]);

  const resetPorts = () => {
    setPonSlots({});
    setCanceledSlots([]);
    setNoCodeSlots([]);
  };

  const handleAddFiber = () => {
    if (newFiber.color && newFiber.clientName) {
      setSelectedFibers([...selectedFibers, newFiber]);
      setNewFiber({ color: '', clientName: '' });
    }
  };

  useEffect(() => {
    onFusionChange(
      selectedFibers.map((fiber, idx) => {
        const sameBefore = selectedFibers
          .slice(0, idx)
          .filter(f => f.color === fiber.color).length + 1;
        const labelColor = sameBefore > 1
          ? `${fiber.color} ${sameBefore}`
          : fiber.color;
        return `${labelColor} - ${fiber.clientName}`;
      })
    );
  }, [selectedFibers, onFusionChange]);
  

  useEffect(() => {
    if (
      Object.keys(formData.ponSlots).length === 0 &&
      formData.portCount === '' &&
      formData.oltVendor === '' &&
      formData.ctoType === ''
    ) {
      setPonSlots({});
      setCanceledSlots([]);
      setNoCodeSlots([]);
    }
  }, [formData.ponSlots, formData.portCount, formData.oltVendor, formData.ctoType]);

 // Conectoriza handlers... (igual ao seu original)  
 const handlePonSlotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const slot = e.target.name.replace('pon-slot-', '');
  setPonSlots(prev => {
    const upd = {...prev, [slot]: e.target.value};
    onPonSlotsChange(upd);
    return upd;
  });
};

  const handlePortCountChange = (value: "8" | "16") => {
    setPortCount(value);
    handleSelectChange('portCount', value);
  };

  const updateFinalValue = (slot: string, isCanceled: boolean, isNoCode: boolean) => {
    const current = ponSlots[slot] || '';
    const base = current
      .replace(/^Validar porta com o responsável( - )?/, '')
      .replace(/( - )?SEM CÓDIGO$/, '')
      .trim();

    const parts: string[] = [];
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

  // Funções para Fusão
  const toggleCanceledFusion = (idx: number) => {
    setCanceledFusion(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const toggleNoCodeFusion = (idx: number) => {
    setNoCodeFusion(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
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
              {oltOptions.map(option => (
                <SelectItem key={option.name} value={option.name}>
                  {option.name}{option.vendor && ` - ${option.vendor}`}
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
        <div>
          <Label className="mb-2 block">Fabricante da OLT</Label>
          <RadioGroup 
            className="flex gap-6" 
            value={formData.oltVendor || ''} 
            onValueChange={val => handleSelectChange("oltVendor", val)}
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

        {formData.oltVendor === 'HAWUEI' && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="frame">FRAME</Label>
              <Input
                id="frame"
                name="frame"
                value={formData.frame || ''}
                onChange={handleInputChange}
                placeholder="Número do frame"
              />
            </div>
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
        )}

        {formData.oltVendor === 'FIBERHOME' && (
          <div className="space-y-4">
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
        )}
      </div>

      <Tabs value={activeTab} onValueChange={val => setActiveTab(val as any)} className="w-full mt-4">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="slots">Conectoriza</TabsTrigger>
          <TabsTrigger value="fusion">Fusão de Fibras</TabsTrigger>
        </TabsList>

        {/* Conectoriza: mantido intacto */}
        <TabsContent value="slots" className="space-y-4 p-4 border rounded-md">
          <h3 className="font-medium text-lg mb-2">Preenchimento de PON</h3>
          <div className="mb-4">
            <Label className="mb-2 block">Quantidade de Portas</Label>
            <RadioGroup 
              value={portCount} 
              onValueChange={v => handlePortCountChange(v as any)}
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

          {Array.from({ length: +portCount }, (_, i) => (i + 1).toString()).map(numStr => {
            const value = ponSlots[numStr] || '';
            const isCanceled = canceledSlots.includes(numStr);
            const isNoCode = noCodeSlots.includes(numStr);
            return (
              <div key={numStr} className="flex flex-col md:flex-row items-start md:items-center gap-2 mb-2">
                <div className="flex items-center gap-2 w-full">
                  <div className="w-6">{numStr}</div>
                  <Input
                    id={`pon-slot-${numStr}`}
                    name={`pon-slot-${numStr}`}
                    value={value}
                    onChange={handlePonSlotChange}
                    placeholder={`Cliente na porta ${numStr}`}
                    className="flex-1"
                  />
                </div>
                <div className="flex gap-4 items-center text-lg">
                  <Checkbox
                    id={`cancelado-${numStr}`}
                    checked={isCanceled}
                    onCheckedChange={() => toggleCanceled(numStr)}
                  />
                  <Label htmlFor={`cancelado-${numStr}`}>Cancelado</Label>
                  <Checkbox
                    id={`semcodigo-${numStr}`}
                    checked={isNoCode}
                    onCheckedChange={() => toggleNoCode(numStr)}
                  />
                  <Label htmlFor={`semcodigo-${numStr}`}>SC</Label>
                </div>
              </div>
            );
          })}

          <textarea
            name="ponOutside"
            id="ponOutside"
            value={formData.ponOutside || ''}
            onChange={handleInputChange}
            className="text-black w-full h-20 p-4 resize-none"
            placeholder="FORA NA PON -"
          />
        </TabsContent>

        {/* Fusão de Fibras: atualizado somente esta parte */}
        <TabsContent value="fusion" className="p-4 border rounded-md space-y-4">
          <h3 className="font-medium text-lg mb-2">Fusão de Fibras</h3>
          <p className="text-sm text-gray-500 mb-4">
            Selecione as cores das fibras utilizadas na fusão e marque “Cancelado” ou “SC”:
          </p>

          {/* Listagem */}
          <ul className="space-y-2">
            {selectedFibers.map((fiber, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between p-2 border rounded-md"
              >
                <span>
                  {fiber.color} – {fiber.clientName}
                  {canceledFusion.includes(idx) && ' • Validar porta com o responsável'}
                  {noCodeFusion.includes(idx) && ' • SEM CÓDIGO'}
                </span>

                <div className="flex items-center gap-4">
                  <Checkbox
                    id={`fus-cancel-${idx}`}
                    checked={canceledFusion.includes(idx)}
                    onCheckedChange={() => toggleCanceledFusion(idx)}
                  />
                  <Label htmlFor={`fus-cancel-${idx}`}>Cancelado</Label>

                  <Checkbox
                    id={`fus-sc-${idx}`}
                    checked={noCodeFusion.includes(idx)}
                    onCheckedChange={() => toggleNoCodeFusion(idx)}
                  />
                  <Label htmlFor={`fus-sc-${idx}`}>SC</Label>
                </div>
              </li>
            ))}
          </ul>

          {/* Formulário de adição de fibra */}
          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Escolha a cor da fibra</Label>
              <Select
                value={newFiber.color}
                onValueChange={value => setNewFiber({ ...newFiber, color: value })}
              >
                <SelectTrigger id="fiber-color">
                  <SelectValue placeholder="Selecione a cor da fibra" />
                </SelectTrigger>
                <SelectContent>
                  {FIBER_COLORS.map(f => (
                    <SelectItem key={f.name} value={f.name}>
                      {f.name}
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
                onChange={e => setNewFiber({ ...newFiber, clientName: e.target.value })}
                placeholder="Nome do cliente"
              />
            </div>

            <button
  type="button"
  className="btn btn-primary"
  onClick={handleAddFiber}
  disabled={selectedFibers.filter(f=>f.color===newFiber.color).length >= 2}
>
  Adicionar Fibra
</button>
          </div>
        </TabsContent>
      </Tabs>


    </div>
  );
};

export default CTOVerificationForm;
