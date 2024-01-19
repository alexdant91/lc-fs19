import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Constants } from "../Constants";

const Product = () => {
    const params = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (params.product_id) {
            const fetchData = async () => {
                try {
                    const response = await fetch(Constants(`/products/${params.product_id}`).API_BASE);
                    const result = await response.json();
                    setProduct(result);
                } catch (error) {
                    console.log(error);
                }
            }
            fetchData()
        }

    }, [params.product_id])

    return (
        <>
            <h1>Product {params.product_id}</h1>
            <div>
                <pre>
                    {product != null && JSON.stringify(product, null, 2)}
                </pre>
            </div>
        </>
    )
}

export default Product;