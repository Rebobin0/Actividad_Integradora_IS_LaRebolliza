import type { Product } from "../Types";

type ProductFormProps = {
    product?: Product;
};

export default function ProductForm({product}: ProductFormProps) {
    return (
        <>
            <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                    Producto
                </label>
                <input 
                    id="name"
                    type="text"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Nombre del Productor"
                    name="name"
                    defaultValue={product?.name}
                />
            </div>
            <div className="mt-4">
                <label className="text-gray-800" htmlFor="price">
                    Precio
                </label>
                <input
                    id="price"
                    type="number"
                    className="mt-2 block w-full p-3 bg-gray-100"
                    placeholder="Precio Producto, ej: 20, 30"
                    name="price"
                    defaultValue={product?.price}
                />
            </div>
        </>
    );
}