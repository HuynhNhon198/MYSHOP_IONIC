export interface IPick {
  gomdon_ctime: number;
  gomdon_id: string;
  models_need_pick: IModelsPick[];
  successed: boolean;
  uid: string;
}

export interface IModelsPick {
  amount: number;
  image: string;
  item_id: string;
  name: string;
  order_sn: string;
  product_id: string;
  product_name: string;
  sku: string;
  sku_product: string;
  pickedAmount: number;
  status: boolean;
  images: string[];
  shopid: number;
}
