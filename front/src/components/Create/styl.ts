export default `
a {
  text-decoration: none;
  color: black;
}
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
  width: 8.6rem;
  padding: 0rem 0.6rem;
  background-color: #F4F5F8;
  border: none;
}
input[type="text"], input[type="password"], input[type="number"] { 
  height: auto;
  line-height: normal;
  width: 20rem;
  padding: .8rem;
  background-color: #F4F5F8;
  border: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: fit-content;
  margin: 2rem 2rem 0 2rem;
}
.create {
  display: flex;
  flex-direction: column;
}
.category-selector-container {
  display: flex;
  height: 2.6rem;
}
.category-arrow {
  margin: 1rem;
}
.tags-creation-container {
  display: flex;
  height: fit-content;
  padding: .6rem 0rem;
  align-items: center;
}
.tags-container {
  display: flex;
  align-items: center;
  width: 42rem;
  flex-flow: row wrap;
  margin-bottom: -1.4rem;
}
.add-tag-btn {
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 1rem;
  border: none;
  background-color: #495057;
  color: white;
  display: flex;
  justify-content: center;
  margin-bottom: 1.4rem;
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
  background-color: #495057;
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
.create-btn {
  background-color: #495057;
  border: none;
  color: white;
  width: 8rem;
  height: 2.2rem;
  font-size: 1.1em;
  align-self: center;
  margin-top: 2rem;
}
.tag {
  margin-bottom: 1.4rem;
}

input[type="checkbox"]:not(:checked), 
input[type="checkbox"]:checked {
  display:none;
}

input[type="checkbox"] + label {
  margin-right: .6rem;
  padding: .4rem 1rem;
  background-color: #f4f5f8;
  border-radius: 1rem;
  font-size: .8rem;
  cursor: pointer;
}

input[type="checkbox"]:checked + label {
  color: white;
  background-color: #212529;
}
`;
