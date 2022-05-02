import React, { useState, useEffect } from 'react'
import { Grid, CssBaseline } from '@material-ui/core'

import Header from './components/Header/Header'
import Map from './components/Map/Map'
import List from './components/List/List'
import { getPlacesData, getWeatherData } from './api/index'

const App = () => {

  const [places, setPlaces] = useState([])
  const [filterPlaces, setFilterPlaces] = useState([])

  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
  const [bounds, setBounds] = useState({})
  const [childClicked, setChildClicked] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [type, setType] = useState('restaurants')
  const [rating, setRating] = useState(0)
  const [weatherData, setWeatherData] = useState([])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude })
    })
  }, [])

  useEffect(() => {
    const filterPlaces = places.filter((place) => place.rating > rating)
    setFilterPlaces(filterPlaces)
  }, [rating])

  useEffect(() => {
    if (bounds.ne && bounds.sw) {
      setIsLoading(true)

      getWeatherData(coordinates.lat, coordinates.lon)
        .then((data) => setWeatherData(data))

      getPlacesData(type, bounds.ne, bounds.sw)
        .then((data) => {
          setPlaces(data?.filter((place) => place.name && place.num_reviews > 0))
          setFilterPlaces([])
          setRating(0)
          setIsLoading(false)
        })
    }
  }, [bounds, type])


  return (
    <>
      <CssBaseline />
      <Header
        setCoordinates={setCoordinates}
      />
      <Grid container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={4}>
          <List
            places={filterPlaces.length ? filterPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            setChildClicked={setChildClicked}
            coordinates={coordinates}
            places={filterPlaces.length ? filterPlaces : places}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default App