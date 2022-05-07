import React, { ReactElement } from 'react';
import { Box } from 'ui/Box';
import {
  ComponentSizesTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';
import { Row } from 'ui/Layout';
import { Button } from 'ui/Button';
import { EButtonsVariants, EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import question from 'assets/images/question-mark.png';
import { useModal } from 'widgets/Modal/context';
import { useDispatch } from 'react-redux';
import { logout } from 'store/reducers/user-reducer';
import { RequestPaymentTitle } from './styles';

const LogOutModal = (): ReactElement => {
  const { closeModal } = useModal();
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(logout());
    if (process.env.REACT_APP_AUTHORIZATION_PATH) {
      window.open(process.env.REACT_APP_AUTHORIZATION_PATH, '_self');
    }
    closeModal();
  };
  return (
    <Box componentWidth="548px" padding="47px 55px 42px">
      <Row jc={JustifyContentTypes.center}>
        <img src={question} alt="menu" />
      </Row>
      <Row jc={JustifyContentTypes.center}>
        <RequestPaymentTitle fontFamily={EFontFamilies.bree} fontSize={FontSizeTypes.l}>
          Are you sure you want to log out?
        </RequestPaymentTitle>
      </Row>
      <Row jc={JustifyContentTypes.spaceBetween}>
        <Button
          componentSize={ComponentSizesTypes.m}
          height="60px"
          type={EButtonTypes.submit}
          mtop="30px"
          mright="15px"
          color={colors.primary}
          onClick={handleSubmit}
        >
          <Description
            color={colors.white}
            fontSize={FontSizeTypes.xxm}
            weight={WeightTypes.w800}
          >
            Yes
          </Description>
        </Button>
        <Button
          componentSize={ComponentSizesTypes.m}
          height="60px"
          type={EButtonTypes.submit}
          mtop="30px"
          mleft="15px"
          variant={EButtonsVariants.turquoise}
          onClick={closeModal}
        >
          <Description
            color={colors.white}
            fontSize={FontSizeTypes.xxm}
            weight={WeightTypes.w800}
          >
            Cancel
          </Description>
        </Button>
      </Row>
    </Box>
  );
};

export { LogOutModal };
