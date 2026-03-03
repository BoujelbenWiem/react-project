import {  useEffect ,useState} from "react";
import type{ DependencyList } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, deps: DependencyList = []) => {
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        let isMounted = true; // To prevent state updates on unmounted component
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await fetchFunction();
                if (isMounted) {
                    setData(result);
                    setError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setError((err as Error).message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };
        fetchData();
        return () => {
            isMounted = false;
        };
    },[...deps]);


    return { data, loading, error };
}

export default useFetch;