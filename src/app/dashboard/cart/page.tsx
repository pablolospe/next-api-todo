import { WidgetItem } from "@/components";
import { Product, products } from "@/products/data/products";
import { ItemCard } from "@/shopping-cart";
import { cookies } from "next/headers";


export const metadata = {
    title: 'Productos en el carrito',
    description: 'Productos en el carrito DE COMPRAS',
};

interface ProductInCart {
    product: Product;
    quantity: number
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productsInCart: ProductInCart[] = [];

    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if (product) {
            productsInCart.push({ product: product, quantity: cart[id] })
        }
    }
    return productsInCart
}

export default function CartPage() {

    const cookiesStore = cookies();
    const cart = JSON.parse(cookiesStore.get('cart')?.value ?? '{}') as { [id: string]: number };
    const productsInCart = getProductsInCart(cart)

    const totalToPay = productsInCart.reduce(
        (prev, current)=> (current.product.price * current.quantity) + prev, 0)

    return (
        <>
            <h1 className="text-5xl">Productos en el carrito</h1>
            <hr className="mb-2" />

            <div className="flex flex-col sm:flex-row gap-2 w-full">
                <div className="flex flex-col gap-2 w-full sm:w-8/12">
                    {
                        productsInCart.map(({ product, quantity }) => (
                            <ItemCard key={product.id} product={product} quantity={quantity} />
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-col w-full sm:w-4/12">
                    <WidgetItem title='Total a pagar'>
                        <div className="mt-2 flex flex-col justify-center gap-4">
                            <h3>{(totalToPay * 1.15).toFixed(2)}</h3>
                            <br />
                            <h6>Impuestos 15%: ${(totalToPay * 0.15).toFixed(2)}</h6>
                        </div>
                    </WidgetItem>
            </div>
        </>
    )
}
