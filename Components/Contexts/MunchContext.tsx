import React, { useState, createContext, useContext, useEffect } from 'react';

interface Coords {
  lat: string;
  long: string;
}

export const MunchContext = createContext(
  {
    isLoggedIn: false,
    setIsLoggedIn: (loggedIn: boolean) => { },
    selectedTemplate: '',
    setSelectedTemplate: (str: string) => { },
    currLocation: '',
    setCurrLocation: (location: string) => { },
    currCoords: { lat: '', long: '' },
    setCoords: (coords: Coords) => { },
    currChoices: [''],
    setCurrChoices: (choices: string[]) => { },
    tempTemplates: [],
    setTempTemplates: (templates: any) => { }
  });

export const MunchProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [currLocation, setCurrLocation] = useState<string>('');
  const [currCoords, setCoords] = useState<Coords>({ lat: '', long: '' });
  const [currChoices, setCurrChoices] = useState<string[]>(['']);
  const [tempTemplates, setTempTemplates] = useState<any>([]);

  const store = {
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: (loggedIn: boolean): void => {
      setIsLoggedIn(loggedIn);
    },
    selectedTemplate: selectedTemplate,
    setSelectedTemplate: (str: string): void => {
      setSelectedTemplate(str);
    },
    currLocation: currLocation,
    setCurrLocation: (location: string): void => {
      setCurrLocation(location);
    },
    currCoords: currCoords,
    setCoords: (coords: Coords): void => {
      setCoords(coords);
    },
    currChoices: currChoices,
    setCurrChoices: (choices: string[]): void => {
      setCurrChoices(choices);
    },
    tempTemplates: tempTemplates,
    setTempTemplates: (templates: any): void => {
      setTempTemplates(templates);
    }
  };

  return (
    <MunchContext.Provider value={store}>
      {children}
    </MunchContext.Provider>
  );
};

export const useMunchContext = () => {
  return useContext(MunchContext);
}