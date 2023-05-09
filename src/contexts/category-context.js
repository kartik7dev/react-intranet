import React, { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

export const CategoryContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CATEGORY':
      return [...state, action.payload];
    default:
      return state;
  }
};

export const CategoryProvider = ({ children }) => {
  const [categories, dispatch] = useReducer(reducer, categories);

  const addCategory = (category) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.node,
};

export const CategoryConsumer = CategoryContext.Consumer;

export const useCategoryContext = () => useContext(CategoryContext);
