import axios from 'axios';

export default async function handler(req:any, res:any){
  console.log('in here');
  const config = {
    headers:
    { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}`}
  }
  try {
    const data = await axios.get('https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972', config)
    res.status(200).json(data)
  } catch (error) {
    console.log(error);
  }
}