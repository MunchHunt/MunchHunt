
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
  return i * 1609.344;
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

const sortZoom = (miles: number) => {
  if (miles < 1) {
    return 13
  } else if (miles === 1) {
    return 14
  } else if (miles === 5) {
    return 11
  } else if (miles === 10) {
    return 10
  } else if (miles === 25) {
    return 9
  } else if (miles === 30) {
    return 13
  } else if (miles === undefined) {
    return 13
  }
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
  const newArr: any = [];

  arr.forEach((rest: any) => {
    newArr.push({ lat: rest.coordinates.latitude, lng: rest.coordinates.longitude, name: rest.name, address: rest.location.address1, city: rest.location.city, state: rest.location.state, pic: rest.image_url })
  })

  return newArr;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const closingTimes = (arr: any) => {
  const d = new Date();
  let day = d.getDay()

  const newArr = arr.filter((item: any) => item.day === day);
  return newArr;
}

export { priceSort, distanceSort, ratingSort, locationSort, getRandomInt, nameFilter, sortZoom, closingTimes };