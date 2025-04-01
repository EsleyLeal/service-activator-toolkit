
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ServiceActivationFormData, OLTOption, TopologyOption } from '@/types';
import CTOVerificationForm from './CTOVerificationForm';
import EquipmentChangeForm from './EquipmentChangeForm';
import InternetActivationForm from './InternetActivationForm';
import ServerMigrationForm from './ServerMigrationForm';
import AddressChangeForm from './AddressChangeForm';
import OwnershipChangeForm from './OwnershipChangeForm';
import TelephonyActivationForm from './TelephonyActivationForm';
import ServiceActivationResult from './ServiceActivationResult';
import DatacomForm from './DatacomForm';

const OLT_OPTIONS: OLTOption[] = [
  { name: "DISTRITO - EPON", type: "EPON", vendor: "FIBERHOME" },
  { name: "JPA - TAMBIA", type: "EPON", vendor: "FIBERHOME" },
  { name: "CABEDELO - EPON", type: "EPON", vendor: "FIBERHOME" },
  { name: "BESSA NORTE", type: "", vendor: "FIBERHOME" },
  { name: "BESSA SUL", type: "", vendor: "FIBERHOME" },
  { name: "TAMBAU CABO BRANCO", type: "", vendor: "FIBERHOME" },
  { name: "TAMBAU MANAIRA", type: "", vendor: "FIBERHOME" },
  { name: "SEDE - NOVO", type: "", vendor: "FIBERHOME" },
  { name: "MME A02", type: "", vendor: "FIBERHOME" },
  { name: "MME PL", type: "", vendor: "FIBERHOME" },
  { name: "CAPIM", type: "", vendor: "FIBERHOME" },
  { name: "RIO TINTO", type: "", vendor: "FIBERHOME" },
  { name: "CAMPINA GRADE", type: "", vendor: "FIBERHOME" },
  { name: "PATOS", type: "", vendor: "FIBERHOME" },
  { name: "SEDE PATOS", type: "", vendor: "FIBERHOME" },
  { name: "BANCÁRIOS", type: "", vendor: "HUAWEI" },
  { name: "MANGABEIRA", type: "", vendor: "HUAWEI" },
  { name: "BOSQUE", type: "", vendor: "HUAWEI" },
  { name: "DT", type: "", vendor: "HUAWEI" },
  { name: "CBD", type: "", vendor: "HUAWEI" },
  { name: "ALAMOANA", type: "", vendor: "HUAWEI" }
];

const TOPOLOGY_OPTIONS: TopologyOption[] = ['ONU + ROTEADOR', 'SWITCH', 'ONT'];

const ServiceActivationForm: React.FC = () => {
  const [formData, setFormData] = useState<ServiceActivationFormData>({
    serviceType: 'internet-activation',
    client: '',
    technician: '',
    code: '',
    fhtt: '',
    patrimony: '',
    topology: 'ONU + ROTEADOR',
    cto: '',
    olt: '',
    pppoe: '',
    signalStrength: '',
    ponSlots: {},
    ponOutside: [],
    fiberFusion: []
  });

  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Generate PPPoE based on client name and patrimony
  useEffect(() => {
    if (formData.client && formData.patrimony) {
      const names = formData.client.split('-')[1]?.trim().split(' ') || [];
      if (names.length >= 2) {
        const firstName = names[0].toLowerCase();
        const secondName = names[1].toLowerCase();
        const pppoe1 = `${firstName}.${secondName}`;
        const pppoe2 = `${firstName}${formData.patrimony}`;
        
        setFormData(prev => ({
          ...prev,
          pppoe: pppoe1
        }));
      }
    }
  }, [formData.client, formData.patrimony]);

  // Generate WiFi network names based on client code
  useEffect(() => {
    if (formData.code) {
      const clientCode = formData.code.split('-')[0] || formData.code;
      // This is just for display purposes, it's not stored in the formData
      console.log(`WiFi 2.4G: TELY_${clientCode}_2G`);
      console.log(`WiFi 5G: TELY_${clientCode}_5G`);
    }
  }, [formData.code]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRandomPassword = (length = 8) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  const handleGenerateSipPassword = () => {
    const password = generateRandomPassword();
    setFormData(prev => ({ ...prev, sipPassword: password }));
  };

  const handleGenerateWifiPassword = () => {
    const password = generateRandomPassword(10);
    setFormData(prev => ({ ...prev, wifiPassword: password }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data based on service type
    if (formData.serviceType === 'internet-activation' || 
        formData.serviceType === 'equipment-change') {
      if (!formData.client || !formData.technician || !formData.code || 
          !formData.fhtt || !formData.patrimony || !formData.cto || 
          !formData.olt) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos obrigatórios.",
          variant: "destructive",
        });
        return;
      }
    }

    // Special validation for telephone activation
    if (formData.serviceType === 'telephony-activation') {
      if (!formData.phoneNumber) {
        toast({
          title: "Erro",
          description: "Por favor, informe o número de telefone.",
          variant: "destructive",
        });
        return;
      }
    }

    // Set SIP server for telephony
    if (formData.serviceType === 'telephony-activation' && formData.phoneNumber) {
      setFormData(prev => ({
        ...prev,
        sipServer: `sip:${formData.phoneNumber}@172.31.2.18`
      }));
    }

    setShowResults(true);
    toast({
      title: "Sucesso",
      description: "Formulário processado com sucesso!",
    });
  };

  const resetForm = () => {
    setFormData({
      serviceType: 'internet-activation',
      client: '',
      technician: '',
      code: '',
      fhtt: '',
      patrimony: '',
      topology: 'ONU + ROTEADOR',
      cto: '',
      olt: '',
      pppoe: '',
      signalStrength: '',
      ponSlots: {},
      ponOutside: [],
      fiberFusion: []
    });
    setShowResults(false);
  };

  const renderFormContent = () => {
    switch (formData.serviceType) {
      case 'internet-activation':
        return (
          <InternetActivationForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSelectChange={handleSelectChange}
            oltOptions={OLT_OPTIONS}
            topologyOptions={TOPOLOGY_OPTIONS}
            handleGenerateWifiPassword={handleGenerateWifiPassword}
          />
        );
      case 'datacom':
        return (
          <DatacomForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSelectChange={handleSelectChange}
            handleGeneratePassword={() => {
              const password = generateRandomPassword();
              setFormData(prev => ({ ...prev, datacomPassword: password }));
            }}
          />
        );
      case 'telephony-activation':
        return (
          <TelephonyActivationForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleGenerateSipPassword={handleGenerateSipPassword}
          />
        );
      case 'cto-verification':
        return (
          <CTOVerificationForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSelectChange={handleSelectChange}
            oltOptions={OLT_OPTIONS}
            onFusionChange={(fusions) => {
              setFormData(prev => ({ ...prev, fiberFusion: fusions }));
            }}
            onPonSlotsChange={(slots) => {
              setFormData(prev => ({ ...prev, ponSlots: slots }));
            }}
            onPonOutsideChange={(outside) => {
              setFormData(prev => ({ ...prev, ponOutside: outside }));
            }}
          />
        );
      case 'equipment-change':
        return (
          <EquipmentChangeForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
            handleSelectChange={handleSelectChange}
            topologyOptions={TOPOLOGY_OPTIONS}
          />
        );
      case 'server-migration':
        return (
          <ServerMigrationForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 'ownership-change':
        return (
          <OwnershipChangeForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      case 'address-change':
        return (
          <AddressChangeForm 
            formData={formData} 
            handleInputChange={handleInputChange} 
          />
        );
      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <ServiceActivationResult 
        formData={formData} 
        resetForm={resetForm}
      />
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-center text-2xl">
          Toolkit de Ativação de Serviços
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="internet-activation" className="w-full mb-6"
            onValueChange={(value) => handleSelectChange('serviceType', value)}
          >
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="internet-activation">Internet</TabsTrigger>
              <TabsTrigger value="telephony-activation">Telefonia</TabsTrigger>
              <TabsTrigger value="equipment-change">Mudança de Equipamento</TabsTrigger>
              <TabsTrigger value="server-migration">Migração de Servidores</TabsTrigger>
            </TabsList>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="ownership-change">Troca de Titularidade</TabsTrigger>
              <TabsTrigger value="address-change">Mudança de Endereço</TabsTrigger>
              <TabsTrigger value="cto-verification">Verificação CTO</TabsTrigger>
              <TabsTrigger value="datacom">Datacom</TabsTrigger>
            </TabsList>
            
            <TabsContent value={formData.serviceType}>
              {renderFormContent()}
            </TabsContent>
          </Tabs>

          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" variant="outline" onClick={resetForm}>
              Limpar
            </Button>
            <Button type="submit">
              Gerar Informações
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceActivationForm;
