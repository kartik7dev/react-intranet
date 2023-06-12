import { useState } from 'react';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon,Button } from '@mui/material';

export const ProjectsSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleClearSearch = () => {
    setSearchValue('');
    onSearch(''); // Trigger onSearch with an empty string
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (<Card sx={{ p: 2 }}>
    <OutlinedInput
      value={searchValue}
      onChange={handleChange}
      fullWidth
      placeholder="Search projects"
      sx={{ maxWidth: 500 }}
    />
   
                <Button onClick={handleSearch} sx={{ml:'15px'}} color="info"
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <MagnifyingGlassIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                >
                  Search
                </Button>
                <Button onClick={handleClearSearch} sx={{ml:'15px'}}
                  variant="contained"
                  color="warning"
                >
                  Clear Search
                </Button>

  </Card>)
};
