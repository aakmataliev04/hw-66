import React from 'react';
import MealsItem from './MealsItem/MealsItem';
import {Meal} from '../../types';
import './Meals.css';

interface Props {
  meals: Meal[] | null;
  reFetchMeals: VoidFunction;
}

const Meals: React.FC<Props> = ({meals, reFetchMeals}) => {
  return (
    <div className={'meals-list'}>
      {
        meals?.length ? (
          meals.map((meal) => {
            return (<MealsItem key={meal.id} meal={meal} reFetchMeals={reFetchMeals}/>);
          })
        ) : (
          <h2>There is no Meals</h2>
        )
      }
    </div>
  );
};

export default Meals;