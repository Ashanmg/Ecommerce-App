import MainLayout from '../layouts/MainLayout/MainLayout';
import ContactInfo from '../screens/ContactInfo/ContactInfo';
import Error404 from '../screens/Error404/Error404';
import { HomeScreen } from '../screens/HomeScreen';
import NoResults from '../screens/NoResults/NoResults';
import ProductUploadScreen from '../screens/ProductUploadScreen/ProductUploadScreen';

export const routes = [
  {
    path: '/no-results',
    component: NoResults,
  },
  {
    path: '/contact-info',
    component: ContactInfo,
    layout: MainLayout,
  },
  {
    path: '/product-upload',
    component: ProductUploadScreen,
    layout: MainLayout,
  },
  {
    path: '/',
    component: HomeScreen,
    layout: MainLayout,
  },
  {
    path: '*',
    component: Error404,
  },
];

export default routes;
