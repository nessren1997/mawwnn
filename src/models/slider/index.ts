//---------------Slider-Req.ts---------------
export interface Slider_Req {
  image_path: string;
}

//---------------Slider.ts---------------
export interface Slider {
  id: number;
  image_path: string;
}

//---------------Slider-I-Req.ts---------------

export interface Slider_I_Req {
  slider: Slider_Req;
}

//---------------Slider-U-Req.ts---------------

export interface Slider_U_Req {
  id: number;
  slider: Slider_Req;
}

//---------------Slider-D-Req.ts---------------
export interface Slider_D_Req {
  id: number;
}

//---------------Slider-S-Req.ts---------------
export interface Slider_S_Req {
  id: number;
}
