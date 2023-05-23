import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Alert, Box, Button, Container, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Unstable_Grid2 as Grid, Snackbar } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CreateCategory } from 'src/sections/categories/create-category';
import { CategoryList } from 'src/sections/categories/category-list';
import useAxiosPrivate from 'src/hooks/use-axios-private';
const CREATE_CATEGORY_URL = '/categories'

const Page = () => {
    const axiosPrivate = useAxiosPrivate()
    const [categories, setCategories] = useState([])
    const [successMessage, setSuccessMessage] = useState('');
    const [delCategoryId, setDelCategoryId] = useState('')
    const [open, setOpen] = useState(false)
    const handleCreateCategory = (newCategory,editMode) => {
        if(editMode){
          setCategories((prevCategories) =>
              prevCategories.map((category) =>
                category._id === newCategory._id ? { ...category, categoryName: newCategory.categoryName,parentId: newCategory.parentId } : category
              )
            );
        }
        else{
          setCategories([...categories, newCategory]);
        }  
      };

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleEditCategory = (category) => {
        setSelectedCategory(category);
      }; 
      
    const handleDeleteCategory = (category) => {
      setOpen(true)
      setDelCategoryId(category._id)
    };
    
    const deleteCategory = async () => {
      try {
        // Make an API call to delete category
        
        const response = await axiosPrivate.delete(CREATE_CATEGORY_URL+'/'+ delCategoryId)
        // Handle the successful response here (e.g., show success message)
        // Update the categories state
        setCategories((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== delCategoryId)
        );
        setSuccessMessage(response.data.message);
        setDelCategoryId('')
        setOpen(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
      
    }
    const handleDeleteClose = () => {
      setDelCategoryId('')
      setOpen(false);
    };

  useEffect(() => {
    fetchCategories()
  }, []);

  const fetchCategories = async () => {
    try {
      // Make an API call to fetch categories

      const response = await axiosPrivate.get(CREATE_CATEGORY_URL,{headers: { 'Content-Type': 'application/json' }})
      // Handle the successful response here (e.g., show success message)
    //   console.log(response.data);

      // Update the categories state
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };
  return (<>
    <Head>
      <title>
      Intranet IIRS Dashboard || Categories
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <div>
            <Typography variant="h4">
              Categories
            </Typography>
          </div>
          <div>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
                lg={4}
              >
                <CreateCategory 
                    onCreateCategory={handleCreateCategory}
                    categories={categories}
                    categoryToEdit={selectedCategory} 
                    setCategory={setSelectedCategory}
                    setSuccessMessage={setSuccessMessage}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
                lg={8}
              >
                <CategoryList
              title="Project Categories"
              categories={categories}
              onEditCategory={handleEditCategory}
              onDeleteCategory={handleDeleteCategory}
              sx={{ height: '100%' }}
            />
                
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>

    <Dialog
        open={open}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete category ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Do you really want to delete this category?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteCategory} autoFocus>
            Yes
          </Button>
          <Button onClick={handleDeleteClose}>No</Button>
        </DialogActions>
      </Dialog>

      <Snackbar 
        open={!!successMessage} 
        autoHideDuration={3000} 
        onClose={() => setSuccessMessage('')}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
        <Alert onClose={() => setSuccessMessage('')} severity="success" sx={{ width: '100%' }}>
            {successMessage}
        </Alert>
    </Snackbar>
  </>)
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
