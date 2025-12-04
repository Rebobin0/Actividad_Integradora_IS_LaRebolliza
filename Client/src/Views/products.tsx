import { Link, useLoaderData, type ActionFunctionArgs } from "react-router-dom";
import { getProducts, updateAvailability } from "../Services/productservice";
import ProductDetails from "../components/productdetails";
import type { Product } from "../Types";

export async function loader() {
    const products = await getProducts();
    
    return products;
}

export async function action({request}:ActionFunctionArgs) {
    const data = Object.fromEntries (await request.formData()); 
    await updateAvailability(+data.id)
    return {};
}

export default function Products() {

    const products = useLoaderData() as Product[];

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Productos</h2>
                <Link to="products/new" className="bg-indigo-600 text-sm p-3 rounded-md font-bold text-white shadow-sm hover:bg-indigo-500">
                    Agregar Producto
                </Link>
            </div>
            
            <div className="p-2">
                <table className="w-full table-auto shadow-md mt-5">
                    <thead className="bg-indigo-900 text-white">
                        <tr>
                            <th className="p-2">Nombre</th>
                            <th className="p-2">Precio</th>
                            <th className="p-2">Disponibilidad</th>
                            <th className="p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map (product => (
                            <ProductDetails
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

        </>
    );
}