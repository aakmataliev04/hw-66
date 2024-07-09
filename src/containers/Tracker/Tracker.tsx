import React, {useCallback, useEffect, useState} from 'react';
import './Tracker.css';
import {Link} from 'react-router-dom';
import Meals from '../../components/Meals/Meals';
import {Meal, MealApiObject} from '../../types';
import axiosApi from '../../axiosApi';
import Preloader from '../../components/Preloader/Preloader';

const Tracker = () => {
  const [meals, setMeals] = useState<Meal[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalCalorie, setTotalCalorie] = useState(0);


  const fetchMeals = useCallback(async () => {
    try {
      setIsLoading(true);
      const {data: meals} = await axiosApi.get<MealApiObject | null>(`/meals.json`);
      if (meals !== null) {
        const formattedMeal: Meal[] = Object.keys(meals).map((id: string) => {
          return {
            ...meals[id],
            id
          };
        });
        setMeals(formattedMeal);

        const total = formattedMeal.reduce((sum, meal) => {
          sum += parseInt(meal.calories);
          return sum;
        }, 0);
        setTotalCalorie(total);
      }
    } finally {

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchMeals();
  }, [fetchMeals]);


  let mealsList = <Meals meals={meals} reFetchMeals={fetchMeals}/>;
  if (isLoading) {
    mealsList = <div style={{display: 'flex', justifyContent: 'center', padding: '40vh 0'}}><Preloader/></div>;
  }

  return (
    <div>
      <div className="calories-total">
        <h2 className={'calories-total-title'}>Total calories: <strong>{totalCalorie} kcal</strong></h2>
        <Link to={'/add-meal'} className={'calories-btn'}>Add new meal</Link>
      </div>
      {mealsList}
    </div>
  );
};

export default Tracker;