import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container, Box, Card, Typography, Stack, Grid, Button, Popover, MenuItem, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import Iconify from '../components/iconify';

// utils
// components
// import Label from '../../../components/label';

// ----------------------------------------------------------------------

const StyledcategoryImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(null);
  function getCategories() {
    axios
      .get('http://localhost:3003/Category/all-categories')
      .then((res) => {
        setCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const OnDeleteHandler = (categoryid) => {
    axios
      .delete(`http://localhost:3003/Category/delete-category/${categoryid}`)
      .then((res) => {
        console.log(res);
        getCategories();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Category | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
             CATEGORIES
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            <Link to={'/dashboard/add-category'} style={{color:"white", textDecoration:"none"}}>New Category</Link>
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid key={category._id} item xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                  <StyledcategoryImg alt={''} src={`http://localhost:3003/Upload/category/${category.image}`} />
                </Box>
                <Stack spacing={2} sx={{ p: 3 }} justifyContent="space-between" direction="row" alignItems="center">
                  <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                      {category.name}
                    </Typography>
                  </Link>
                  <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                  <Iconify icon={'eva:more-vertical-fill'} />
                </IconButton>
                <Popover
                  open={Boolean(open)}
                  anchorEl={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  PaperProps={{
                    sx: {
                      p: 1,
                      width: 140,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                   <Link to={`/dashboard/update-category/${category._id}`}>Edit</Link>
                  </MenuItem>
                  <MenuItem sx={{ color: 'error.main' }} onClick={() => OnDeleteHandler(category._id)}>
                    {console.log(category)}
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                  </MenuItem>
                </Popover>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
