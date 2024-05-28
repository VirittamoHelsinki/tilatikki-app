import React from 'react';
import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const cardData = [
  {
    title: 'Card Title 1',
    description: 'This is the description for card 1.',
    image: 'https://via.placeholder.com/150',
    link: '/link1'
  },
  {
    title: 'Card Title 2',
    description: 'This is the description for card 2.',
    image: 'https://via.placeholder.com/150',
    link: '/link2'
  },
  {
    title: 'Card Title 3',
    description: 'This is the description for card 3.',
    image: 'https://via.placeholder.com/150',
    link: '/link3'
  }
];

const SchoolsPage = () => {
  const navigate = useNavigate();

  const handleCardClick = (link) => {
    navigate(link);
  };

  return (
    <>
    <Header/>
    <Container sx={{ marginTop: 4 }}>
      <Grid container spacing={4}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(card.link)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={card.image}
                  alt={card.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {card.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {card.description}
                  </Typography>
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
