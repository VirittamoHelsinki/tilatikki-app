import React from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import jatkasaariKoulu from '../images/jatkasaari-koulu.png';
import pakilaKoulu from '../images/pakila-koulu.jpg';
import { useSchoolQuery } from '../api/query';

const cardData = [
  {
    title: 'Pakilan peruskoulu',
    description: 'Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa',
    image: pakilaKoulu,
    link: '/reservations'
  },
  {
    title: 'Jätkäsaaren peruskoulu',
    description: 'Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa',
    image: jatkasaariKoulu,
    link: '/reservations'
  },
];

const SchoolsPage = () => {
  const navigate = useNavigate();

  const { data: schools, isLoading, isError } = useSchoolQuery();

  React.useEffect(() => console.log(
    'schools: ', schools
  ), [])

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(card.link)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                    <CardMedia sx={{ marginTop: 4 }}
                      component="img"
                      height="140"
                      image={card.image}
                      alt={card.title}
                    />
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default SchoolsPage;
