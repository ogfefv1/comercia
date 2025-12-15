import { useParams } from "react-router-dom";
import "./ui/Product.css";
import { useEffect, useState } from "react";
import type { ProductType } from "../../entities/product/model/ProductType";
import ProductDao from "../../entities/product/api/ProductDao";

export default function Product() {
    const {slug} = useParams<string>();
    const [pageData, setPageData] = useState<ProductType|null|undefined>(undefined);

    useEffect(() => {
        if(slug) {
            setPageData(undefined);
            ProductDao
                .getProduct(slug)
                .then(setPageData)
                .catch(err => {
                    setPageData(null);
                    console.error(err);
                })
                .finally(/* Stop preloader */);
        }
    }, []);

    return pageData === undefined ? <h1>Loading...</h1>
    : pageData === null ? <h1>Not Found</h1>
    : <>
    <div className="row"></div>

    <div className="row">
        <div className="col col-5">
            <img className="w-100" src={pageData?.imageUrl} alt={pageData?.name} />
        </div>    
        <div className="col col-7 product-info">
            <h1>{pageData?.name}</h1>
            <div>
                <div className='product-rating'>★★★★★ ({pageData.rating})</div>
                {pageData.stock === 0
                ? <div className="product-unavailable">Предзаказ</div>
                : pageData.stock && pageData.stock > 0 && pageData.stock < 5
                    ? <div className="product-low-stock">Осталось мало</div>
                    : <div className="product-available">В наличии</div>
                }
            </div>
            <div className="product-old-price">{pageData.price + (pageData?.discount ?? 0)}</div>
            <div className="product-new-price">{pageData.price}</div>
        </div>    
    </div>   

    </>;
}