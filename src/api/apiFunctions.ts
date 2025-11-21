import type {
  BlogType,
  EventTypes,
  MagazineType,
  PreCongregations,
} from "@/types";
import { api } from "./axios";

export const fetchEvents = async (): Promise<EventTypes[]> => {
  const res = await api.get("/events");
  return res.data;
};

export const fetchCongregations = async (): Promise<PreCongregations[]> => {
  const res = await api.get("/congregations");
  return res.data;
};

export const fetchFoodServices = async (): Promise<PreCongregations[]> => {
  const res = await api.get("/foodservices");
  return res.data;
};

export const fetchSeminars = async (): Promise<PreCongregations[]> => {
  const res = await api.get("/seminars");
  return res.data;
};

export const fetchBlogs = async (): Promise<BlogType[]> => {
  const res = await api.get("/blogs");
  return res.data;
};

export const fetchMagazines = async (): Promise<MagazineType[]> => {
  const res = await api.get("/magazines");
  return res.data;
};
