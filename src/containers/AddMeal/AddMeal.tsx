import React, {ChangeEvent, FormEvent, useCallback, useEffect, useState} from 'react';
import {MealApi} from '../../types';
import './AddMeal.css';
import {useNavigate, useParams} from 'react-router-dom';
import axiosApi from '../../axiosApi';
import ButtonSpinner from '../../components/ButtonSpinner/ButtonSpinner';
import {toast} from 'react-toastify';

const AddMeal = () => {
  const [mealMutation, setMealMutation] = useState<MealApi>({
    mealTime: 'Breakfast',
    mealDescription: '',
    calories: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {id } = useParams();

  const fetchMeal = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      const {data: loadedMeal} = await axiosApi.get<MealApi>(`/meals/${id}.json`);

      if (loadedMeal !== null) {
        setMealMutation(loadedMeal);
        setIsLoading(false);
      }
    }
  }, [id]);
  useEffect(() => {
    void fetchMeal();
  }, [fetchMeal]);

  const onFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const {name, value} = event.target;
    setMealMutation((prevState) => {
      return {...prevState, [name]: value};
    });
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const meal = {...mealMutation};
    try {
      if (id !== undefined) {
        await axiosApi.put(`/meals/${id}.json`, meal);
        toast.success('Meal successfully edited!', {theme: 'dark'});
      } else {
        await axiosApi.post('/meals.json', meal);
        toast.success('Meal successfully created!', {theme: 'dark'});
      }
    } catch (e) {
      toast.error('Something went wrong!', {theme: 'dark'});
    } finally {
      setIsLoading(false);
      !id && navigate('/');
    }
  };


  const form = (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <select
          className={'form-control'}
          onChange={onFieldChange}
          name={'mealTime'}
          value={mealMutation.mealTime}>
          <option value={'Breakfast'}>Breakfast</option>
          <option value={'Snack'}>Snack</option>
          <option value={'Lunch'}>Lunch</option>
          <option value={'Dinner'}>Dinner</option>
        </select>
        <label htmlFor="mealDescription">meal description</label>
        <input
          onChange={onFieldChange}
          value={mealMutation.mealDescription}
          id="mealDescription"
          type="text"
          name="mealDescription"
          className="form-control"
          placeholder={'Meal description'}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">calories</label>
        <input
          onChange={onFieldChange}
          min={1}
          type={'number'}
          id="calories"
          name="calories"
          className="form-control"
          placeholder={'Kcal'}
          required
        />
      </div>

      <button type="submit" className="btn" disabled={isLoading}>
        {isLoading && <ButtonSpinner />}
        {id ? 'Edit': 'Create'}
      </button>
    </form>
  );


  return (
    <div className={'container add-container'}>
      <h2>{id ? 'Edit Meal' : 'Add New Meal'}</h2>

      {form}
    </div>
  );
};

export default AddMeal;