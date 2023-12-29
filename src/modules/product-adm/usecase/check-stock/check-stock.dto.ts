export interface CheckStockInputDto {
    id: string;
}

export interface CheckStockOutputDto {
    productId: string;
    stock: number;
}
