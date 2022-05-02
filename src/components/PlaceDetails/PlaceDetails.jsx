import React from 'react'
import { Box,Chip,Card,CardContent,CardActions,CardMedia,Typography,Button } from '@material-ui/core'
import {  LocationOnRounded ,PhoneRounded} from '@material-ui/icons'
import { Rating } from '@material-ui/lab'

import useStyles from './style'

const PlaceDetails = ({place,selected,refProps}) => {

  const classes = useStyles()

  if(selected) refProps?.current?.scrollIntoView({behavior:'smooth',block:'start'})

  return (
    <Card elevation={6}>
      <CardMedia 
        component='img'
        height="350"
        title={place.name}
        image={place?.photo ? place?.photo?.images?.large?.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
      />
      <CardContent>
        <Typography gutterBottom variant='h5'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place?.rating)} readOnly/>
          <Typography gutterBottom variant='subtitle1'>Out of {place?.num_reviews} reviews</Typography>
        </Box>
        {place.price && (
          <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Price</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.price}</Typography>
        </Box>
        )}
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle1'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle1'>{place.ranking}</Typography>
        </Box>
        {place?.awards?.map((award)=>(
          <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>
            <img src={award.images.small} alt={award.display_name}/>
            <Typography gutterBottom variant='subtitle2' color='textSecondary'>{award.display_name}</Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({name})=>(
          <Chip className={classes.chip} label={name} size='small' key={name}/>
        ))}
        {place?.address && (
          <Typography gutterBottom varaint='subtitle2' color='textSecondary' className={classes.subtitle}>
            <LocationOnRounded/> {place.address}
          </Typography>
        )}
        {place?.phone && (
          <Typography gutterBottom varaint='subtitle2' color='textSecondary' className={classes.subtitle}>
            <PhoneRounded/> {place.phone}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button size='small' color='primary' onClick={()=> window.open(place.web_url,'_blank')}>
          Travel Advisor
        </Button>
        <Button size='small' color='primary' onClick={()=> window.open(place.website,'_blank')}>
          Website
        </Button>
      </CardActions>
    </Card>
  )
}

export default PlaceDetails