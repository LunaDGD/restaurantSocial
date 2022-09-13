import { Box } from '@chakra-ui/react';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import { IoLocation } from 'react-icons/io5';
import { useState } from 'react';

function Map({ coordinates, setCoordinates, setBounds, places }) {
  // const [isCard, setIsCard] = useState(false);
  // const [cardData, setCardData] = useState(null);
  return (
    <Box width={'full'} height={'full'}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyDJxvWap7b2i4LcWXW4o_LLXRbO1Z4ML84' }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={12}
        margin={[50, 50, 50, 50]}
        options={''}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          console.log(child);
        }}
      >
        {places?.map((place, i) => (
          <Box
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            position={'relative'}
            cursor="pointer"
          >
            <IoLocation color="red" fontSize={30} />
          </Box>
        ))}
      </GoogleMapReact>
    </Box>
  );
}
export default Map;
