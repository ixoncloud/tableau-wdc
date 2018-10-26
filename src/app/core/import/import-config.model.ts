export interface ImportConfiguration {
  companyId: string;
  startDate: string;
  endDate: string;
  agents: AgentImportConfiguration[];
}

export interface AgentImportConfiguration {
  agentId: string;
  devices: DeviceImportConfiguration[];
}

export interface DeviceImportConfiguration {
  deviceId: string;
  tags: TagImportConfiguration[];
}

export interface TagImportConfiguration {
  tagId: number;
  limit: number;
  postAggr: string;
  formulaOperator: string;
  formulaFactor: number;
}
