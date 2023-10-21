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

export default function SubcategoryPage() {
  const [subcategories, setSubCategories] = useState([]);
  const [open, setOpen] = useState(null);
  // const { subcategoryid } = useParams()
  function getSubCategories() {
    axios
      .get('http://localhost:3003/Subcategory/all-subcategories')
      .then((res) => {
        setSubCategories(res.data.data);
        console.log(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getSubCategories();
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const OnDeleteHandler = (subcategoryid) => {
    axios
      .delete(`http://localhost:3003/Subcategory/delete-subcategory/${subcategoryid}`)
      .then((res) => {
        console.log(res);
        getSubCategories();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Subcategory | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            SUBCATEGORIES
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            <Link to={'/dashboard/add-subcategory'} style={{color:"white", textDecoration:"none"}}>New Subcategory</Link>
          </Button>
        </Stack>
        <Grid container spacing={3}>
          {subcategories.map((subcategory) => (
            <Grid key={subcategory._id} item xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                  <StyledcategoryImg alt={''} src={`http://localhost:3003/Upload/subcategory/${subcategory.image}`} />
                </Box>
                <Stack spacing={2} sx={{ p: 3 }} justifyContent="space-between" direction="row" alignItems="center">
                  <Link color="inherit" underline="hover" style={{textDecoration:"none"}}>
                    <Typography variant="subtitle2" noWrap>
                      {subcategory.name}
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
                      boxShadow: 1,
                      '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.70,
                      },
                    },
                  }}
                >
                  <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                   <Link to={`/dashboard/update-subcategory/${subcategory._id}`} style={{textDecoration:"none"}}>Edit</Link>
                  </MenuItem>
                  <MenuItem sx={{ color: 'error.main' }} onClick={() => OnDeleteHandler(subcategory._id)}>
                    {console.log(subcategory)}
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
