import type { HomePageSection } from "../../../features/section_card/types/section";
import type { SectionType } from "../model/SectionType";

export default class SectionDao {
    static cacheSections:Array<HomePageSection>|undefined;

    static getSections() {
        return new Promise<Array<HomePageSection>>((resolve, _) => {
            if(typeof SectionDao.cacheSections != 'undefined') {
                resolve(SectionDao.cacheSections);
            }
            else setTimeout(() => {
                SectionDao.cacheSections = [
        {
            "imageUrl": "/img/wide-applefull.png.webp",
            "title": "Apple",
            "slug": "apple"
        },
        {
            "imageUrl": "/img/big-center-airpods-2025full.png.webp",
            "title": "AirPods",
            "slug": "airpods"
        },
        {
            "imageUrl": "/img/big-2025-iphonefull.png.webp",
            "title": "iPhone",
            "slug": "iphonefull"
        },
        {
            "imageUrl": "/img/Frame-8full.png.webp",
            "title": "б/у Apple",
            "slug": "applebw"
        },
        {
            "imageUrl": "/img/android-newfull.png.webp",
            "title": "Смартфоны",
            "slug": "android"
        },
        {
            "imageUrl": "/img/wide-dysonfull.png.webp",
            "title": "Dyson",
            "slug": "dysonfull"
        },
        {
            "imageUrl" : "/img/wide-garminfull.png.webp",
            "title": "garminfull",
            "slug": "garminfull"
        },
        {
            "imageUrl" : "/img/big-kitchenfull.png.webp",
            "title": "kitchenfull",
            "slug": "kitchenfull"
        },
        {
            "imageUrl" : "/img/home-carefull.png.webp",
            "title": "home-carefull",
            "slug": "home-carefull"
        },  
        {
            "imageUrl" : "/img/gaming-micefull.png.webp",
            "title": "micefull",
            "slug": "micefull"
        },   
        {
            "imageUrl" : "/img/gaming-acsfull.png.webp",
            "title": "acsfull",
            "slug": ""
        },     
        {
            "imageUrl" : "/img/headphonesfull.png.webp",
            "title": "headphonesfull",
            "slug": ""
        },
        {
            "imageUrl": "/img/big-ps5full.png.webp",
            "title": "Консоли",
            "slug": ""
        },
        {
            "imageUrl": "/img/image19full.png.webp",
            "title": "Ноутбуки",
            "slug": ""

        },
        {
            "imageUrl": "/img/image24full.png.webp",
            "title": "Телевизоры",
            "slug": ""

        },
        {
            "imageUrl": "/img/wide-noutfull.png.webp",
            "title": "Экшн камеры",
            "slug": ""

        },
        {
            "imageUrl": "/img/wide-photoofull.png.webp",
            "title": "Фотоапараты",
            "slug": ""

        },
        {
            "imageUrl": "/img/image24full.png.webp",
            "title": "Мониторы",
            "slug": ""
        },
    ];
                resolve(SectionDao.cacheSections);
            }, 300);
        });
    }

    static getSection(slug:string) {
        return new Promise<SectionType>((resolve, reject) => {
            setTimeout(() => {
                switch(slug) {
                    case 'apple': resolve({
                        products: [
                            { id: "1", name: "Apple iPhone 17 Pro Max 256GB (Cosmic Orange)", 
                                slug: "apple-iphone-17-pro-max-256gb-orange",
                                price: 73499, discount: 6050, rating: 5, 
                                imageUrl: "/img/CosmicOrange-1397x1397.png.webp"},
                            { id: "2", name: "Наушники Apple AirPods Pro 3 (MFHP4) (2025)", 
                                slug: "navushnyky-apple-airpods-pro-3",
                                price: 11899, discount: 2200, rating: 5, 
                                imageUrl: "/img/vbfbg-1397x1397.png.webp"},
                            { 
                                id: "814897", name: "Apple iPhone 15 256GB (Pink)", 
                                slug: "apple-iphone-15-256gb--pink-",
                                price: 37999, discount: 2800, rating: 5, 
                                imageUrl: "/img/pink (1)-1397x1397.jpeg.webp",
                                stock: 0
                            }
                        ]
                    }); break;
                    default: reject('"Slug not found"');
                }
            }, 300);
        });
    }

}