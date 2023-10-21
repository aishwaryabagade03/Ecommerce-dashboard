import { Button, Container, TextField, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSubCategoryPage = () => {
  const navigate = useNavigate();
  const [maincategory, setMainCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: null,
  });
  
  useEffect(()=>{
    axios
    .get(`http://localhost:3003/Category/all-categories`)
    .then((res) => {
      setMainCategory(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  },[])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();

    formDataObject.append('name', formData.name);
    formDataObject.append('category', formData.category);
    formDataObject.append('image', formData.image);

    // console.log(formData.name);
    axios
      .post("http://localhost:3003/Subcategory/add-subcategory" , formDataObject)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate('/dashboard/subcategory');
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
    <Container>
        <h1>Add SubCategory</h1>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'start', gap: 20 }}
        >
          <TextField type="text" name="name" placeholder='Name' label="Name" value={formData.name} onChange={handleInputChange} fullWidth/>
          <InputLabel id="category-label">Select Category</InputLabel>
          <Select
            labelId="category-label"
            id="category-select"
            value={formData.category}
            label="Category"
            name='category'
            onChange={handleInputChange}
            fullWidth
          >
            {maincategory.map((elem) => (
              <MenuItem key={elem._id} value={elem._id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>

          <input type="file" name="image" onChange={handleFileChange}/>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </form>
          </Grid>
          </Grid>
      </Container>
    </>
  );
};
 

export default AddSubCategoryPage;
