import React, { useState } from 'react';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { Box, ButtonBase, Collapse } from '@mui/material';
import { SvgIcon } from '@mui/material';
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon';
import EnvelopeOpenIcon from '@heroicons/react/24/outline/EnvelopeOpenIcon';
import { useCategoryContext } from 'src/contexts/category-context';

export const SideNavItem = (props) => {
  const { disabled, external, icon, categoryId, title, subItems } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const { setCategoryId } = useCategoryContext()

  const handleMenu = (catId) => {
    setCategoryId(catId)
  }

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.04)'
          }
        }}
        onClick={() => {toggleExpand();handleMenu(categoryId)}}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title.toUpperCase()}
        </Box>
        {subItems && subItems.length > 0 && (
          <Box
            component="span"
            sx={{
              color: 'neutral.400',
              transition: 'transform 0.3s',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'
            }}
          >
        <SvgIcon fontSize="small">
          <ChevronRightIcon/>
        </SvgIcon>
          </Box>
        )}
      </ButtonBase>
      {subItems && subItems.length > 0 && (
        <Collapse in={isExpanded}>
           <Box ml={2}> 
            {subItems.map((subItem, index) => (
              <SideNavItem key={index} {...subItem} title={subItem.categoryName} icon={<SvgIcon fontSize="small">
              <EnvelopeOpenIcon />
            </SvgIcon>} categoryId={subItem._id}/>
            ))}
          </Box>
        </Collapse>
      )}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(PropTypes.object)
};
