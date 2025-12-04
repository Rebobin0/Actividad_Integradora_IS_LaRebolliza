import { Link,Form, useActionData, type ActionFunctionArgs, redirect } from "react-router-dom";
import ErrorMessage from "../components/errormessage";
import { addproduct } from "../Services/productservice";
import ProductForm from "../components/productform";

export async function action({request}:ActionFunctionArgs) {
    const data = Object.fromEntries(await request.formData());

    let error='';
    if(Object.values(data).includes('')) {
        error = 'Todos los campos son obligatorios';
    }
    if(error.length) {
        return error;
    }

    await addproduct(data);

    return redirect('/');
}

export default function NewProducts() {

    const error = useActionData() as string;

    return (
        <>
            <div className="flex justify-between">
                <h2 className="text-4xl font-black text-slate-500">Registrar productos</h2>
                <Link to="/" className="bg-indigo-600 text-sm p-3 rounded-md font-bold text-white shadow-sm hover:bg-indigo-500">
                    Volver
                </Link>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            <Form className="mt-1" method="POST">
                
                <ProductForm/>

                <input
                    type="submit"
                    className="mt-5 w-full bg-indigo-600 p-2 text-white font-bold text-lg cursor-pointer rounded"
                    value="Registrar Producto"
                />
            </Form>
        </>
    );
}