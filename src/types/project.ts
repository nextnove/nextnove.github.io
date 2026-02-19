export interface ProjectMetrics {
  users?: string;
  performance?: string;
  latency?: string;
  uptime?: string;
  dataPoints?: string;
  charts?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  link: string;
  metrics: ProjectMetrics;
}
