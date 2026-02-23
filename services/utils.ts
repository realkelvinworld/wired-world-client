import { BaseApiResponse, Country } from "@/interfaces";
import { Announcement, NavbarData } from "@/models/navbar";
import { Showroom } from "@/models/showroom";
import { Region } from "@/models/region";

import { http } from "../lib/http";

// verify service
export const getCountriesService = () =>
  http.post<BaseApiResponse<Country[]>>(`/base/countries/`);

// Navbar
export const getNavbarService = () =>
  http.post<BaseApiResponse<NavbarData>>(`/base/navbar/`);

// Regions
export const getRegionsService = () =>
  http.post<BaseApiResponse<Region[]>>(`/base/regions/`);

// Showrooms
export const getShowroomsService = (payload: { id: number }) =>
  http.post<BaseApiResponse<Showroom[]>>(`/base/show_rooms/${payload.id}`);

// Announcemts
export const getAnnouncementsService = () =>
  http.post<BaseApiResponse<Announcement[]>>(`/base/announcements/`);
