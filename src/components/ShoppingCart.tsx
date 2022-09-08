import { Offcanvas, Stack } from "react-bootstrap";
import { useShoopingCart } from "../context/ShoppingCartContext";
import {CartItem} from '../components/CartItem'
import storeItems from '../data/item.json'
import { formatCurrency } from "../utilities/formatCurrency";
type ShoopingCartProps = {
    isOpen : boolean
}

export function ShoopingCart({isOpen}: ShoopingCartProps){
  const {closeCart, cartItems} = useShoopingCart()
  return(
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>Cart</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Stack gap={3}>
        {cartItems.map(item => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
        <div className="ms-auto fw-bold fs-5">
            Total{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
</Offcanvas.Body>
   
  </Offcanvas>
    )
}

