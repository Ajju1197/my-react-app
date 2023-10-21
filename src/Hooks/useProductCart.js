import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../Redux/slices/productCartSlice";

export const useProductCart = () => {
    const dispatch = useDispatch();

    const productAddToCart = () => {
        dispatch(addToCart());
    }

    const removeToCart = (id) => {
        dispatch(removeFromCart(id));
    }

    return {productAddToCart, removeToCart}
}