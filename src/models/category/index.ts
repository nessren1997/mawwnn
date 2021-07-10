//---------------Category-Req.ts---------------

export interface Category_Req {
  image: string;
  image2: string;
  'name:en': string;
  'name:ar': string;
  parent_category_id?: number;
}

//---------------Category.ts---------------
export interface Category {
  id: number;
  image_path: string;
  image_path2: String;
  'name:en'?: string;
  'name:ar'?: string;
  name?: string;
  parent_category_id: number | null;
  sub_categories?: Category[];
}

//---------------Category-I-Req.ts---------------

export interface Category_I_Req {
  category: Category_Req;
}

//---------------Category-U-Req.ts---------------

export interface Category_U_Req {
  id: number;
  category: Category_Req;
}

//---------------Category-D-Req.ts---------------
export interface Category_D_Req {
  id: number;
}

//---------------Category-S-Req.ts---------------
export interface Category_S_Req {
  id: number;
}
