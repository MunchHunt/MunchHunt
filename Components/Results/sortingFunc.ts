
const priceSort = (cost: string, arr: any) => {
  if (cost === 'all') {
    return arr;
  }
  const newArr = arr.filter((item: any) => item.price === cost);
  return newArr;
}

const nameFilter = (name: string, arr: any) => {
  const newArr = arr.filter((item: any) => item.name === name);
  return newArr;
}

const getMeters = (i: number) => {
  return i*1609.344;
}

const distanceSort = (miles: number, arr: any) => {
  if (miles === 30) {
    return arr;
  }
  const converted = getMeters(miles);
  let newArr = arr.filter((item: any) => item.distance <= converted);
  newArr = newArr.sort((a: any, b: any) => {
    return b.distance - a.distance
  })
  return newArr;
}

const ratingSort = (star: number, arr: any) => {
  if (star === 6) {
    return arr;
  }
  const half = star + 0.5;

  const newArr = arr.filter((item: any) => item.rating === star || item.rating === half);
  return newArr;
}

const locationSort = (arr: any) => {
  const newArr: any= [];

  arr.forEach((rest: any) => {
    newArr.push({lat: rest.coordinates.latitude, lng: rest.coordinates.longitude, name: rest.name, address: rest.location.address1, pic: rest.image_url})
  })

  return newArr;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}


export { priceSort, distanceSort, ratingSort, locationSort, getRandomInt, nameFilter };