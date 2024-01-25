import type { AxiosResponse } from "axios";

import $api from "@/src/api/api";

export type SearchProductType = {
  url: string;
};

interface ProductName {
  id: number;
  name: string;
}

export const getProductName = async ({ url }: SearchProductType): Promise<AxiosResponse<ProductName>> =>
  $api.get("/product/search", { params: { url } });
