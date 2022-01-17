import moment from 'moment';

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

const majorSort = (cat: string, value: any, arr: any) => {
  let result: any = [];

  if (cat === 'price') {
    const result1 = priceSort(value, arr);
    result = result1;
  } else if (cat === 'distance') {
    const result2 = distanceSort(value, arr);
    result = result2;
  } else if (cat === 'rating') {
    const result3 = ratingSort(value, arr);
    result = result3;
  }

  return result;
}

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
}

const closingTimes = (arr: any) => {
  const d = new Date();
  let day = d.getDay()

  let newArr = arr.filter((item: any) => item.day === day);
  if (newArr.length > 1) {
    newArr = newArr.sort((a: any, b: any) => {
      return b.end - a.end
    })
  }
  return newArr;
}

const dayOfWeek = (arr: any) => {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let newArr: any = [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day:"Thursday"}, {day: "Friday"}, {day: "Saturday"}];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < newArr.length; j++) {
      if (weekday[arr[i].day] === newArr[j].day && !newArr[j].hasOwnProperty('end')) {
        newArr[j].start = moment(arr[i].start, ['HH.mm']).format("hh:mm a");
        newArr[j].end = moment(arr[i].end, ['HH.mm']).format("hh:mm a");
      } else if (weekday[arr[i].day] === newArr[j].day && newArr[j].hasOwnProperty('end')) {
        newArr[j].start2 = moment(arr[i].start, ['HH.mm']).format("hh:mm a");
        newArr[j].end2 = moment(arr[i].end, ['HH.mm']).format("hh:mm a");
      }
    }
  }
  return newArr;
}

export { priceSort, distanceSort, ratingSort, locationSort, getRandomInt, nameFilter, sortZoom, closingTimes, dayOfWeek, majorSort};