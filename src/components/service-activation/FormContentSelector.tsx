
import React from 'react';
import { ServiceActivationFormData, OLTOption, TopologyOption } from '@/types';
import InternetActivationForm from '../InternetActivationForm';
import CTOVerificationForm from '../CTOVerificationForm';
import EquipmentChangeForm from '../EquipmentChangeForm';
import ServerMigrationForm from '../ServerMigrationForm';
import AddressChangeForm from '../AddressChangeForm';
import OwnershipChangeForm from '../OwnershipChangeForm';
import TelephonyActivationForm from '../TelephonyActivationForm';
import DatacomForm from '../DatacomForm';

interface FormContentSelectorProps {
  serviceType: string;
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleGenerateSipPassword: () => void;
  handleGenerateWifiPassword: () => void;
  oltOptions: OLTOption[];
  topologyOptions: TopologyOption[];
}

const FormContentSelector: React.FC<FormContentSelectorProps> = ({
  serviceType,
  formData,
  handleInputChange,
  handleSelectChange,
  handleGenerateSipPassword,
  handleGenerateWifiPassword,
  oltOptions,
  topologyOptions
}) => {
  switch (serviceType) {
    case 'internet-activation':
      return (
        <InternetActivationForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSelectChange={handleSelectChange}
          oltOptions={oltOptions}
          topologyOptions={topologyOptions}
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
            const password = (Math.random() + 1).toString(36).substring(2, 10);
            handleSelectChange('datacomPassword', password);
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
          oltOptions={oltOptions}
          onFusionChange={(fusions) => {
            handleSelectChange('fiberFusion', JSON.stringify(fusions));
          }}
          onPonSlotsChange={(slots) => {
            handleSelectChange('ponSlots', JSON.stringify(slots));
          }}
          onPonOutsideChange={(outside) => {
            handleSelectChange('ponOutside', JSON.stringify(outside));
          }}
        />
      );
    case 'equipment-change':
      return (
        <EquipmentChangeForm 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSelectChange={handleSelectChange}
          topologyOptions={topologyOptions}
          oltOptions={oltOptions}
          handleGenerateWifiPassword={handleGenerateWifiPassword}
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

export default FormContentSelector;
