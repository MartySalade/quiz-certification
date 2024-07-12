import { useEffect, useState } from "react";
import { getOpenTriviaData } from "../api/utils";

/**
 * This hook is used to get generic open trivia data. You can pass the expected return type with the generic "T" type
 */
export default function useGetOpenTriviaData<T>(url: string) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<Error>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function asyncGetData() {
      setIsLoading(true);
      try {
        const res = await getOpenTriviaData<T>(url);
        setData(res);
        setError(undefined);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error(`An error occured while fetching url: ${url}`));
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (!data) asyncGetData();
  }, [data, url]);

  return { data, isLoading, error };
}
