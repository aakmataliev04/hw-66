import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {Meal} from '../../../types';
import './MealsItem.css';
import axiosApi from '../../../axiosApi';
import ButtonSpinner from '../../ButtonSpinner/ButtonSpinner';

interface Props {
  meal: Meal;
  reFetchMeals: VoidFunction;
}

const MealsItem: React.FC<Props> = ({meal, reFetchMeals}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteMeal = async () => {
    try {
      setIsDeleting(true);
      await axiosApi.delete(`/meals/${meal.id}.json`);
    } finally {
      setIsDeleting(false);
      alert('Meal deleted!');
      reFetchMeals();
    }
  };
  return (
    <div className="meal">
      <div className="meal-content">
        <p className={'meal-text'}>{meal.mealTime}</p>
        <h4 className={'meal-title'}>{meal.mealDescription}</h4>
      </div>
      <div className={'meal-control'}>
        <div className={'meal-text'}>{meal.calories} kcal</div>
        <div className="meal-button-wrapper">
          <Link to={`/meals/${meal.id}/edit`} className="meal-btn fill">Edit &gt;&gt;</Link>
          <button onClick={deleteMeal} className="meal-btn outline" disabled={isDeleting}
                  style={{display: 'flex', justifyContent: 'center'}}>{isDeleting ?
            <ButtonSpinner/> : 'Delete'}</button>
        </div>
      </div>
    </div>
  );
};

export default MealsItem;