import Hero from '../Components/Hero'
import List from '../Components/List'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import '../../css/home.css'

export default function Home(props) {
    const products = props.products
    return (
        <>
            <Header />
            <Hero />
            <List products={products} />
            <Footer />
        </>
    )
}