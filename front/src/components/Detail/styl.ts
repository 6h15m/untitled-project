export default `
h2 {
  margin-top: 1.2rem;
  margin-bottom: 1rem;
}
.wrap {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.product-image {
  flex: 1;
  margin-right: 2rem;
  background-color: #e9ecef;
}
.product-info {
  width: 25rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
}
.product-tags {
  display: flex;
  flex-direction: row;
  margin-bottom: 1.6rem;
}
.tag-name {
  color: #4c6ef5;
  margin-right: 1rem;
}
.product-options {
  margin-top: 1rem;
}
.option-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}
.option-property-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
}
.option-property {
  margin-right: 0.6rem;
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
  width: 1.4rem;
}
.product-bottom {
  width: inherit;
  margin-top: auto;
}
.product-price {
  font-weight: 600;
  font-size: 1.6em;
  margin-bottom: 1.2rem;
  float: right;
}
.cart-btn {
  width: inherit;
  height: 3.6rem;
  margin-top: auto;
  background-color: #364fc7;
  border-radius: 0.2em;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
}
`;
