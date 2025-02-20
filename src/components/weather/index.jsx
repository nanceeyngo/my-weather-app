import React from 'react';
import Search from '../search';
import { useState, useEffect } from 'react';

const Weather = () => {
    const [parentSearch, parentSetSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    async function fetchWeatherData(param) {
        setLoading(true);
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=b855ea1cde871fe061ef49b91c08ee51`
            );
            if(response.ok){
                const data = await response.json();
                setWeatherData(data);
                setLoading(false);
            } else{
                setErrorMessage('City not found!');
                setLoading(false);
            }
        } catch (error) {

            console.log(error);
        }
    }

    const parentHandleSearch = async () => {
        fetchWeatherData(parentSearch)
    };

    const parentHandleKeyDown = (event) => {
        if (event.key === 'Enter') {
            parentHandleSearch();
        }
    };

    const getCurrentDate = () => {
        return new Date().toLocaleDateString('en-us', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })
    }

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              position => {
                const { latitude, longitude } = position.coords;
                fetchWeatherData(latitude, longitude);
              },
              error => {
                setError('Unable to retrieve your location');
                setLoading(false);
                console.log(error)
              }
              
            );
          } else {
            fetchWeatherData('nigeria');
            setLoading(false);
          }
    }, []);

    // useEffect(() => {
    //     fetchWeatherData('nigeria');
    // }, []);


    // console.log(weatherData);

    return (
        <>
            <div className='weather-container'>
                <Search
                    search={parentSearch}
                    setSearch={parentSetSearch}
                    handleSearch={parentHandleSearch}
                    handleKeyDown={parentHandleKeyDown}
                />

                {loading ? <div className='loading'>Loading...</div> : errorMessage ? <div className='error-message'>{errorMessage}</div> :
                    <div className='weather-data'>
                        <div className='city-name'>
                            <h2>{weatherData?.name}, <span>{weatherData?.sys?.country}</span></h2>
                        </div>
                        <div className='date'>
                            <span>{getCurrentDate()}</span>
                        </div>

                        <p className='temp'>{weatherData?.main.temp}</p>
                        <p className='description'>{weatherData && weatherData.weather && weatherData.weather[0] ? weatherData.weather[0].description : ''}
                        </p>

                        <div className='weather-info'>
                            <div className='column'>
                                <p className='wind'>{weatherData?.wind?.speed}</p>
                                <p>Wind Speed</p>
                            </div>

                            <div className='column'>
                                <p className='wind'>{weatherData?.main?.humidity}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                    </div>

                }
                
            </div>
        </>
    );
};

export default Weather;
