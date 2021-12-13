export default `
label {
  margin-left: .2rem;
}
.detail-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.image {
  flex: 1;
  margin-right: 2rem;
  background-color: #e9ecef;
}
.info-container {
  width: 25rem;
  height: 34rem;
  display: flex;
  flex-direction: column;
}
.options-container {
  margin-top: 1.6rem;
}
.option-name {
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 0.6rem;
}
.option-properties-container {
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;
}
.option-property {
  margin-right: 0.6rem;
}
.bottom-container {
  width: inherit;
  margin-top: auto;
}
.price {
  font-weight: 600;
  font-size: 1.6em;
  margin-bottom: 1.2rem;
  float: right;
}
.to-cart-btn {
  width: inherit;
  height: 3.6rem;
  margin-top: auto;
  background-color: #364fc7;
  border-radius: 0.2em;
  color: white;
  font-size: 1.2em;
  font-weight: 600;
  cursor: pointer;
  border: none;
}
`;
