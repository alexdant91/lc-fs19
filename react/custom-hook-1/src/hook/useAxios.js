import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const refetch = async () => {
        if (error) {
            setError(null)
        }

        try {
            const result = await axios({
                url,
                method: "GET",
            });

            setData(result.data.posts)
        } catch (error) {
            setError(error.message)
        }
    }

    useEffect(() => {
        refetch();
    }, [url]);

    return {
        data,
        error,
        refetch
    }
}