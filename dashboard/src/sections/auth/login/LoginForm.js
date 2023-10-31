import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
} from '@mui/material';

export default function LoginForm() {
  const navigate = useNavigate();

  // Define state variables for email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ Email: email, Password: password });

    fetch('http://localhost:3003/User/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success === true) {
          localStorage.setItem('token', data.token);
          navigate('/dashboard');
          const userDetails = data.data._id;
          localStorage.setItem('userDetails', userDetails);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="Email"
        label="Email Address"
        name="Email"
        autoComplete="email"
        autoFocus
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="Password"
        label="Password"
        type="password"
        id="Password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>
      <Grid container>
        <Grid item xs>
          <Link component={RouterLink} to="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link component={RouterLink} to="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

