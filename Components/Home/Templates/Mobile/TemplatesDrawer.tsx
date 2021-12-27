import React, { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Templates from '../Templates';

interface Props {
  isOpen: boolean;
  setIsOpen: Function;
  selectedTemplate: string;
  setSelectedTemplate: Function;
}
const TemplatesDrawer: React.FC<Props> = ({ isOpen, setIsOpen, selectedTemplate, setSelectedTemplate }) => {

  const toggleDrawer = (open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setIsOpen(open);
    };

  return (
    <div>
      <SwipeableDrawer
        anchor={'bottom'}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Templates selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
      </SwipeableDrawer>
    </div>
  );
};

export default TemplatesDrawer;