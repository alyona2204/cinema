import { useEffect, useState } from "react";
import type { ApiResponseType } from "../../api/apiRequest";

function useFetch<T>(
  fetch: () => Promise<ApiResponseType<T>>,
  options: {
    onFetchSuccess: (allData?: T) => void;
    onFetchError?: (error?: unknown) => void;
  },
) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      setLoading(true);
      try {
        const response = await fetch();
        if (response.success) {
          options.onFetchSuccess(response.result);
        } else {
          throw Error(response.error);
        }
      } catch (error) {
        options.onFetchError?.(error);
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    request();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { loading };
}

export default useFetch;
