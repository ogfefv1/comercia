type ProductType = {
    id:       string,
    name:     string,
    price:    number,
    discount: number|null,
    imageUrl: string,
    rating:   number|null,
    slug:     string|undefined,
    stock?:   number,  // наличие (в шт)
}

export type { ProductType };