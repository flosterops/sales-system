import styled from 'styled-components';
import { Form, Formik } from 'formik';
import { styledSpace } from 'styles/functions';

export const StyledFormik = styled(Formik)<any>`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  ${styledSpace};
  width: ${(props): string => props.componentWidth};
`;

export const StyledForm = styled(Form)`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
