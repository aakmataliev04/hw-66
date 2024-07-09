import './App.css';
import Layout from './components/Layout/Layout';
import {Route, Routes} from 'react-router-dom';
import Tracker from './containers/Tracker/Tracker';
import AddMeal from './containers/AddMeal/AddMeal';

function App() {

  return (
    <Layout>
      <Routes>
        <Route path={'/'} element={<Tracker />}></Route>
        <Route path={'/add-meal'} element={<AddMeal />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
