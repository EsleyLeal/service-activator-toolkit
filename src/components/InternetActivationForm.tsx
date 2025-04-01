
import React from 'react';
import { ServiceActivationFormData, OLTOption, TopologyOption } from '@/types';
import ClientTechnicianSection from './internet-activation/ClientTechnicianSection';
import IdentificationSection from './internet-activation/IdentificationSection';
import TopologySection from './internet-activation/TopologySection';
import ConnectionSection from './internet-activation/ConnectionSection';

interface InternetActivationFormProps {
  formData: ServiceActivationFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  oltOptions: OLTOption[];
  topologyOptions: TopologyOption[];
  handleGenerateWifiPassword: () => void;
}

const InternetActivationForm: React.FC<InternetActivationFormProps> = ({
  formData,
  handleInputChange,
  handleSelectChange,
  oltOptions,
  topologyOptions,
  handleGenerateWifiPassword
}) => {
  return (
    <div className="space-y-4">
      <ClientTechnicianSection 
        client={formData.client}
        technician={formData.technician}
        handleInputChange={handleInputChange}
      />

      <IdentificationSection 
        code={formData.code}
        fhtt={formData.fhtt}
        patrimony={formData.patrimony}
        handleInputChange={handleInputChange}
      />

      <TopologySection 
        topology={formData.topology}
        switchModel={formData.switchModel}
        ontModel={formData.ontModel}
        wifiPassword={formData.wifiPassword}
        code={formData.code}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        topologyOptions={topologyOptions}
        handleGenerateWifiPassword={handleGenerateWifiPassword}
      />

      <ConnectionSection 
        cto={formData.cto}
        olt={formData.olt}
        pppoe={formData.pppoe}
        signalStrength={formData.signalStrength}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        oltOptions={oltOptions}
      />
    </div>
  );
};

export default InternetActivationForm;
