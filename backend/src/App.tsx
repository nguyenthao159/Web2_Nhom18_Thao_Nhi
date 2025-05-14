import { Admin, Resource,CustomRoutes } from "react-admin";
import { Route } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { dataProvider } from "./dataProvider";
import { Dashboard } from "./Dashboard";
import { authProvider } from "./authProvider";
import { CategoryList, CategoryCreate, CategoryEdit } from "./components/Category";
import { ProductList, ProductCreate, ProductEdit } from "./components/Product";
import ProductUpdate from "./components/ProductImageUpdate";
import { CartList, CartShow } from './components/Cart';
export const App = () => (
  <Admin authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard}>
    <CustomRoutes>
      <Route
        path="/products/:id/update-image" element={<ProductUpdate />}
      />
    </CustomRoutes>
    <Resource name="categories" list={CategoryList} create={CategoryCreate} edit={CategoryEdit} icon={CategoryIcon} />
    <Resource name="products" list={ProductList} create={ProductCreate} edit={ProductEdit} icon={CategoryIcon} />
    <Resource name="carts" list={CartList} show={CartShow} icon={ShoppingCartIcon} />
   
    {/* Add more resources as needed */}
  </Admin>
);