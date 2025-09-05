import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const MODEL_ENDPOINT = 'MODEL_ENDPOINT/VERSION';

export const fetchSuryaInfo = async (imageUrl) => {
  try {
    const response = await axios.post(
      `https://detect.roboflow.com/${MODEL_ENDPOINT}`,
      {
        params: { api_key: API_KEY, image: imageUrl },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching Surya Namaskar data:', error);
    throw error;
  }
};
