import React, {useState, useEffect} from 'react';

import {Countries} from './components/Countries';
import { Pagination } from './components/Pagination';

import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  useEffect(() => {
    const getCountries = async () => {
      setLoading(true);
      // const res = await fetch('https://restcountries.com/v3.1/all', {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      const res = await fetch('https://restcountries.com/v3.1/all');  // более короткая запись, т.к. GET и 'Content-Type': 'application/json' - стоят по умолчанию
      const data = await res.json();
      // console.log(data);

      setCountries(data);
      setLoading(false);
    };

    getCountries();
  }, []);

  const lastCountryIndex = currentPage * countriesPerPage;
  const firstCountryIndex = lastCountryIndex - countriesPerPage;
  const currentCountry = countries.slice(firstCountryIndex, lastCountryIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(countries.length / countriesPerPage)) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(prev => prev - 1);
    }
  };


  return (
    <div className="container mt-5">
      <h1 className='text-primary'>Countries</h1>
      <Countries countries={currentCountry} loading={loading} />
      <Pagination 
        countriesPerPage={countriesPerPage} 
        totalCountries={countries.length}
        paginate={paginate} />

      <button className='btn btn-primary' onClick={prevPage} >Prev Page</button>
      <button className='btn btn-primary ms-2' onClick={nextPage} >Next Page</button>
    </div>
  );
}

export default App;