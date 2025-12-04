import { Link,Form, useActionData, type ActionFunctionArgs, redirect, useLocation, type LoaderFunction, type LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import ErrorMessage from "../components/errormessage";
import { addproduct, getProductById, updateProduct } from "../Services/productservice";
import type { Product } from "../Types";
import ProductForm from "../components/productform";

export async function loader({params}: LoaderFunctionArgs) {
    if(params.id !== undefined){
        const product = await getProductById(+params.id);
        if(!product) {
            return redirect('/');
        }
        return product;
    }
}

export async function action({request, params}:ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error='';
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if(error.length) {
        return error;
    }

    if(params.id !== undefined){
        await updateProduct(+params.id, data);

        return redirect('/');
    }
}

const availabilityOptions = [
    { value: 'true', name: 'Disponible' },
    { value: 'false', name: 'No disponible' }
];

export default function EditProducts() {

    const product = useLoaderData() as Product;
    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Editar productos</h2>
                <Link to="/" className="bg-indigo-600 text-sm p-3 rounded-md font-bold text-white shadow-sm hover:bg-indigo-500">
                    Volver
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-1" method="POST">
                
                <ProductForm
                    product={product} 
                />

                <div className="mb-4">
                    <label className="text-gray-800" htmlFor="availability">
                        Disponibilidad
                    </label>
                    <select
                        id="availability"
                        name="availability"
                        className="mt-2 block w-full p-3 bg-gray-50"
                        defaultValue={product?.availability.toString() }
                    >
                        {availabilityOptions.map(option => (
                            <option key={option.name} value={option.value.toString()}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Guardar Cambios"
                />
            </Form>
        </>
    );
}