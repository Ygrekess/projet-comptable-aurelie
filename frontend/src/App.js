import { useEffect, useState } from 'react';
import './4-css/App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';
import Auth_Page from './3-pages/Auth_Page';
import User_Dashboard from './3-pages/user_pages/User_Dashboard';
import Declaration_Page from './3-pages/user_pages/Declaration_Page';
import UserInfos_Page from './3-pages/user_pages/UserInfos_Page';

function App() {

/*   const getTest = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/auth/gettest',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        }
      );

      console.log(data)
    } catch (error) {
      console.log(error.response.data)
    }
  } */

  useEffect(() => {
    return () => {
    }
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
        <header className="App-header">
          <Route path='/connexion' component={Auth_Page} />
          <Route path='/dashboard' exact component={User_Dashboard} />
          <Route path='/dashboard/moncompte' component={UserInfos_Page}/>
          <Route path='/dashboard/declaration' component={Declaration_Page}/>
      </header>
    </div>
    </BrowserRouter>
  );
}

export default App;
