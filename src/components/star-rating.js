import React from 'react';
import StarIcon from '@heroicons/react/24/solid/StarIcon';
import { SvgIcon, styled } from '@mui/material';

const StarRating = ({ rating }) => {
  return (
    <div>
      {Array.from({ length: rating }, (_, index) => (
        <SvgIcon key={index} fontSize="small" color='primary'>
                <StarIcon fontSize="small" />
        </SvgIcon>
      ))}
    </div>
  );
};

export default StarRating;