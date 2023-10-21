// component
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import LocalMallTwoToneIcon from '@mui/icons-material/LocalMallTwoTone';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'user',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'category',
    path: '/dashboard/category',
    icon: <CategoryTwoToneIcon/>,
  },
  {
    title: 'subcategory',
    path: '/dashboard/subcategory',
    icon: <WidgetsTwoToneIcon/>,
  },
  {
    title: 'product',
    path: '/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'orders',
    path: '/dashboard/orders',
    icon: <AddShoppingCartTwoToneIcon/>,
  },
  {
    title: 'cart',
    path: '/dashboard/cart',
    icon: <LocalMallTwoToneIcon/>,
  },
  {
    title: 'invoice',
    path: '/dashboard/invoice',
    icon: <PaymentTwoToneIcon/>,
  },
  {
    title: 'blog',
    path: '/dashboard/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
