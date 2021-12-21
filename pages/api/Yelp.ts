import axios from "axios";

export default async function handler(req: any, res: any) {
  const id = req.query.id;
  const config = {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_YELP_API}` },
  };
  try {
    const data = await axios.get(
      `https://api.yelp.com/v3/businesses/${id}`,
      config
    );
    res.send(data.data);
  } catch (error) {
    console.log(error);
    res.status(405).end();
  }
}
