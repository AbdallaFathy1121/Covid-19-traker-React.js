import React, { useState, useEffect } from 'react';

// Material UI
import { FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";

import "./App.css";
import axios from 'axios';

// Components
import InfoBox from './InfoBox';
import Table from './Table';
import { sortData } from './Sort';
import LineGraph from './LineGraph';
import Map from "./Map"

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('Worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCountries, setMapCountries] = useState([]);

  // Map
  const [mapCenter, setMapCenter] = useState({lat: 34.80746 , lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3);

  useEffect (() => {
    const getCountriesData = async () => {
      const {data} = await axios.get("https://disease.sh/v3/covid-19/countries");
      const countries = data.map((country) => (
        {
          name: country.country, // United States, United Kingarom, France
          value: country.countryInfo.iso2, // UK, USA, FR
          id: country.countryInfo._id
        }
      ));

      const sortedData = sortData(data);
      setTableData(sortedData);
      setCountries(countries);
      setMapCountries(data);
    }
    getCountriesData();
  }, [])

  useEffect (() => {
    const allCountry = async () => {
      const {data} = await axios.get("https://disease.sh/v3/covid-19/all");
      setCountryInfo(data);
    }
    allCountry();
  }, []);


  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    const url = countryCode === 'Worldwide' 
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const {data} = await axios.get(url);
    
    setCountry(countryCode);
    setCountryInfo(data);

    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4)

  };


  return (
    <div className="app">

      {/* App Left */}
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>Covid Tracker</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountryChange} value={country}>
              
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              { countries.map(country => (
                <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>

        {/* InfoBox */}
        <div className="app__status">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        {/* Map */}

        <Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />




      </div>

      {/* App Right */}
      <Card className="app__right">
        <CardContent>
          
          {/* Table */}
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />

          {/* Graph */}
          <h3>Worldwide new cases</h3>
          <LineGraph />

        </CardContent>
      </Card>


    </div>
  );
}

export default App;
