import type { ProductType } from "../model/ProductType";

export default class ProductDao {
    static getProduct(slugOrId:string): Promise<ProductType> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                switch(slugOrId) {
                    case '1' :
                    case 'apple-iphone-17-pro-max-256gb-orange' : resolve({ 
                        id: "1", 
                        name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)", 
                        slug: "apple-iphone-17-pro-max-256gb-orange",
                        price: 73499, discount: 6050, rating: 5, 
                        imageUrl: "/img/CosmicOrange-1397x1397.png.webp",
                        stock: 10
                    }); break;

                    case '2' :
                    case 'navushnyky-apple-airpods-pro-3' : resolve({ 
                        id: "2", name: "Наушники Apple AirPods Pro 3 (MFHP4) (2025)", 
                        slug: "navushnyky-apple-airpods-pro-3",
                        price: 11899, discount: 2200, rating: 5, 
                        imageUrl: "/img/vbfbg-1397x1397.png.webp",
                        stock: 3
                    }); break;   

                    case '814897' :
                    case 'apple-iphone-15-256gb--pink-' : resolve({ 
                        id: "814897", name: "Apple iPhone 15 256GB (Pink)", 
                        slug: "apple-iphone-15-256gb--pink-",
                        price: 37999, discount: 2800, rating: 5, 
                        imageUrl: "/img/pink (1)-1397x1397.jpeg.webp",
                        stock: 0
                    }); break;   

                    default: reject("Not Found: " + slugOrId);
                }
            }, 700);
        });
    }
}