import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { Container, Box, Card, Typography, Stack, Grid,Popover, MenuItem, IconButton,Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import { ProductSort, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import Iconify from '../components/iconify';

// ----------------------------------------------------------------------
const StyledcategoryImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(null);
  function getProducts() {
    axios
      .get('http://localhost:3003/Product/get-all-products')
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProducts();
  }, []);

  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  
  const OnDeleteHandler = (productid) => {
    axios
      .delete(`http://localhost:3003/Product/delete-product/${productid}`)
      .then((res) => {
        console.log(res);
        getProducts();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Products | Minimal UI </title>
      </Helmet>
        <Container>
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
             PRODUCTS
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            <Link to={'/dashboard/add-product'} style={{color:"white", textDecoration:"none"}}>New Product</Link>
          </Button>
        </Stack>
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid key={product._id} item xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                  <StyledcategoryImg alt={''} src={`http://localhost:3003/Upload/product/${product.thumbnail}`} />
                </Box>
                <Stack spacing={2} sx={{ p: 3 }} justifyContent="space-between" direction="row" alignItems="center">
                  <Link color="inherit" underline="hover">
                    <Typography variant="subtitle2" noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle3" noWrap>
                      {product.shortdescription}
                    </Typography>
                    <Typography variant="subtitle1">
                    ${product.price}
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
                   <Link to={`/dashboard/update-product/${product._id}`}>Edit</Link>
                  </MenuItem>
                  <MenuItem sx={{ color: 'error.main' }} onClick={() => OnDeleteHandler(product._id)}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                  </MenuItem>
                </Popover>
                </Stack>    
              </Card>
            </Grid>
          ))}
        </Grid>
        <ProductCartWidget />
      </Container>
    </>
  );
}
