import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Details from '../results/Details';
import GoogleMaps from '../Map/GoogleMaps';

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 0 }}>
          <div>{ children }</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index:any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props: any) {
  const maps = props.maps;
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue:any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Map" {...a11yProps(0)} />
          <Tab label="Details" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <GoogleMaps defaultZoom={maps.defaultZoom} localRestaurants={maps.localRestaurants} defaultCenter={{ lat: maps.defaultCenter.lat, lng: maps.defaultCenter.lng }} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Details details={props.details}/>
      </TabPanel>
    </Box>
  );
}