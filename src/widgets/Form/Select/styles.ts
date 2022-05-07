import { CSSProperties } from 'react';
import { colors } from 'styles/colors';
import { globalStyles } from 'styles/global';
import { zIndexes } from 'styles/constants';
import { ISelectStyleOptions } from 'models/forms';
import styled from 'styled-components';
import Select from 'react-select';

export const getDefaultSelectStyle = ({ color }: ISelectStyleOptions) => ({
  control: (styles: CSSProperties) => ({
    ...styles,
    height: globalStyles.global.componentHeight,
    outline: 'none',
    boxShadow: 'none',
    border: `2px solid ${color}`,
    borderRadius: '25px',
    width: '100%',
    padding: '0 14px 0 54px',
    fontSize: '18px',
    color: colors.placeholder,
    '&:hover': {},
    '&:last-child': {
      borderColor: 'none',
    },
    '&:focus': {},
    cursor: 'pointer',
  }),
  option: (styles: CSSProperties) => ({
    ...styles,
    width: '100%',
    color: colors.white,
    borderBottom: `2px solid ${colors.white}`,
    backgroundColor: colors.primary,
    paddingBottom: '10px',
    border: 'none',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: colors.white,
      color: colors.primary,
    },
  }),
  singleValue: (styles: CSSProperties) => ({
    ...styles,
    color: colors.placeholder,
  }),
  indicatorSeparator: (styles: CSSProperties) => ({ ...styles, display: 'none' }),
  dropdownIndicator: (styles: CSSProperties, props: any) => ({
    ...styles,
    transition: '0.4s ease all',
    padding: '0',
    transform: `rotate(${props.isFocused ? '-90deg' : '90deg'})`,
  }),
  // indicatorsContainer: (styles: CSSProperties) => ({ ...styles, top: '3px' }),
  valueContainer: (styles: CSSProperties) => ({ ...styles, padding: '0', width: '100%' }),
  menuList: (styles: CSSProperties) => ({
    ...styles,
    flexDirection: 'column',
    width: '100%',
  }),
  menu: (styles: CSSProperties) => ({
    ...styles,
    backgroundColor: colors.primary,
    color: colors.white,
    zIndex: zIndexes.selectMenu,
  }),
  placeholder: (styles: CSSProperties) => ({
    ...styles,
    fontSize: '18px',
    color: colors.placeholder,
  }),
});

export const StyledSelect = styled(Select)`
  width: 100%;
  > div:first-child {
    ${globalStyles.fonts.default};
    ${globalStyles.fontSizes.default};
    height: ${globalStyles.global.componentHeight}px;
    padding: 0 0 0 12px;
    position: relative;
  }
`;
