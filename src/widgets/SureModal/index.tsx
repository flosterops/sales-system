import React, { ReactElement } from 'react';
import { Box } from 'ui/Box';
import { useModal } from 'widgets/Modal/context';
import { Column, Row } from 'ui/Layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { Button } from 'ui/Button';
import {
  AlignItemsTypes,
  AlignTextTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
  WeightTypes,
} from 'models/layout';

interface ISureModal {
  text: string;
  onAccept: () => void;
}

const SureModal = ({ text, onAccept }: ISureModal): ReactElement => {
  const { closeModal } = useModal();
  return (
    <Box padding="46px 48px 56px" componentWidth="548px">
      <Column ai={AlignItemsTypes.center}>
        <Icon type={EIconTypes.questionMark} color={colors.turquoise} fontSize="100px" />
        <Description
          fontFamily={EFontFamilies.bree}
          textAlign={AlignTextTypes.center}
          fontSize={FontSizeTypes.l}
          mtop="25px"
        >
          {text}
        </Description>
        <Row mtop="36px" jc={JustifyContentTypes.spaceBetween}>
          <Button onClick={onAccept} color={colors.primary}>
            <Description
              fontSize={FontSizeTypes.xm}
              weight={WeightTypes.w600}
              color={colors.white}
            >
              Yes
            </Description>
          </Button>
          <Button onClick={closeModal} color={colors.turquoise}>
            <Description
              fontSize={FontSizeTypes.xm}
              weight={WeightTypes.w600}
              color={colors.white}
            >
              Cancel
            </Description>
          </Button>
        </Row>
      </Column>
    </Box>
  );
};

export { SureModal };
