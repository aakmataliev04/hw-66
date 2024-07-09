import React from 'react';
import Meal from './Meal/Meal';

const Meals = () => {
  return (
    <div className={'meals-list'}>
      <Meal />
      <Meal />
    </div>
  );
};

export default Meals;