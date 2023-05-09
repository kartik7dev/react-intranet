import { useContext } from 'react';
import { CategoryContext } from 'src/contexts/category-context';

export const useCategory = () => useContext(CategoryContext);
