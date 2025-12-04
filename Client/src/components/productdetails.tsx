import { deleteProduct } from "../Services/productservice";
import type { Product } from "../Types";
import { formatCurrency } from "../Utils";
import {Form, useNavigate, type ActionFunctionArgs, redirect, useFetcher} from "react-router-dom";

type ProductDetailsProps = {
    product: Product;
};

export async function action({ params}:ActionFunctionArgs) {
    if (params.id !== undefined) {
        await deleteProduct(+params.id);

        return redirect('/');
    } 
}

export default function ProductDetails({product}: ProductDetailsProps) {

    const navigate = useNavigate();
    const fetcher = useFetcher();
    const isAvailable = product.availability;
    return (
        <tr className="border-b hover:bg-gray-100">
            <td className="p-3 text-lg text-gray-800">{product.name}</td>
            <td className="p-3 text-lg text-gray-800">{formatCurrency(product.price)}</td>
            <td className="p-3 text-lg text-gray-800">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name="id"
                        value={product.id}
                        className={`${isAvailable ? 'text-black' : 'text-red-600'} 
                        rounded-lg font-bold w-full text-xs p-2 rounded-md hover:opacity-80 transition-colors duration-300
                        border border-black-400`}
                    >
                        {isAvailable ? "Disponible" : "No disponible"}
                    </button>
                </fetcher.Form>
            </td>
            <td className="p-3 text-lg text-gray-800">
                <div className="flex gap-2 items-center">
                    <button className="w-full bg-green-600 text-xs text-center p-2 rounded-md font-bold text-white shadow-sm hover:bg-green-500 uppercase"
                        onClick={() => navigate(`/products/${product.id}/edit`)}>
                        Editar
                    </button>
                    
                    <Form className="w-full" 
                        method="POST" 
                        action={`/products/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                                e.preventDefault();
                            }
                        }}
                    >
                        <input type='submit'
                            value='Eliminar'
                            className="w-full bg-red-600 text-center text-xs p-2 rounded-md font-bold text-white shadow-sm hover:bg-red-500 uppercase"
                        />
                    </Form>
                </div>
            </td>
        </tr>
    );
}
