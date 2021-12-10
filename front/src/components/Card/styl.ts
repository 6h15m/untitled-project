export default `
.card-container {
  display: flex;
  flex-flow: column;
  flex: 1;
  height: 7rem;
  margin-bottom: 1rem;
  justify-content: space-between;
  padding: 2rem;
  background-color: #f8f9fa;
}
.product-info-container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  border-bottom: 1px solid #ced4da;
  height: 4rem;
}
.product-info-right {
  display: flex;
  flex-flow: column;
  align-items: end;
}
.cart-info-container {
  display: flex;
  flex-flow: row;
  align-items: end;
  justify-content: space-between;
}
.product-name {
  font-size: 1.4em;
  font-weight: 600;
  text-decoration: none;
  margin-bottom: 0.6rem;
}
.product-option-properties {
  color: #868e96;
  margin-top: .2rem;
}
.delete-btn {
  background: none;
  border: none;
  font-size: 1em;
  color: #485056;
  cursor: pointer;
}
.product-price {
  margin-top: .6rem
}
.product-total-price {
  font-size: 1.4em;
  font-weight: 600;
}
`;
