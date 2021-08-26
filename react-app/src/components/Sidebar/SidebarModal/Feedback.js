import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';

const Feedback = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});


  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
        <DialogContent>
        <DialogContentText>
          <Typography variant="h6" align="center">We're always to improve the expereince for our users. If you have some feedback or want to report a bug use the form below to let us know.</Typography>

          {errors && <Typography variant="h6" align="center" style={{color: 'red'}}>{ errors.message }</Typography>}
        </DialogContentText>
          <TextField
                fullWidth
                autoFocus
                variant="outlined"
                margin="dense"
                id="bio"
                label="Feedback"
                type="text"
                multiline
                style={{ align: 'center'}}
                onChange={(e) => null}
              />
        </DialogContent>
        <DialogActions style={{justifyContent: 'center'}}>
          <Button className="submit-button" onClick={(e) => handleSubmit(e)}>Submit</Button>
        </DialogActions>
    </>
  );
};

export default Feedback;