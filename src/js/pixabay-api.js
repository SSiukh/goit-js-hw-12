import axios from 'axios';

export default async function getImageApi(keyword, page) {
  const apiKey = '32946561-6d99391fd6ee776d2dee61275';

  try {
    const result = await axios.get('https://pixabay.com/api/', {
      params: {
        key: apiKey,
        q: keyword,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page,
      },
    });

    return result.data;
  } catch (error) {
    console.log(error);
  }
}
