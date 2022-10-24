import {useState} from 'react'
import { Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const AboutPage = () => {

  const [value, setValue] = useState()
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs>
          <Card sx={{ maxWidth: 345, boxShadow: '2px 2px 2px 2px' }}>
            <CardMedia
              component="img"
              height="300"
              image="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.6435-9/57882452_2209306425826877_1312770497917747200_n.jpg?stp=dst-jpg_p206x206&_nc_cat=111&ccb=1-7&_nc_sid=da31f3&_nc_ohc=OAU1FT9fjbEAX_5YaSu&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT_9FllYLd1iNYzOwlIIlTxvWIz0y_VM9byNH9dJk6qnDQ&oe=637D03C6"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dev Kien
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We call him as 'King of Deploy'. Everything, he want to delpoy all of them.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ maxWidth: 345 , boxShadow: '2px 2px 2px 2px' }}>
            <CardMedia
              component="img"
              height="300"
              image="https://scontent.fsgn2-1.fna.fbcdn.net/v/t1.6435-9/107816530_3344577895581920_4040222147907326491_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=730e14&_nc_ohc=P0R5RAqnuDAAX9XBFKY&_nc_ht=scontent.fsgn2-1.fna&oh=00_AT8qAp9Ecbgs2f1qB8FQbbxeG72281qYm_RUF_R98r8U6Q&oe=637CF7B7"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dev Tho
              </Typography>
              <Typography variant="body2" color="text.secondary">
                He is a leader of project. We call him as 'King of Ban Lui'. His duty is design FE.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs>
          <Card sx={{ maxWidth: 345 , boxShadow: '2px 2px 2px 2px' }}>
            <CardMedia
              component="img"
              height="300"
              image="https://scontent.fsgn2-5.fna.fbcdn.net/v/t31.18172-8/10620167_361080367397515_7756938132430301547_o.jpg?_nc_cat=104&ccb=1-7&_nc_sid=e3f864&_nc_ohc=EVqTI_F59w4AX_W6ybV&tn=NwH7Nw4lK1Z3-o0z&_nc_ht=scontent.fsgn2-5.fna&oh=00_AT9OC9Q85yPaK2YQXuiJjPth7epskdYjbVK_Ha12hVA5Wg&oe=637A8536"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Dev Son
              </Typography>
              <Typography variant="body2" color="text.secondary">
                We call him as 'King of Game'. Most of the games on our website are designed by him.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AboutPage;
