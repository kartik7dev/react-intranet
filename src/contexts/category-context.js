import {createContext,useContext,useState} from 'react';

const CategoryContext = createContext({ });

export const CategoryProvider = ({ children }) => {
    const [categoryId, setCategoryId] = useState('');
  
    return (
      <CategoryContext.Provider value={{ categoryId, setCategoryId }}>
        {children}
      </CategoryContext.Provider>
    );
  };

export const CategoryConsumer = CategoryContext.Consumer;  
  
export const useCategoryContext = () => useContext(CategoryContext)