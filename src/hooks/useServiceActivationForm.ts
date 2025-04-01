
import { useState, useEffect } from 'react';
import { ServiceActivationFormData, OLTOption, TopologyOption } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export const useServiceActivationForm = () => {
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

  useEffect(() => {
    if (formData.client && formData.patrimony) {
      const names = formData.client.split('-')[1]?.trim().split(' ') || [];
      if (names.length >= 2) {
        const firstName = names[0].toLowerCase();
        const secondName = names[1].toLowerCase();
        const pppoe1 = `${firstName}.${secondName}`;
        
        setFormData(prev => ({
          ...prev,
          pppoe: pppoe1
        }));
      }
    }
  }, [formData.client, formData.patrimony]);

  useEffect(() => {
    if (formData.code) {
      const clientCode = formData.code.split('-')[0] || formData.code;
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

  const validateForm = () => {
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
        return false;
      }
    }

    if (formData.serviceType === 'telephony-activation') {
      if (!formData.phoneNumber) {
        toast({
          title: "Erro",
          description: "Por favor, informe o número de telefone.",
          variant: "destructive",
        });
        return false;
      }
    }

    if (formData.serviceType === 'telephony-activation' && formData.phoneNumber) {
      setFormData(prev => ({
        ...prev,
        sipServer: `sip:${formData.phoneNumber}@172.31.2.18`
      }));
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
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

  return {
    formData,
    showResults,
    handleInputChange,
    handleSelectChange,
    handleGenerateSipPassword,
    handleGenerateWifiPassword,
    handleSubmit,
    resetForm
  };
};
