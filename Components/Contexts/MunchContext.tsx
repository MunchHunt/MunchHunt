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
    userTemplates: [{
      name: '',
      location: {
        lat: '',
        long: ''
      },
      choices: [
        ''
      ]
    }],
    setUserTemplates: (templates: any) => { },
    result: '',
    setResult: (result: string) => { },
    currChoices: ['', '', '', '', '', ''],
    setCurrChoices: (choices: string[]) => { },
    isDrawerOpen: false,
    setIsDrawerOpen: (bool: boolean) => { },
    userEmail: '',
    setUserEmail: (email: string) => { },
    selectedTemplate: '',
    setSelectedTemplate: (template: string) => { },
    input1: '',
    setInput1: (input: string) => { },
    input2: '',
    setInput2: (input: string) => { },
    input3: '',
    setInput3: (input: string) => { },
    input4: '',
    setInput4: (input: string) => { },
    input5: '',
    setInput5: (input: string) => { },
    input6: '',
    setInput6: (input: string) => { },
  });

const {
  UpdateUserData,

} = require('../../pages/api/userAuth');

export const MunchProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currAddress, setCurrAddress] = useState<string>('');
  const [currCoords, setCoords] = useState<Coords>({ lat: '', long: '' });
  const [result, setResult] = useState<string>("");
  const [currChoices, setCurrChoices] = useState<string[]>(['', '', '', '', '', '']);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [userTemplates, setUserTemplates] = useState<any>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [input1, setInput1] = useState<string>("");
  const [input2, setInput2] = useState<string>("");
  const [input3, setInput3] = useState<string>("");
  const [input4, setInput4] = useState<string>("");
  const [input5, setInput5] = useState<string>("");
  const [input6, setInput6] = useState<string>("");

  useEffect(() => {
    // let login = localStorage.getItem('munchLogin');
    // let templates = localStorage.getItem('userTemplates');

    // if (login) {
    //   setIsLoggedIn(JSON.parse(login));
    // }
    // if (templates) {
    //   setUserTemplates(JSON.parse(templates));
    // }
  }, [])

  useEffect(() => {
    if (userEmail.length && userTemplates.length) {
      UpdateUserData(userEmail, userTemplates)
        .then((res: any) => {
          console.log('Templates updated on database', res);
        })
        .catch((err: any) => {
          console.log('Failed to update templates on database', err);
        })
    }
  }, [userTemplates])

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
    userTemplates: userTemplates,
    setUserTemplates: (templates: any): void => {
      setUserTemplates(templates);
      // localStorage.setItem('userTemplates', JSON.stringify(templates));
    },
    result: result,
    setResult: (result: string): void => {
      setResult(result);
    },
    currChoices: currChoices,
    setCurrChoices: (choices: string[]): void => {
      setCurrChoices(choices);
    },
    isDrawerOpen: isDrawerOpen,
    setIsDrawerOpen: (bool: boolean): void => {
      setIsDrawerOpen(bool);
    },
    userEmail: userEmail,
    setUserEmail: (email: string): void => {
      setUserEmail(email);
    },
    selectedTemplate: selectedTemplate,
    setSelectedTemplate: (template: string): void => {
      setSelectedTemplate(template);
    },
    input1: input1,
    setInput1: (input: string): void => {
      setInput1(input);
    },
    input2: input2,
    setInput2: (input: string): void => {
      setInput2(input);
    },
    input3: input3,
    setInput3: (input: string): void => {
      setInput3(input);
    },
    input4: input4,
    setInput4: (input: string): void => {
      setInput4(input);
    },
    input5: input5,
    setInput5: (input: string): void => {
      setInput5(input);
    },
    input6: input6,
    setInput6: (input: string): void => {
      setInput6(input);
    },
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