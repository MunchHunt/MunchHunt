import React from 'react';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import styles from '../styles/Navbar/infoModal.module.css';

interface Props {
  openModal: boolean;
  setOpenModal: Function;
}

const InfoModal: React.FC<Props> = ({ openModal, setOpenModal }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"About Munch Hunt"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Munch Hunt was created by Francisco Vera Nicola and Seiji Matsumoto after they got fed up with not being able to decide what to eat on many separate occassions. Munch Hunt aims to simplify the decision-making process by picking the right place to eat for you. To find out more about the developers or the website, view the links below.
        </DialogContentText>
        <div className={styles.buttons}>
          <div className={styles.person}>
            <div className={styles.name}>
              Munch Hunt
            </div>
            <Button className={styles.button} onClick={() => window.open('https://github.com/MunchHunt/restaurantPicker')}>GitHub Repository</Button>
          </div>
          <div className={styles.person}>
            <div className={styles.name}>
              Francisco Vera Nicola
            </div>
            <Button className={styles.button} onClick={() => window.open('https://github.com/francisco-cmyk')}>GitHub</Button>
            <Button className={styles.button} onClick={() => window.open('https://www.linkedin.com/in/fveranicola/')}>LinkedIn</Button>
          </div>
          <div className={styles.person}>
            <div className={styles.name}>
              Seiji Matsumoto
            </div>
            <Button className={styles.button} onClick={() => window.open('https://github.com/SeijiMatsumoto')}>GitHub</Button>
            <Button className={styles.button} onClick={() => window.open('https://linkedin.com/in/matsumoto-seiji')}>LinkedIn</Button>
          </div>

        </div>
      </DialogContent>
      <DialogActions>
        <Button className={styles.closeBtn} onClick={() => setOpenModal(false)}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;