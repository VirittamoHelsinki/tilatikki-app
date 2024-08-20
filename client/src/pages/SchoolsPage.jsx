import React from 'react';
//import { Container, Grid, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Container } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import jatkasaariKoulu from '../images/jatkasaari-koulu.jpeg';
import pakilaKoulu from '../images/pakila-koulu.jpg';
import { useAllSchoolsQuery } from '../api/schools';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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

        <div className="grid xl:grid-cols-4 lg:grid-cols-3 gap-4">
          {
            cardData.map((card, index) => (
              <Card className="hover:shadow-md cursor-pointer" key={index} onClick={() => handleCardClick(card.link)}>
                <CardHeader>
                  <CardTitle>{ card.title }</CardTitle>
                  <CardDescription>{ card.description }</CardDescription>
                </CardHeader>
                <CardContent>
                  <img
                    className="object-cover bg-gray-500 rounded-lg w-full"
                    style={{ aspectRatio: "3 / 1" }}
                    src={card.image}
                    alt="school"
                  />
                </CardContent>
              </Card>
            ))
          }
        </div>


      </Container>
    </>
  );
};

export default SchoolsPage;
