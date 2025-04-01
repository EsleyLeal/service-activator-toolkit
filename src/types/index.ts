
export interface ServiceActivationFormData {
  serviceType: string;
  client: string;
  technician: string;
  code: string;
  fhtt: string;
  fhttNew?: string;
  patrimony: string;
  topology: string;
  switchModel?: string;
  ontModel?: string;
  wifiPassword?: string;
  cto: string;
  olt: string;
  pppoe: string;
  signalStrength: string;
  phoneNumber?: string;
  sipPassword?: string;
  sipServer?: string;
  streetAddress?: string;
  referencePoint?: string;
  slot?: string;
  pon?: string;
  fiberFusion?: string[];
  ponSlots?: {
    [key: string]: string;
  };
  ponOutside?: string[];
  location?: string;
  fiber?: string;
  managementIP?: string;
  snNumber?: string;
  datacomUsername?: string;
  datacomPassword?: string;
}

export type OLTOption = {
  name: string;
  type: string;
  vendor: string;
};

export type TopologyOption = 'ONU + ROTEADOR' | 'SWITCH' | 'ONT';
