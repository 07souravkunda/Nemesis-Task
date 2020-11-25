import React, { useState, useCallback } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import validator from 'validator';
import Button from '@material-ui/core/Button';
import Axios from 'axios';
import Dialog from '../Dialog/Dialog';
import Spinner from '../Spinner/Spinner';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 500,
    },

    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#5995fd',
        borderWidth: '1.5px',
      },
      '&:hover fieldset': {
        borderColor: '#598afd',
      },
      '&.Mui-focused fieldset': {
        borderWidth: '2.5px',
      },
    },
  },
}));

const Form = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const [usererror, setUsererror] = useState();
  const [mobileerror, setMobileerror] = useState();
  const [emailerror, setEmailerror] = useState();
  const [addresserror, setAddresserror] = useState();

  const [dg, setDg] = useState({});
  const [loading, setLoading] = useState(false);

  const clickHandler = useCallback(async () => {
    try {
      setLoading(true);
      const res = await Axios.post('http://localhost:3000/api/v1/user/', {
        username,
        email,
        mobile,
        address,
      });
      console.log(res.data);
      setDg({
        open: true,
        title: 'Success!!',
        content: `User created successfully with userID ${res.data.user._id}`,
      });
    } catch (er) {
      setDg({
        open: true,
        title: 'Error!!',
        content: er.response.data.message,
      });
      console.log(er);
    }
    setLoading(false);
    setUsername('');
    setEmail('');
    setMobile('');
    setAddress('');
  }, [username, email, mobile, address]);

  const handleUsername = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setUsererror('This field is required!');
    } else if (!validator.isAlphanumeric(value, validator.AlphanumericLocale)) {
      setUsererror(
        'Username should contain only alphanumeric characters with no space'
      );
    } else {
      setUsererror();
    }
    setUsername(value);
  };

  const handleMobile = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setMobileerror('This field is required!');
    } else if (!validator.isMobilePhone(value) || value.length !== 10) {
      setMobileerror('Enter a valid mobile number');
    } else {
      setMobileerror();
    }
    setMobile(value);
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setEmailerror('This field is required!');
    } else if (!validator.isEmail(value)) {
      setEmailerror('Enter a valid email');
    } else {
      setEmailerror();
    }
    setEmail(value);
  };

  const handleAddress = (e) => {
    const value = e.target.value;
    if (value.length === 0) {
      setAddresserror('This field is required');
    } else {
      setAddresserror();
    }
    setAddress(value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          error={usererror}
          helperText={usererror}
          required
          id="outlined-error"
          label="Username"
          variant="outlined"
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div>
        <TextField
          required
          error={emailerror}
          helperText={emailerror}
          id="outlined-error"
          label="Email"
          variant="outlined"
          value={email}
          onChange={handleEmail}
        />
      </div>
      <div>
        <TextField
          required
          error={mobileerror}
          helperText={mobileerror}
          id="outlined-error"
          label="Mobile"
          variant="outlined"
          value={mobile}
          onChange={handleMobile}
        />
      </div>
      <div>
        <TextField
          error={addresserror}
          helperText={addresserror}
          required
          id="outlined-error"
          label="Address"
          variant="outlined"
          value={address}
          onChange={handleAddress}
        />
      </div>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <Button
            disabled={
              username === '' ||
              mobile === '' ||
              address === '' ||
              email === '' ||
              mobileerror ||
              addresserror ||
              usererror ||
              emailerror
            }
            variant="contained"
            style={{
              borderRadius: 25,
              backgroundColor: ' #5995fd',
              padding: '14px 36px',
              fontSize: '18px',
              color: 'white',
            }}
            onClick={clickHandler}
          >
            SUBMIT
          </Button>
        )}
      </div>
      <Dialog
        open={dg.open}
        title={dg.title}
        content={dg.content}
        handleClose={() => setDg({})}
      />
    </form>
  );
};

export default Form;
