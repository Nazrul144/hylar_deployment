import { BASE_URL } from "@/config/config";

export const getAllCategoriesData = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/offers/categories/`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }

    const result = await res.json();
    console.log("result", result);
    return result?.data ?? result ?? [];
  } catch (error) {
    console.error("Something went wrong fetching data!", error);
    return [];
  }
};


