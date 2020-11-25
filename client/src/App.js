import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './containers/Login/Login';
import AppScreen from './containers/AppScreen/AppScreen';
import axios from 'axios';
import Spinner from './components/Spinner/Spinner';
function App() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/fetchUser/');
      console.log(res);
      setUser(res.data.user);
    } catch (er) {
      console.log(er);
    }
    setLoading(false);
  };

  const logoutHandler = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/v1/logout/');
      console.log(res);
      setUser(null);
    } catch (er) {
      console.log(er);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  let el = <Login setUser={setUser} />;
  if (loading) {
    el = <Spinner />;
  } else if (user) {
    el = <AppScreen user={user} logoutHandler={logoutHandler} />;
  }
  return <div className="App">{el}</div>;
}

export default App;
