export interface QuizResult {
  user_id: number;
  season_id: number;
  result_date: string;
  hair_id: number;
  makeup_id: number;
  accessories_id: number;
  contact_lens_id: number;
  avoid_color_id: number;
  subcategory_id: number | null; 
}