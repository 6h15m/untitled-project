export default `.wrap {
  display: flex;
  flex-direction: column;
}
.cart-start {
  border: 1.4px solid black;
}
.cart-product {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
}
.product-check {
  margin-right: 1rem;
}
.product-container {
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 6rem;
  border: 1px solid black;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 1.4rem;
}
.product {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 1px solid black;
}
.product-name {
  font-size: 1.4em;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 0.6rem;
}
.product-option-property {
  opacity: 60%;
}
.product-amount-container {
  display: flex;
  flex-direction: row;
  width: 6rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.product-amount {
}
.amount-control {
  width: 1.4rem;
}
.total-price-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1em;
  align-self: flex-end;
}
.total-price {
  margin-left: 0.6rem;
  font-weight: 600;
  font-size: 1.8em;
}
.none {
  display: none;
}`;
