import MainLayout from '../layouts/MainLayout/MainLayout';
import ContactInfo from '../screens/ContactInfo/ContactInfo';
import Error404 from '../screens/Error404/Error404';
import { HomeScreen } from '../screens/HomeScreen';
import NoResults from '../screens/NoResults/NoResults';
import ProductUploadScreen from '../screens/ProductUploadScreen/ProductUploadScreen';
import ProductScreen from '../screens/ProductScreen/ProductScreen';
import { CMSLayout } from '../layouts/CMSLayout';
import { Dashboard } from '../CMS-screens/Dashboard';
import Products from '../CMS-screens/Products/Products';

export const routes = [
  {
    path: '/no-results',
    component: NoResults,
    private: false,
    accessRoles: [],
  },
  {
    path: '/contact-info',
    component: ContactInfo,
    layout: MainLayout,
    private: false,
    accessRoles: [],
  },
  {
    path: '/product/:id',
    component: ProductScreen,
    layout: MainLayout,
    private: false,
    accessRoles: [],
  },
  {
    path: '/',
    component: HomeScreen,
    layout: MainLayout,
    private: false,
    accessRoles: [],
  },
  {
    path: '*',
    component: Error404,
    private: false,
    accessRoles: [],
  },
  {
    path: '/admin/dashboard',
    component: Dashboard,
    layout: CMSLayout,
    private: true,
    accessRoles: [1, 6],
  },
  {
    path: '/admin/products',
    component: Products,
    layout: CMSLayout,
    private: true,
    accessRoles: [1, 6],
  },
  {
    path: '/admin/product-upload',
    component: ProductUploadScreen,
    layout: CMSLayout,
    private: true,
    accessRoles: [1, 6],
  }
];

export default routes;
