//---------------Product-Req.ts---------------
export interface Product_Req {
  'name:ar': string;
  'name:en': string;
  'overview:ar': string;
  'overview:en': string;
  'specifications:ar': string;
  'specifications:en': string;
  product_images: string[];
  product_tags: string[];
  price: number;
  is_visible: 1 | 0;

  category_id: number;
  brand_id: number;
}

//---------------Product.ts---------------
export interface Product {
  id: number;
  name?: string;
  overview?: string;
  specifications?: string;
  'name:ar'?: string;
  'name:en'?: string;
  'overview:ar'?: string;
  'overview:en'?: string;
  'specifications:ar'?: string;
  'specifications:en'?: string;
  product_images: { id: number; image_path: string ;thumbnail_250?:string ;thumbnail_600?:string }[];
  product_tags: { id: number; name: string }[];
  price: number;
  is_visible?: 1 | 0;

  category_id: number;
  brand_id: number;

  similar_products: Product[];
}

export interface Links {
  first: string;
  last: string;
  prev: string;
  next: string;
}

//---------------Product-I-Req.ts---------------

export interface Product_I_Req {
  product: Product_Req;
}

//---------------Product-U-Req.ts---------------

export interface Product_U_Req {
  id: number;
  product: Product_Req;
}

//---------------Product-D-Req.ts---------------
export interface Product_D_Req {
  id: number;
}

//---------------Product-S-Req.ts---------------
export interface Product_S_Req {
  id: number;
}
