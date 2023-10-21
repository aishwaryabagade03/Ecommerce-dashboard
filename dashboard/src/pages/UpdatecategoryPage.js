import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';
import { Container, Grid, Paper, TextField, Typography, FormControl, Button } from '@mui/material';

function Item(props) {
  return <Paper {...props} />;
}

export default function AddCategory() {
  const navigate = useNavigate();
  const categoryid = useParams();
  const [data, setData] = useState({});
  const imgRef = useRef();
  const onClickHandler = (event) => {
    event.preventDefault();
    // Prepare the data for the POST request
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('image', imgRef.current.files[0]);

    // Make the POST request
    fetch(`http://localhost:3003/Category/update-category/${categoryid}`, {
      method: 'PUT',
      body: formData,
    })
    // console.log(formData)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // You can parse the response if it returns JSON
      })
      .then(() => {
        // Handle the response data here, if needed
        setTimeout(() => {
          navigate('/dashboard/category');
        }, 3000);
      })
      .catch((error) => {
        // Handle errors here
        console.error('Error:', error);
        alert('Failed to add category'); // You can replace this with your error handling logic
      });
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Category | Minimal UI </title>
      </Helmet>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Update Category
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <FormControl>
              <form>
                <Item>
                  <TextField type="text" onChange={onChangeHandler} name="name" label="Category Name" fullWidth id="fullWidth"/>
                  <input type="file" ref={imgRef} name="image" style={{ margin: '25px 0px' }}/>
                  <br/>
                  <Button type="submit" variant="contained" onClick={onClickHandler}>
                    Submit
                  </Button>
                </Item>
              </form>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
