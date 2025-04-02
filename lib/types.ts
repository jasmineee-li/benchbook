export interface Memory {
  id: number;
  author: string;
  content: string;
  photo: string | null;
  drawing: string | null;
  timestamp: string;
  created_at: string;
}

export interface NewMemory {
  author: string;
  content: string;
  photo?: string | null;
  drawing?: string | null;
}
