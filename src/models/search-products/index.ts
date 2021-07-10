import { Product } from '../product';

export interface Search_Result_Model {
  id: number;
  brand_id: number;
  category_id: number;
  name: string;
  overview: string;
  specifications: string;
  product_images: { id: number; image_path: string }[];
  product_tags: { id: number; name: string }[];
  price: number;
  status: boolean;
  message: string;
  code: number;
  paginate: any;
  similar_products: Product[];
}

export interface Search_Request_Model {
  tags?: any[];
  brand?: string;
}
