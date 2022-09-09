import { Box } from '@chakra-ui/react';
import React from 'react';
import GoogleMapReact from 'google-map-react';

function Map({ coordinates, setCoordinates, setBounds }) {
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
        onChildClick={() => {}}
      ></GoogleMapReact>
    </Box>
  );
}
export default Map;
