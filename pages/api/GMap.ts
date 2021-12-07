import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  lat: string;
  long: string;
};

export default function google(req: NextApiRequest, res: NextApiResponse) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.NEXT_PUBLIC_GOOGLE_API}`;
  axios
    .get(url)
    .then((res) => {
      console.log("API:", res.data.results[0].formatted_address);
      return res.data.results[0].formatted_address;
    })
    .catch((err) => {
      console.log(err);
    });
}
