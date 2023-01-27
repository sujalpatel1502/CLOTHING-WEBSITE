//import SHOP_DATA from '../../shop-data.json'
import { useContext, Fragment } from "react";

import { CategoriesContext } from "../../context/categories.context";
//import ProductCard from '../../component/product-card/product-card.component'
import CategoryPreview from "../../component/category-preview/category-preview.component";



const CategoriesPreview = () => {
    const { categoriesMap } = useContext(CategoriesContext);
    return (
        <Fragment>
          {Object.keys(categoriesMap).map((title) => {
           const products = categoriesMap[title];
           return (
            <CategoryPreview key={title} title={title} products={products}/>
           )
          })}
        </Fragment>
      );
    };
export default CategoriesPreview;