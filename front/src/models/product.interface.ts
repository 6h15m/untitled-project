export interface ProductType {
  product_id: number,
  product_name: string,
  product_price: number,
  small_category_id: number
}

export interface ProductsType {
  rows: Array<ProductType>
}