import { User, City, ReceivingCenter } from '..';
import { GiftItem } from '../gift-item';

export interface Winner {
  id: number;
  image_path: string;
  used: '0' | '1';
  user: User;
  gift_item: GiftItem;
  status: number;
  expires_at: string;
  scanned_at: string;
  scan_count: number;
  email: string;
  phone_number: string;
  city: City;
  delivery_center: ReceivingCenter;
  delivery_user: User;
  updated_at: Date;
}

export interface WinnerStatus_U_Req {
  gift_id: number;
  status: number;
  center: number;
}
