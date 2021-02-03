import { useEffect, useState } from 'react';
import './4-css/App.css';
import axios from 'axios';
import Auth_Page from './3-pages/Auth_Page';

function App() {

  const getTest = async () => {
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
  }

  useEffect(() => {
    return () => {
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <Auth_Page/>
      </header>
    </div>
  );
}

export default App;
