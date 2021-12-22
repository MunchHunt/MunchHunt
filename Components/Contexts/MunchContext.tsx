import React, { useState, createContext, useContext, useEffect } from 'react';

interface Coords {
  lat: string;
  long: string;
}

export const MunchContext = createContext(
  {
    isLoggedIn: false,
    setIsLoggedIn: (loggedIn: boolean) => { },
    currAddress: '',
    setCurrAddress: (location: string) => { },
    currCoords: { lat: '', long: '' },
    setCoords: (coords: Coords) => { },
    tempTemplates: [{
      name: '',
      location: {
        lat: '',
        long: ''
      },
      choices: [
        ''
      ]
    }],
    setTempTemplates: (templates: any) => { },
    result: '',
    setResult: (result: string) => { },
    currChoices: ['', '', '', '', '', ''],
    setCurrChoices: (choices: string[]) => { },
  });

export const MunchProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currAddress, setCurrAddress] = useState<string>('');
  const [currCoords, setCoords] = useState<Coords>({ lat: '', long: '' });
  const [tempTemplates, setTempTemplates] = useState<any>([]);
  const [result, setResult] = useState<string>("");
  const [currChoices, setCurrChoices] = useState<string[]>(['', '', '', '', '', '']);

  const store = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: (loggedIn: boolean): void => {
      setIsLoggedIn(loggedIn);
    },
    currAddress: currAddress,
    setCurrAddress: (location: string): void => {
      setCurrAddress(location);
    },
    currCoords: currCoords,
    setCoords: (coords: Coords): void => {
      setCoords(coords);
      localStorage.setItem('location', JSON.stringify(coords));
    },
    tempTemplates: tempTemplates,
    setTempTemplates: (templates: any): void => {
      setTempTemplates(templates);
    },
    result: result,
    setResult: (result: string): void => {
      setResult(result);
    },
    currChoices: currChoices,
    setCurrChoices: (choices: string[]): void => {
      setCurrChoices(choices);
    }
  };

  useEffect(() => {
    let cachedCoords = localStorage.getItem('location');
    if (cachedCoords) {
      setCoords(JSON.parse(cachedCoords));
    }
  }, [])

  return (
    <MunchContext.Provider value={store}>
      {children}
    </MunchContext.Provider>
  );
};

export const useMunchContext = () => {
  return useContext(MunchContext);
}