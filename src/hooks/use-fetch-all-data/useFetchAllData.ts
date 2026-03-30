import api from "../../api/api";
import type { AllDataType } from "../../api/all-data";
import useFetch from "../use-fetch/useFetch";

function useFetchAllData(options: {
  onFetchSuccess: (allData?: AllDataType) => void;
  onFetchError?: (error?: unknown) => void;
}) {
  const { loading } = useFetch(api.allData.get, options);

  return { loading };
}

export default useFetchAllData;
