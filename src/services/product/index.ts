import { AxiosRequestConfig } from 'axios';
import { Product, Product_I_Req, Product_U_Req, Product_D_Req, Product_S_Req, Links } from '../../models';
import ApiService from '../../utils/api/api-service';
import ApiResult from '../../utils/api/models/api-result';

export class ProductService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.API_URL}api/`, ...config });
  }

  public FetchSite = async (): Promise<ApiResult<Product[]>> => this.get<Product[]>(`/products/all`);

  public FetchDash = async (): Promise<ApiResult<Product[]>> => this.get<Product[]>(`/products/all?is_dashboard=1`);

  // public FetchSite = async (page : number): Promise<ApiResult<{ data: Product[]; links: Links }>> => this.get< {data: Product[]; links: Links }>(`/products?page=${page}`);


  // public FetchDash = async (page: number): Promise<ApiResult<{ data: Product[]; links: Links }>> =>
  // this.get<{ data: Product[]; links: Links }>(`/products?is_dashboard=1&page=${page}`);


  public FetchByCategory = async ({ id }: { id: number }): Promise<ApiResult<Product[]>> =>
    this.get<Product[]>(`/categories/all/${id}/products`);

  public Insert = async ({ product }: Product_I_Req): Promise<ApiResult<Product>> => this.post<Product>(`/products`, product);

  public updatePrices = async (file: FormData): Promise<ApiResult<Product>> => this.post<Product>(`/products`, file);

  public Update = async ({ product, id }: Product_U_Req): Promise<ApiResult<Product>> =>
    this.put<Product>(`/products/${id}`, product);

  public Delete = async ({ id }: Product_D_Req): Promise<ApiResult<Product>> => this.delete<Product>(`/products/${id}`);

  public Show = async ({ id }: Product_S_Req): Promise<ApiResult<Product>> => this.get<Product>(`/products/${id}`);
}

export const productService = new ProductService({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}api/`,
});
