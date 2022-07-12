import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {


  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = (e) => {
    //for demonstartion
    // const name = e.target.name;
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: value });
  };

  // const updateSort = (e) => {
  //   //for demonstartion
  //   let name = e.target.name;
  //   let value = e.target.value;
  //
  //   dispatch({ type: UPDATE_SORT, payload: { name, value } });
  // };

  const updateFilters = (e) => {
    // console.log('what is name', e.target.name)

    let name = e.target.name;
    let value = e.target.value;
    if (name === "category") {
      value = e.target.textContent
      if (value === 'все' || value === 'Все' || value === 'All' || value === 'tümü' || value === 'Tümü' || value === 'الكل') {
        value = 'all'
      }
      if (value === 'квартиры' || value === 'Квартиры' || value === 'apartments' || value === 'daireler' || value === 'Apartments' || value === 'Daireler' || value === 'أرض') {
        value = 'квартиры'
      }
      if (value === 'виллы' || value === 'Виллы' || value === 'villas' || value === 'Villas' || value === 'فلل') {
        value = 'виллы'
      }
      if (value === 'дуплексы' || value === 'Дуплексы' || value === 'duplexes' || value === 'dubleksler' || value === 'Duplexes' || value === 'Dubleksler' || value === 'دوبلكس') {
        value = 'дуплексы'
      }
      if (value === 'земля' || value === 'Земля' || value === 'earth' || value === 'dünya' || value === 'Earth' || value === 'Dünya' || value === 'شقق') {
        value = 'земля'
      }
    }

    if (name === "color") {
      value = e.target.dataset.color;
    }
    if (name === "price") {
      value = Number(value);
    }
    if (name === "shipping") {
      value = e.target.checked;
    }
    dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
  };
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
