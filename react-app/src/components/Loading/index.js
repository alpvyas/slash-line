import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import slashline_logo from "../../images/logo.png";
import ballInGlove from '../../images/baseball-glove-dirt.png';

const Loading = () => {

  //CSS styling
  const styles = {
                  background: {
                    background: `url(${ballInGlove}) no-repeat center center fixed`,
                    backgroundSize: "cover"
                  },
              }

  return (
    <>
           <Dialog
            open={true}
            aria-labelledby="form-dialog-title"
            style={styles.background}
            className="page-container"
          >
            <div style={{ padding: 20 }}>
            <Grid
              container
              direction="column"
              justifyContent="space-around"
              alignItems="center"
              
              style={{margin: '15px 15px -15px 15px'}}
            >
              <img alt="logo" src={slashline_logo} style={{height: '50px', width: '50px'}} />
              <Typography
                variant="h3"
                align="center"
                style={{color: '#ef3e42', textShadow: '-1px -1px 0 #ef3e42, 1px -1px 0 #ef3e42, -1px 1px 0 #ef3e42, 1px 1px 0 #ef3e42'}}
              >
                Slash Line Baseball
              </Typography>

              <DialogContent>
              <DialogContentText>
                <Typography
                  variant="h6"
                  align="center"
                >
                  Hang tight, we're getting everything ready for you.
                </Typography>
              </DialogContentText>
              </DialogContent>
              <CircularProgress />
              <div style={{height: '10px'}}></div>
            </Grid>
            </div>
            </Dialog>
    </>
  )
};

export default Loading;