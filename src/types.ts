export interface MealApi {
  mealTime: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  mealDescription: string;
  calories: number;
}

export interface Meal {
  id: string;
  mealTime: 'Breakfast' | 'Snack' | 'Lunch' | 'Dinner';
  mealDescription: string;
  calories: string;
}

export interface MealApiObject {
  [id: string]: MealApi;
}