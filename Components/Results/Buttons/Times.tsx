import React, { AllHTMLAttributes } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Typography, Popover, Button } from '@mui/material';
import { dayOfWeek } from '../sortingFunc';
import styles from '../../../styles/Results/details.module.css';
import { TramRounded } from '@material-ui/icons';

interface TimeProps {
  allTimes: any,
}

const Times: React.FC<TimeProps> = ({ allTimes }) => {
  const [time, setTime] = React.useState<number>(0);
  const [hours, setHours] = React.useState<any>([]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

  React.useEffect(() => {
    if (allTimes.length > 0) {
      const d = new Date();
      let day = d.getDay();
      setTime(day);
      setHours(dayOfWeek(allTimes));
    }
  }, [allTimes])

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setTimeout(() => {
      handlePopoverClose();
    }, 2000)
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={styles.popUpContainer}>
      {hours.length > 0 ? <Button
        className={styles.hourButton}
        aria-describedby={id}
        size="small"
        onClick={handleClick}
      >
        {days[time]} &nbsp; {hours[time].start} - {hours[time].end}
      </Button> : null}
      <Popover
        className={styles.popUp}
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handleClose}
      // disableRestoreFocus
      >
        <div className={styles.popUp}>
          {hours.map((option: any, index: number) => {
            if (option.start2) {
              return (
                <div key={index} className={styles.multipleHoursDiv}>
                  <p className={styles.nameDays}>{option.day}&nbsp;</p>
                  <div className={styles.multipleHours}>
                    <p className={styles.text}> {option.start} - {option.end} </p>
                    <p className={styles.text}> {option.start2} - {option.end2}</p>
                  </div>
                </div>
              )
            } else if (!option.start && !option.end) {
              return (
                <div key={index} className={styles.multipleHoursDiv}>
                  <p className={styles.nameDays} key={index}>
                    {option.day} &nbsp;
                  </p>
                  <div className={styles.multipleHours}>
                    <p className={styles.text}>Closed</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div key={index} className={styles.multipleHoursDiv}>
                <p className={styles.nameDays} key={index}>
                  {option.day} &nbsp;
                </p>
                <div className={styles.multipleHours}>
                <p className={styles.text}> {option.start} - {option.end} </p>
                </div>
              </div>
              )
            }
          })}
        </div>
      </Popover>
    </div>
  )
}

export default Times;

{/* <FormControl variant="standard" sx={{ minWidth: 100 }}>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={time}
          onChange={handleChange}
          label="time"
        >
          {hours.map((option: any, index: number) => {
            if (option.start2) {
              return (
              <MenuItem key={index} value={index}>
                {option.day} &nbsp; {option.start} - {option.end} <br /> {option.start2} - {option.end2}
              </MenuItem>
              )
            } else if (!option.start && !option.end) {
              return (
                <MenuItem key={index} value={index}>
                  {option.day} &nbsp; Closed
                </MenuItem>
                )
            } else {
              return (
                <MenuItem key={index} value={index}>
                  {option.day} &nbsp; {option.start} - {option.end}
                </MenuItem>
                )
            }
          })}
        </Select>
      </FormControl> */}