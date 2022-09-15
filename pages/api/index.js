import axios from 'axios';

const url =
  'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng,
        },
        headers: {
          'X-RapidAPI-Key':
            '8e4f287e51msh19c0c441aff9b27p11588bjsn8186c1ed0e55',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com',
        },
      }
    );
    return data;
  } catch (error) {
    console.log(`Fetch data Error : ${error}`);
  }
};
