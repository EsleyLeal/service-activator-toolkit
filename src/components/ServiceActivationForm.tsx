import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ServiceActivationResult from './ServiceActivationResult';
import { useServiceActivationForm } from '@/hooks/useServiceActivationForm';
import ServiceTypeTabs from './service-activation/ServiceTypeTabs';
import FormContentSelector from './service-activation/FormContentSelector';
import FormActions from './service-activation/FormActions';
import { OLT_OPTIONS, TOPOLOGY_OPTIONS } from '@/constants/serviceOptions';

const ServiceActivationForm: React.FC = () => {
  const {
    formData,
    showResults,
    handleInputChange,
    handleSelectChange,
    handleGenerateSipPassword,
    handleGenerateWifiPassword,
    handleSubmit,
    resetForm,
    resetPorts, // <- vindo do hook!
  } = useServiceActivationForm();

  if (showResults) {
    return (
      <ServiceActivationResult 
        formData={formData} 
        resetForm={resetForm}
      />
    );
  }

  const handleFullReset = () => {
    resetPorts();
    resetForm();
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader className="bg-blue-600 text-white">
        <CardTitle className="text-center text-2xl">
          Toolkit de Ativação de Serviços
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <Tabs
            value={formData.serviceType}
            onValueChange={(value) => handleSelectChange('serviceType', value)}
            className="w-full mb-6"
          >
            <ServiceTypeTabs 
              currentServiceType={formData.serviceType} 
              onServiceTypeChange={(value) => handleSelectChange('serviceType', value)} 
            />

            <TabsContent value={formData.serviceType}>
              <FormContentSelector 
                serviceType={formData.serviceType}
                formData={formData}
                handleInputChange={handleInputChange}
                handleSelectChange={handleSelectChange}
                handleGenerateSipPassword={handleGenerateSipPassword}
                handleGenerateWifiPassword={handleGenerateWifiPassword}
                oltOptions={OLT_OPTIONS}
                topologyOptions={TOPOLOGY_OPTIONS}
              />
            </TabsContent>
          </Tabs>

          <FormActions 
            onReset={() => {
              resetPorts();
              resetForm();
            }}
          />
        </form>
      </CardContent>
    </Card>
  );
};

export default ServiceActivationForm;
