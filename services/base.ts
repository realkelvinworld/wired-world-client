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

// Newsletter
export const subscribeNewsletterService = (email: string) =>
  http.post<BaseApiResponse<string>>(`/base/newsletter/`, {
    email,
    subscribe: true,
  });

// Contact Us
export const contactUsService = (payload: {
  full_name: string;
  email: string;
  phone: string;
  message: string;
}) => http.post<BaseApiResponse<string>>(`/base/contact_us/`, payload);
