
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ServiceTypeTabsProps {
  currentServiceType: string;
  onServiceTypeChange: (value: string) => void;
}

const ServiceTypeTabs: React.FC<ServiceTypeTabsProps> = ({
  currentServiceType,
  onServiceTypeChange
}) => {
  return (
    <>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="internet-activation">Internet</TabsTrigger>
        <TabsTrigger value="telephony-activation">Telefonia</TabsTrigger>
        <TabsTrigger value="equipment-change">Mudança de Equipamento</TabsTrigger>
        <TabsTrigger value="server-migration">Migração</TabsTrigger>
      </TabsList>
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="ownership-change">Troca de Titularidade</TabsTrigger>
        <TabsTrigger value="address-change">Mudança de Endereço</TabsTrigger>
        <TabsTrigger value="cto-verification">Verificação CTO</TabsTrigger>
        <TabsTrigger value="datacom">Datacom</TabsTrigger>
      </TabsList>
    </>
  );
};

export default ServiceTypeTabs;
