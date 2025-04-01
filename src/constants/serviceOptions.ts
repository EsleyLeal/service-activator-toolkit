
import { OLTOption, TopologyOption } from '@/types';

export const OLT_OPTIONS: OLTOption[] = [
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

export const TOPOLOGY_OPTIONS: TopologyOption[] = ['ONU + ROTEADOR', 'SWITCH', 'ONT'];
