
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
  fhttNew: '',
  patrimony: '',
  topology: 'ONU + ROTEADOR',
  switchModel: '',
  ontModel: '',
  wifiPassword: '',
  cto: '',
  ctoType: '',
  olt: '',
  pppoe: '',
  signalStrength: '',
  phoneNumber: '',
  sipPassword: '',
  sipServer: '',
  sipIp: '',
  indexValue: '',
  streetAddress: '',
  referencePoint: '',
  called: '',
  openBy: '',
  newHolder: '',
  identity: '',
  changeType: '',
  frame: '',
  slot: '',
  pon: '',
  fiberFusion: [],
  oltVendor: '',
  portCount: '',
  ponSlots: {},
  ponOutside: [],
  location: '',
  fiber: '',
  managementIP: '',
  snNumber: '',
  datacomUsername: '',
  datacomPassword: '',
  clienteNaPorta: '',
  });

  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Se ambos os campos estiverem preenchidos, gera o PPPoE
    if (formData.client && formData.patrimony) {
      let clientName = formData.client;
  
      // Se existir um hífen, separamos a string
      if (clientName.includes('-')) {
        const parts = clientName.split('-');
        // Se a primeira parte for numérica ou estiver vazia, descartamos e usamos o restante
        if (parts[0].trim() === '' || /^\d+$/.test(parts[0].trim())) {
          clientName = parts.slice(1).join('-').trim();
        }
      }
  
      const ignoreWords = ['de', 'do', 'da', 'das', 'dos', 'e']; // Palavras a serem ignoradas
      const names = clientName.split(' ');
      // Filtra nomes vazios e palavras indesejadas
      const filteredNames = names.filter(
        name => name.trim() !== '' && !ignoreWords.includes(name.toLowerCase())
      );
  
      if (filteredNames.length > 0) {
        // Função para remover todos os acentos
        const removeAccents = (str: string) => {
          return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        };
  
        const firstName = removeAccents(filteredNames[0]).toLowerCase();
        const secondName =
          filteredNames.length >= 2
            ? removeAccents(filteredNames[1]).toLowerCase()
            : firstName;
        const pppoe1 = `${firstName}.${secondName}     ${firstName}${formData.patrimony}`;
        
        setFormData(prev => ({
          ...prev,
          pppoe: pppoe1
        }));
      }
    } else {
      // Se algum dos campos estiver vazio, limpa o valor de pppoe
      setFormData(prev => ({
        ...prev,
        pppoe: ""
      }));
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
    if (formData.serviceType === 'internet-activation'
       ) {
      if (!formData.client || !formData.technician || !formData.code || 
          !formData.fhtt || !formData.patrimony || !formData.cto || 
          !formData.olt || !formData.olt || !formData.signalStrength) {
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
    setFormData(prev => ({
      serviceType: prev.serviceType, // 🔁 mantém a aba ativa
      client: '',
      technician: '',
      code: '',
      fhtt: '',
      fhttNew: '',
      patrimony: '',
      topology: 'ONU + ROTEADOR',
      switchModel: '',
      ontModel: '',
      wifiPassword: '',
      cto: '',
      ctoType: '',
      olt: '',
      pppoe: '',
      signalStrength: '',
      phoneNumber: '',
      sipPassword: '',
      sipServer: '',
      sipIp: '',
      indexValue: '',
      streetAddress: '',
      referencePoint: '',
      called: '',
      openBy: '',
      newHolder: '',
      identity: '',
      changeType: '',
      frame: '',
      slot: '',
      pon: '',
      fiberFusion: [],
      oltVendor: '',
      portCount: '',
      ponSlots: {},
      ponOutside: [],
      location: '',
      fiber: '',
      managementIP: '',
      snNumber: '',
      clienteNaPorta: '',
      
    }));
    setShowResults(false);
    
  };

  
  
  
  const resetPorts = () => {
    setFormData(prev => ({
      ...prev,
      ponSlots: {},
      portCount: '',
      oltVendor: '',
      ctoType: '',
    }));
  };

  return {
    formData,
    showResults,
    handleInputChange,
    handleSelectChange,
    handleGenerateSipPassword,
    handleGenerateWifiPassword,
    handleSubmit,
    resetForm,
    resetPorts // <- aqui! ✨
  };
};
