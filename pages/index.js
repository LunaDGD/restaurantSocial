import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import List from '../components/List';
import Map from '../components/Map';
import PlaceDetail from '../components/PlaceDetail';
import { getPlacesData } from './api';

const places = [
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
  { name: 'sample place 1' },
];

function Home() {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState(null);
  const [type, setType] = useState('restaurants');
  const [ratings, setRatings] = useState('');
  const [isLoading, setisLoading] = useState(false);

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
    setisLoading(true);
    getPlacesData(bounds?.sw, bounds?.ne).then((data) => {
      console.log(data);
      setPlaces(data);
      setisLoading(false);
    });
  }, [coordinates, bounds]);

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
      <List places={places} isLoading={isLoading} />

      <Map
        setCoordinates={setCoordinates}
        coordinates={coordinates}
        setBounds={setBounds}
      />
    </Flex>
  );
}

export default Home;
