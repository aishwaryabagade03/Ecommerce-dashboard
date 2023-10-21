import { Button, Container, TextField, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSubCategoryPage = () => {  
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const [Subcategory, setSubCategory] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: null,
    Subcategory:null,
    quantity:null,
    price: null,
    shortdescription:'',
    description:'',
    thumbnail:null,
    image: null,
    status:''
  });

  const getCategory=()=>{
    axios
    .get("http://localhost:3003/Category/all-categories")
    .then((res) => {
      setCategory(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const getSubCategory=()=>{
    axios
    .get("http://localhost:3003/Subcategory/all-subcategories")
    .then((res) => {
      setSubCategory(res.data.data);
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(()=>{
   getCategory();
   getSubCategory();
  },[])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // const handlePricechange = (e) => {
  //   const { name, value } = e.target;
  //   console.log(`Received value for ${name}:`, value);

  //   // Convert the input value to a number for the "price" field
  //   const parsedValue = name === 'price' ? parseFloat(value) : value;
  //   console.log(`Parsed value for ${name}:`, parsedValue);

  //   setFormData({
  //     ...formData,
  //     [name]: parsedValue,
  //   });
  // };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      thumbnail: file,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataObject = new FormData();

    formDataObject.append('name', formData.name);
    formDataObject.append('category', formData.category);
    formDataObject.append('Subcategory', formData.Subcategory);
    formDataObject.append('quantity', formData.quantity);
    formDataObject.append('price', formData.price);
    formDataObject.append('shortdescription', formData.shortdescription);
    formDataObject.append('description', formData.description);
    formDataObject.append('price', formData.price);
    formDataObject.append('thumbnail', formData.thumbnail);
    formDataObject.append('image', formData.image);
    formDataObject.append('status', formData.status);

    console.log(formDataObject);
    console.log(formData.price)
    axios
      .post("http://localhost:3003/Product/add-product", formDataObject)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          navigate('/dashboard/products');
        }
      })
      .catch((err) => {
        console.error('Error adding product:', err);
      });
  };
  return (
    <>
    <Container>
        <h1>Add Products</h1>
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
            {category.map((elem) => (
              <MenuItem key={elem._id} value={elem._id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
          <InputLabel id="subcategory-label">Select Subcategory</InputLabel>
          <Select
            labelId="subcategory-label"
            id="subcategory-select"
            value={formData.Subcategory}
            label="Subcategory"
            name='Subcategory'
            onChange={handleInputChange}
            fullWidth
          >
            {Subcategory.map((elem) => (
              <MenuItem key={elem._id} value={elem._id}>
                {elem.name}
              </MenuItem>
            ))}
          </Select>
          <TextField type="number" name="quantity" placeholder='Quantity'label="Quantity" value={formData.quantity} onChange={handleInputChange} fullWidth/>
          <TextField type="number" name="price" placeholder='Price' value={formData.price || ''} label="Price" onChange={handleInputChange} fullWidth/>
          <TextField type="text" name="shortdescription" label="Shortdescription" placeholder='Shortdescription'value={formData.shortdescription} onChange={handleInputChange} fullWidth/>
          <TextField type="text" name="description" label="Description" placeholder='Description'value={formData.description} onChange={handleInputChange} fullWidth/>
          <input type="file" name="thumbnail" onChange={handleFileChange} />
          <input type="file" name="image" multiple onChange={handleFileChange}/>
          <TextField type="text" name="status" label="Status" placeholder='Status' value={formData.status} onChange={handleInputChange} fullWidth/>
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