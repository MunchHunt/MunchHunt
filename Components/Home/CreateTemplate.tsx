import React, { useState } from 'react';

interface Props {
  tempTemplates: string[];
  setTempTemplates: Function;
}

const CreateTemplate: React.FC<Props> = ({ tempTemplates, setTempTemplates }) => {
  const [typed, setTyped] = useState<string>('');

  const changeHandler = (e: any): void => {
    e.preventDefault();
    setTyped(e.target.value);
  };

  const validator = (): boolean => {
    if (tempTemplates.includes(typed)) {
      return false;
    }
    return true;
  };


  const addTemplate = (e: any): void => {
    e.preventDefault();
    if (validator()) {
      let temp = tempTemplates.slice(0);
      temp.push(typed);
      setTempTemplates(temp);
    } else {
      window.alert('Template name already exists.');
    }
    e.target.reset();
  };


  return (
    <div>
      <h3>Create Template</h3>
      <form onSubmit={(e: any) => addTemplate(e)}>
        <input type="text" placeholder="Enter template name" onChange={(e: any) => changeHandler(e)} />
        <input type="button" onClick={(e: any) => addTemplate(e)} value="Create" />
      </form>
    </div>
  );
};

export default CreateTemplate;