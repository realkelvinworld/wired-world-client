import { BaseApiResponse } from "@/interfaces";
import { Language } from "@/models/language";
import { Faq } from "@/models/faq";

import { http } from "../lib/http";

// Languages
export const getLanguagesService = () =>
  http.post<BaseApiResponse<Language[]>>(`/base/languages/`);

// FAQs
export const getFaqsService = () =>
  http.post<BaseApiResponse<Faq[]>>(`/base/faqs/`);
