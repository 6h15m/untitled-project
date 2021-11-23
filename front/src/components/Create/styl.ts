export default `
h3 {
  margin-bottom: .4rem;
}
h4 {
  margin: 0 1rem 0 0;
  font-weight: normal;
}
h5 {
  margin: 0 .6rem 0 0;
  width: 4rem;
  font-weight: normal;
}
select {
  padding: 0rem 0.6rem;
  background-color: #F4F5F8;
  border: none;
}
input[type="text"], input[type="password"] { 
  height: auto;
  line-height: normal;
  width: 20rem;
  padding: .8rem;
  background-color: #F4F5F8;
  border: none;
}
.category-selector-container {
  display: flex;
  height: 2.6rem;
}
.category-arrow {
  margin: 1rem;
}
.tags-container {
  display: flex;
  height: fit-content;
  width: fit-content;
  padding: .6rem 0rem;
  align-items: center;
}
.tag {
  margin-right: .6rem;
  padding: .4rem 1rem;
  border: 1px solid black; 
  border-radius: 1rem;
  font-size: .8rem;
  cursor: pointer;
}
.tag:hover {
  background-color: black;
  color: white;
}
.add-tag-btn {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: black;
  color: white;
  display: flex;
  justify-content: center;
}
.options-container {
  display: flex;
  flex-direction: column;
  width: fit-content;
}
.option {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: #F4F5F8;
  width: fit-content;
}
.option-name-container {
  display: flex;
  align-items: center;
}
.add-btn {
  display: flex;
  margin: 1rem auto 0.6rem auto;
  justify-content: center;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: black;
  color: white;
}
.option-properties-container {
  margin-top: 1rem;
}
.option-property {
  background-color: white;
  padding: 1rem;
  margin-top: 1rem;
  display: flex;
}
.property-name-container {
  display: flex;
  align-items: center;
  margin-right: 2rem;
}
.additional-price-container {
  display: flex;
  align-items: center;
}
.property-input {
  height: 2rem !important;
  width: 10rem !important;
}
.bg-white {
  background-color: white !important;
}
`;
