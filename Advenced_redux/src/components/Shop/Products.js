import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
   {
      title: "Marshmello",
      price: 6,
      description: "Soft and tasty!",
   },
   {
      title: "Sprite",
      price: 2,
      description: "Refresh yourself!",
   },
];

const productsContent = DUMMY_PRODUCTS.map((product) => {
   const id = Math.random().toFixed(7);
   return (
      <ProductItem
         key={id}
         id={id}
         title={product.title}
         price={product.price}
         description={product.description}
      />
   );
});

const Products = (props) => {
   return (
      <section className={classes.products}>
         <h2>Buy your favorite products</h2>
         <ul>{productsContent}</ul>
      </section>
   );
};

export default Products;
