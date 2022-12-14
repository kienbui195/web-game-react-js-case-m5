import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// @mui
import { Grid, Container, Typography, Card, CardMedia, CardContent, CardActions, Button } from '@mui/material';
// components
// sections
import { AppWidgetSummary } from '../sections/@dashboard/app';


// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const navigate = useNavigate();
  const handleGame = (action) => {
    switch (action) {
      case 'quiz':
        navigate('/dashboard/quiz');
        break;
      case 'casino':
        navigate('/dashboard/casino');
        break;
      case 'Rock Paper Scissors':
        navigate('/dashboard/RockPaperScissors');
        break;

      default:
    }
  };
  const user = JSON.parse(localStorage.getItem('user'));
  const sendUser = async () => {
    const result = await axios.request({
      url: ' https://webgame395group.herokuapp.com/api/sendUser',
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      data: JSON.stringify({
        email: user.email,
        code: user.code,
      }),
    })
    return result
  }


  const handleSendUser = () => {
    sendUser().then(res =>{
      console.log(res)
    }).catch(err => console.log(err.message))
  }
  return (
    <>
      <Helmet>
        <title> Home | Webgame 395 </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              sx={{ boxShadow: '1px 1px 1px 1px' }}
              title="Number of visitors in this week"
              total={333}
              icon={'ant-design:android-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              sx={{ boxShadow: '1px 1px 1px 1px' }}
              title="New Users"
              total={51}
              color="info"
              icon={'ant-design:apple-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              sx={{ boxShadow: '1px 1px 1px 1px' }}
              title="Online"
              total={123}
              color="success"
              icon={'ant-design:windows-filled'}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary
              sx={{ boxShadow: '1px 1px 1px 1px' }}
              title="Bug Reports"
              total={15}
              color="error"
              icon={'ant-design:bug-filled'}
            />
          </Grid>
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <Typography variant="h4" sx={{ mb: 5, mt: 5 }}>
            Play Game <icon />
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs>
              <Card sx={{ maxWidth: 300, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  alt="green iguana"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6isTF3XzdcVWO0dC-aRCf4DOEKahNZE8nLw&usqp=CAU"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    ????? vui c?? th?????ng (y)
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tr??? l???i c??c c??u h???i ????? nh???n ???????c ??i???m th?????ng t??? ban t??? ch???c.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" onClick={() => handleGame('quiz')}>
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ maxWidth: 345, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  alt="green iguana"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8I9TC3hsnSaXjfYvM3O1fCiKGxlbNanU7VQ&usqp=CAU"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Casino
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    M???t tr?? ch??i c???n c??? s??? may m???n, k??? n??ng v?? c??? tay to m???i c??n ???????c.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" onClick={() => handleGame('casino')}>
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ maxWidth: 345, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  alt="green iguana"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTeOugG3kBMEAgp2QXX1UnDz4ejMexV8Km2A&usqp=CAU"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Game Huy???n Tho???i
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Bao B??a K??o! Con game huy???n tho???i. M??nh ch??i game ?????ng ????? game ch??i m??nh.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" onClick={() => handleGame('Rock Paper Scissors')}>
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 5 }}>
            <Grid item xs>
              <Card sx={{ maxWidth: 300, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkcc5vlg42EGEUfC3jvRm651oyCrf-p4H0zg&usqp=CAU"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    2048
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    M???t trong nh???ng d??ng game casual huy???n tho???i. C??ng ch??i c??ng nghi???n.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button onClick={handleSendUser} size="small" href="https://monicatvera.github.io/2048/">
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ maxWidth: 345, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  alt="green iguana"
                  image="https://reactjsexample.com/content/images/2022/07/56e2e706e67.png"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    C??? Vua
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Huy???n tho???i c??? vua c???a tu???i th?? nay ???? c?? tr??n web 395.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" href="https://react-chess-eight.vercel.app">
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs>
              <Card sx={{ maxWidth: 345, boxShadow: '1px 1px 1px 1px' }}>
                <CardMedia
                  component="img"
                  height="150"
                  alt="green iguana"
                  image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd6W43T-TnBN5Y15Q7yfOotFGM0mrKJN6EHA&usqp=CAU"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Tr?? ch??i to??n h???c
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ?????c m?? tr??? th??nh th???n ?????ng to??n h???c c???a b???n ???? g???n ngay tr?????c m???t n???a.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small" href="https://62c7ec70d8878e5e65167a25--stellar-genie-4ac9ea.netlify.app">
                    Play Game
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
