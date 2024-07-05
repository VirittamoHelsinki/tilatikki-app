import React from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import jatkasaariKoulu from '../images/jatkasaari-koulu.png';
import pakilaKoulu from '../images/pakila-koulu.jpg';
import { useAllSchoolsQuery } from '../api/schools';

const cardData = [
  {
    title: 'Pakilan peruskoulu',
    description: 'Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa',
    image: pakilaKoulu,
    link: '/reservations/6666fdca9786f9616159b55f'
  },
  {
    title: 'Jätkäsaaren peruskoulu',
    description: 'Kolmikerroksinen koulurakennus, jossa on noin 150 opetustilaa',
    image: jatkasaariKoulu,
    link: '/reservations/6666fe689786f9616159b57a'
  },
];

const SchoolsPage = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useAllSchoolsQuery();
  React.useEffect(() => {
    console.log('schools:', data);
    if (error) {
      console.error('Error fetching schools:', error);
    }
  }, [data, error]);

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <>
      <Header />
      <Container sx={{ marginTop: 4 }} maxWidth={false}>
        <Grid justifyContent="flex-start" container spacing={4}> {/* Adjust justifyContent */}
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Card>
                <CardActionArea onClick={() => handleCardClick(card.link)}>
                  <CardContent >
                    <Typography gutterBottom variant="h5" component="div">
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.description}
                    </Typography>
                    <CardMedia
                      component="img"
                      height="140"
                      image={card.image}
                      alt={card.title}
                      sx={{ paddingTop: '24px' }}
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
