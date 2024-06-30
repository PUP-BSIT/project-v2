export interface Option {
  option_id: number;
  option_text: string;
  season_id: number;
}

export interface Question {
  question_id: number;
  question_text: string;
  options: Option[];
}