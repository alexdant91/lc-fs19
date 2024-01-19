import { useEffect, useState } from "react";
import { Constants } from "../Constants";
import { Link } from "react-router-dom";

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(Constants('/products').API_BASE);
                const result = await response.json();
                setProducts(result.products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])


    return (
        <>
            <h1>Home</h1>
            <table>
                <thead>
                    <tr>
                        <th>TITLE</th>
                        <th>DESCRITPION</th>
                        <th>BRAND</th>
                        <th>INFO</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.length > 0 && products.map(product => (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.description}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <Link to={`/products/${product.id}`}>INFO</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

        </>
    )
}

export default Home;