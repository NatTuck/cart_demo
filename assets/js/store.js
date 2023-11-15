
import { createStore, combineReducers } from 'redux';
import { Map } from 'immutable';

// State looks like:
// {
//    products: [...],
//    counts: Map()
// }

const products0 = [
  { id: 1, name: "Shirt", price: "19.99" },
  { id: 2, name: "Hat", price: "14.99" },
  { id: 3, name: "Sticker", price: "7.99" },
];

function products(state0 = products0, action) {
  return state0;
}

function counts(state0 = Map(), action) {
  switch (action.type) {
  case 'counts/change':
    let {item_id, change} = action.data;
    let c0 = state0.get(item_id, 0);
    let s1 = state0.set(item_id, c0 + change);
    return s1;
  default:
    return state0;
  }
}

function root_reducer(state, action) {
  console.log("root", state, action);
  let state1 = combineReducers({products, counts})(state, action);
  console.log("after", state1);
  return state1;
}

let store = createStore(root_reducer);
export default store;
