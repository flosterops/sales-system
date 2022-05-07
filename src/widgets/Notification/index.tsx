import React, { ReactElement } from 'react';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { AlignItemsTypes, FontSizeTypes, JustifyContentTypes } from 'models/layout';
import { ENotificationTypes } from 'models/notification';
import { useNotification } from './context';
import { NotificationContainer } from './styles';

const Notification = (): ReactElement | null => {
  const { options } = useNotification();
  const bg =
    options && options.type === ENotificationTypes.success ? colors.turquoise : colors.error;

  return (
    <NotificationContainer
      componentWidth="350px"
      padding="10px"
      bg={bg}
      ai={AlignItemsTypes.center}
      jc={JustifyContentTypes.center}
      visible={!!options}
    >
      <Description color={colors.white} fontSize={FontSizeTypes.s}>
        {options && options.text}
      </Description>
    </NotificationContainer>
  );
};

export { Notification };
