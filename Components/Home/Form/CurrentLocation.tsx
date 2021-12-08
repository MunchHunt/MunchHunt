import * as React from 'react';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { Typography, Popover, IconButton } from '@mui/material';
import styles from '../../../styles/Home/Location.module.css';

interface Props {
  getCurrentPosition: any;
}

const CurrentLocation: React.FC<Props> = ({ getCurrentPosition }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <IconButton className={styles.currLocationBtn} onClick={getCurrentPosition}>
          <MyLocationIcon />
        </IconButton>
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Get current location</Typography>
      </Popover>
    </div>
  );
}

export default CurrentLocation;