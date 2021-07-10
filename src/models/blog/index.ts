//---------------Blog-Req.ts---------------
export interface Blog_Req {
  image_path: string;
  'article_title:ar': string;
  'article_body:ar': string;
  'article_title:en': string;
  'article_body:en': string;
}

//---------------Blog.ts---------------
export interface Blog {
  id: number;
  image_path: string;
  article_title: string;
  article_body: string;
}

//---------------Blog-I-Req.ts---------------

export interface Blog_I_Req {
  blog: Blog_Req;
}

//---------------Blog-U-Req.ts---------------

export interface Blog_U_Req {
  id: number;
  blog: Blog_Req;
}

//---------------Blog-D-Req.ts---------------
export interface Blog_D_Req {
  id: number;
}

//---------------Blog-S-Req.ts---------------
export interface Blog_S_Req {
  id: number;
}
