import {createBrowserRouter} from 'react-router-dom';
import Layout from './Layouts/layout';
import Products, {loader as productsloader, action as updateAvailabilityAction} from './Views/products';
import NewProducts, {action as newproductaction} from './Views/newproduct';
import EditProducts, {loader as editproductloader, action as editProductAction} from './Views/editproduct';
import { action as deleteProductAction } from './components/productdetails';
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element:<Products/>,
                loader: productsloader,
                action: updateAvailabilityAction,
            },
            {
                path: 'products/new',
                element: <NewProducts/>,
                action: newproductaction
            },
            {
                path:'products/:id/edit',// ROA pattern for editing a product (resource oriented architecture)
                element: <EditProducts/>,
                loader: editproductloader,
                action : editProductAction
            },
            {
                path:'products/:id/eliminar', // ROA pattern for viewing a single product (resource oriented architecture)
                action: deleteProductAction
            }
        ]
    }
]);