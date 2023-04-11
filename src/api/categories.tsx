import { ICategory } from "../types/categories"
import instance from "./instance"

const getAllCategories = () => {
    return instance.get('/categories')
}
console.log(getAllCategories());

const getOneCategories = (id: string | undefined) => {
    return instance.get('/categories/' + id)
}
const addCategories = (category: ICategory) => {
    return instance.post('/categories', category)
}
const deleteCategories = (id: string | undefined) => {
    return instance.delete('/categories/' + id)
}
const updateCategories = (id: string | undefined, category: ICategory) => {
    return instance.put('/categories/' + id, category)
}

export { getAllCategories, getOneCategories, addCategories, deleteCategories, updateCategories }