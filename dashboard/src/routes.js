import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import OrderPage from './pages/OrderPage';
import CartPage from './pages/CartPage';
import InvoicePage from './pages/InvoicePage';
import AddCategory from './pages/AddcategoryPage';
import UpdateCategory from './pages/UpdatecategoryPage';
import AddsubcategoryPage from './pages/AddsubcategoryPage';
import UpdatesubcategoryPage from './pages/UpdatesubcategoryPage';
import AddproductPage from './pages/AddproductPage';
import UpdateproductPage from './pages/UpdateproductPage';
// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: "category", element: <CategoryPage/>},
        { path: 'add-category', element: <AddCategory /> },
        { path: 'update-category/:category_id', element: <UpdateCategory /> },
        { path: "subcategory", element: <SubcategoryPage/>},
        { path: 'add-subcategory', element: <AddsubcategoryPage/> },
        { path: 'update-subcategory/:subcategory_id', element: <UpdatesubcategoryPage/> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'add-product', element: <AddproductPage/> },
        { path: 'update-product/:product_id', element: <UpdateproductPage/> },
        { path: 'orders', element: <OrderPage /> },
        { path: 'cart', element: <CartPage /> },
        { path: 'invoice', element: <InvoicePage /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
