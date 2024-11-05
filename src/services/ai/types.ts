export interface AIResponse {
  message: string;
  type: 'text' | 'lawyers' | 'document' | 'error';
  data?: any;
}

export interface DocumentAnalysis {
  mainPoints: string[];
  risks: string[];
  recommendations: string[];
}