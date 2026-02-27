import { useCallback, useEffect ,useState} from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, deps: unknown[] = []) => {
    
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const memoizedFetch=useCallback(fetchFunction, deps);
    useEffect(() => {
        let isMounted = true; // To prevent state updates on unmounted component
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await memoizedFetch();
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
    }, [memoizedFetch]);


    return { data, loading, error };
}

export default useFetch;