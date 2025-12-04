import { DraftProductSchema, ProductSchema, ProductsSchema, type Product } from "../Types";
import { safeParse, transform, pipe, number,parse, string} from "valibot";
import axios from "axios";
import { toBoolean } from "../Utils";

type ProductData = {
    [k: string]: FormDataEntryValue;
};

export async function addproduct(data: ProductData) {
    try {
        const result = safeParse(DraftProductSchema, {
            name: data.name,
            price: +data.price
        })
        if (result.success) {
            const url =`${import.meta.env.VITE_API_URL}/api/products`;
            await axios.post(url, {
                name: result.output.name,
                price: result.output.price
            });
            
        }
        else{
            throw new Error("Invalid product data");
        }
        console.log("Producto agregado:", result);
    } catch (error) {
        console.error("Error al agregar el producto:", error);
    }
}

export async function getProducts() {
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products`;
        const {data}= await axios(url);
        const result = safeParse(ProductsSchema, data.data);
        if (result.success) {
            return result.output;
        }else{
            throw new Error("Invalid products data");
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

export async function getProductById(id:Product['id']) {
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
        const {data}= await axios(url);
        const result = safeParse(ProductSchema, data.data);
        
        if (result.success) {
            return result.output;
        }else{
            throw new Error("Invalid products data");
        }
    } catch (error) {
        console.error("Error al obtener los productos:", error);
    }
}

export async function updateProduct(id: Product['id'], data: ProductData) {
    try {
        //valibot no longer support coerce, so we use manual conversion
        //const NumberSchema = { type: "number" } as const;
        //conversion with valibot transform
        //const NumberSchema = pipe(number(), transform((value) => Number(value)));

        const result = safeParse(ProductSchema, {
            id,
            name: data.name,
            price: +data.price,
            availability: toBoolean(data.availability.toString()),
        })
        if (result.success) {
            const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
            await axios.put(url, result.output);
            console.log("Producto actualizado:", result);
        }
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
    } 

}

export async function deleteProduct(id: Product['id']) {
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.delete(url);
        console.log("Producto eliminado:", id);
    } catch (error) {
        console.error("Error al eliminar el producto:", error);
    }

}

export async function updateAvailability(id: Product['id']) {
    try {
        const url =`${import.meta.env.VITE_API_URL}/api/products/${id}`;
        await axios.patch(url);
        console.log("Disponibilidad del producto actualizada:", id);
    } catch (error) {
        console.error("Error al actualizar la disponibilidad del producto:", error);
    }
}