import { IProduct } from "../types/products";
import instance from "./instance";

const getAllProduct = () => {
    return instance.get('/products')
}
const getOneProduct = (id: string | undefined) => {
    return instance.get('/products/' + id)
}
const addProduct = (product: IProduct) => {
    return instance.post('/products', product)
}
const deleteProduct = (id: string | undefined) => {
    return instance.delete('/products/' + id)
}
const updateProduct = (id: string | undefined, product: IProduct) => {
    return instance.put('/products/' + id, product)
}

export { getAllProduct, getOneProduct, deleteProduct, updateProduct, addProduct }