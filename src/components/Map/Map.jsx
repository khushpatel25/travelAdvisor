import React from 'react'
import GoogleMapReact from 'google-map-react'
import {Paper,Typography,useMediaQuery} from '@material-ui/core' 
import { LocationOnOutlined } from '@material-ui/icons'
import { Rating } from '@material-ui/lab'

import useStyles from './style'
import mapStyles from './mapStyles'

const Map = ({coordinates,setCoordinates,setBounds,setChildClicked,places,weatherData}) => {

  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
      defaultCenter={coordinates}
      center={coordinates}
      defaultZoom={14}
      margin={[50,50,50,50]}
      options={{disableDefaultUI: true,zoomControl:true,styles:mapStyles}}
      onChildClick={(child) => setChildClicked(child)}
      onChange={(e)=>{
        setCoordinates({lat: e.center.lat, lon: e.center.lng})
        setBounds({ne:e.marginBounds.ne,sw:e.marginBounds.sw})
      }}
      >
        {places?.map((place,i)=>(
          <div
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {
              isMobile ? (
                <LocationOnOutlined color='primary' fontSize='large'/>
              ) : (
                <Paper elevation={3} className={classes.paper}>
                  <Typography gutterBottom className={classes.typography} variant='subtitle2'>{place.name}</Typography>
                  <img
                    className={classes.pointer}
                    src={place?.photo ? place?.photo?.images?.large?.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                    alt={place.name}
                  />
                  <Rating size='small' value={Number(place.rating)} readOnly/>
                </Paper>
              )
            }
          </div>
        ))}
        {weatherData?.list?.map((data,i)=>(
          <div key={i} lat={Number(data?.coord?.lat)} lon={Number(data?.coord?.lon)}>
            <img height={100} src={`https://openweathermap.org/img/w/${data?.weather[0]?.icon}.png`} alt='weather img'/>
          </div>
        ))}
      </GoogleMapReact>
    </div>
  )
}

export default Map