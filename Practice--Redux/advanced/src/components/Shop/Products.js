import ProductItem from './ProductItem'
import classes from './Products.module.css'

const Products = props => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        <ProductItem id={1} title="red pencil" price={6} description="" />
        <ProductItem id={2} title="black jean" price={30} description="" />
        <ProductItem id={3} title="white t-shirt" price={12} description="" />
      </ul>
    </section>
  )
}

export default Products
