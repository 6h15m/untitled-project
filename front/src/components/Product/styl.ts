export default `
a {
  text-decoration: none;
  color: black;
}
.wrap {
  display: flex;
  flex-flow: row wrap;
  margin-top: 1rem;
  margin-right: -4rem;
}
.product-container {
  margin-right: 2rem;
  margin-bottom: 2rem;
}
.product {
  width: 12rem;
  height: 14rem;
  background-color: #e9ecef;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;
  flex-flow: column;
}
.product-tags-container {
  display: flex;
  margin-bottom: .4rem;
}
.tag {
  color: #4c6ef5;
  margin-right: .4rem;
  font-size: .9em;
}
`;
