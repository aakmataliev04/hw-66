import React from 'react';
import './Tracker.css';
import {Link} from 'react-router-dom';
import Meals from '../../components/Meals/Meals';

const Tracker = () => {
  return (
    <div style={{height: '80vh'}}>
      <div className="calories-total">
        <h2 className={'calories-total-title'}>Total calories: <strong>900 kcal</strong></h2>
        <Link to={'/add-meal'} className={'calories-btn'}>Add new meal</Link>
      </div>
      <Meals />
    </div>
  );
};

export default Tracker;