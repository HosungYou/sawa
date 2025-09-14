export type Facet =
  | "claim"
  | "evidence"
  | "reasoning"
  | "backing"
  | "qualifier"
  | "rebuttal";

export type PassThreshold = "meets_all" | "meets_most";

export interface AnchoredExample {
  weak: string;
  strong?: string;
  nudge: string;
}

export interface RubricLevel {
  description: string;
  criteria: string[];
}

export interface PlaybookItem {
  facet: Facet;
  goal: string;
  rubricLevels?: Record<string, RubricLevel>;
  checklist: string[];
  passThreshold: PassThreshold;
  questions: string[];
  nudges: string[];
  anchoredExamples?: AnchoredExample[];
}

export interface PlaybookConfig {
  items: PlaybookItem[];
}

export interface FacetEvaluation {
  passed: boolean;
  level: 1 | 2 | 3 | 4; // 1: weak, 4: strong
  nudges: string[];
}

export interface FacetState {
  facet: Facet;
  questionIndex: number;
  answer?: string;
  passed: boolean;
  level: 1 | 2 | 3 | 4;
  nudges: string[];
}

export interface SessionHistoryItem {
  facet: Facet;
  question: string;
  answer: string;
  passed: boolean;
  level: 1 | 2 | 3 | 4;
  nudges: string[];
  timestamp: string;
}

export interface SessionState {
  id: string;
  createdAt: string;
  updatedAt: string;
  currentIndex: number; // index in sequence
  sequence: Facet[];
  facets: Record<Facet, FacetState>;
  history: SessionHistoryItem[];
}
