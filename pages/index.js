import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Friends from '../components/Friends';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import PlaceDetail from '../components/PlaceDetail';
import { getPlacesData } from './api';

function Home() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState('restaurants');
  const [ratings, setRatings] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    // get the users current location on intial login

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude });
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    const filterData = places.filter((place) => place.rating > ratings);
    setFilteredPlaces(filterData);
    console.log({ ratings });
  }, [ratings]);

  useEffect(() => {
    setisLoading(true);
    getPlacesData(type, bounds?.sw, bounds?.ne).then((data) => {
      console.log(data);
      setPlaces(data);
      setisLoading(false);
    });
  }, [type, coordinates, bounds]);

  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={'100vw'}
      height={'100vh'}
      maxWidth={'100vw'}
      maxHeight={'100vh'}
      position={'relative'}
    >
      <Header
        setType={setType}
        setRatings={setRatings}
        setCoordinates={setCoordinates}
      />
      <List
        places={filteredPlaces.length ? filteredPlaces : places}
        isLoading={isLoading}
      />

      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
        places={filteredPlaces.length ? filteredPlaces : places}
      />
      <Friends />
    </Flex>
  );
}

export default Home;
