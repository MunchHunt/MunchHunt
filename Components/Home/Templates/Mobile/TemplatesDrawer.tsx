import React, { useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Templates from '../Templates';

interface Props {
  isDrawerOpen: boolean;
  setIsDrawerOpen: Function;
  selectedTemplate: string;
  setSelectedTemplate: Function;
}
const TemplatesDrawer: React.FC<Props> = ({ isDrawerOpen, setIsDrawerOpen, selectedTemplate, setSelectedTemplate }) => {

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
      setIsDrawerOpen(open);
    };

  return (
    <div>
      <SwipeableDrawer
        anchor={'bottom'}
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Templates selectedTemplate={selectedTemplate} setSelectedTemplate={setSelectedTemplate} />
      </SwipeableDrawer>
    </div>
  );
};

export default TemplatesDrawer;