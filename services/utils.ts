import { BaseApiResponse, Country } from "@/interfaces";

import { http } from "../lib/http";

// verify service
export const getCountriesService = () =>
  http.post<BaseApiResponse<Country[]>>(`/base/countries/`);
