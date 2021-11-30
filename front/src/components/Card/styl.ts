export default `
.wrap {
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: space-between;
}
.product-container {
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 7rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f8f9fa;
}
.product {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  height: 4rem;
}
.product-name {
  font-size: 1.4em;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 0.6rem;
}
.product-option-property {
  color: #868e96;
  margin-top: .2rem;
}
.cart-product {
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: space-between;
}
.product-amount-container {
  display: flex;
  flex-direction: row;
  width: 6rem;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.5rem;
}
.amount-control {
  height: 1.4rem;
  width: 1.4rem;
  background-color: #868e96;
  border: none;
  border-radius: .2rem;
  color: white;
}
.price {
  margin-top: .6rem
}
.product-total-price {
  font-size: 1.4em;
  font-weight: 600;
}

.delete {
  background: none;
  border: none;
  font-size: 1em;
  color: #485056;
}
.none {
  display: none;
}
`;
