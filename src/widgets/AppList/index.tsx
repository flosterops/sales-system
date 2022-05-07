import React, { ReactElement, useEffect, useState } from 'react';
import { Box } from 'ui/Box';
import { Row } from 'ui/Layout';
import { Title, TitleTags } from 'ui/Title';
import { EAppKeyTypes, IApplication } from 'models/applications';
import {
  AlignItemsTypes,
  EFontFamilies,
  FontSizeTypes,
  JustifyContentTypes,
} from 'models/layout';
import { Button } from 'ui/Button';
import { EButtonTypes } from 'models/button';
import { colors } from 'styles/colors';
import { Description } from 'ui/Description';
import { useModal } from 'widgets/Modal/context';
import { useSelector } from 'react-redux';
import { TStore } from 'store';
import { Application } from './Application';
import { getApplicationColor, getApplicationPath } from './helpers';
import { ApplicationContainer } from './styles';

interface IAppList {
  applications: IApplication[];
}

const AppList = ({ applications = [] }: IAppList): ReactElement => {
  const { accessToken } = useSelector((state: TStore) => ({
    accessToken: state.user.auth.accessToken,
  }));
  const [selected, setSelected] = useState<EAppKeyTypes | ''>('');
  const { closeModal } = useModal();

  useEffect(() => {
    if (applications.length) {
      setSelected(applications[0].key);
    }
  }, [applications]);

  const handleChange = (key: EAppKeyTypes): void | null => {
    if (key !== selected) {
      return setSelected(key);
    }
    return null;
  };

  const handleSubmit = (): void => {
    const redirection = getApplicationPath(selected as EAppKeyTypes);
    if (!redirection) {
      return;
    }

    if (accessToken) {
      window.open(`${redirection}/token-page`, '_self');
    }

    closeModal();
  };

  if (!applications.length) {
    return (
      <Box padding="30px 30px 43px" componentWidth="600px">
        <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
          <Title
            tagName={TitleTags.h3}
            fontFamily={EFontFamilies.bree}
            fontSize={FontSizeTypes.xxm}
          >
            It appears you don&apos;t have permissions to access any application.
          </Title>
        </Row>
        <Row mtop="10px">
          <Description color={colors.textPrimary} fontSize={FontSizeTypes.m}>
            Please contact person who created an account for you.
          </Description>
        </Row>
        <Row mtop="68px" jc={JustifyContentTypes.flexEnd}>
          <Button color={colors.primary} type={EButtonTypes.submit} onClick={closeModal}>
            <Description color={colors.white} fontSize={FontSizeTypes.xxm}>
              Close
            </Description>
          </Button>
        </Row>
      </Box>
    );
  }

  return (
    <Box padding="30px 30px 43px" componentWidth="600px">
      <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
        <Title
          tagName={TitleTags.h3}
          fontFamily={EFontFamilies.bree}
          fontSize={FontSizeTypes.xxm}
        >
          Which application do you want to sign in?
        </Title>
      </Row>
      <Row mtop="37px">
        {applications.map(
          (application: IApplication): ReactElement => (
            <ApplicationContainer key={application.id} jc={JustifyContentTypes.center}>
              <Application
                selected={selected === application.key}
                name={application.name}
                description={application.description}
                onClick={() => handleChange(application.key)}
                bg={getApplicationColor(application.key)}
              />
            </ApplicationContainer>
          ),
        )}
      </Row>
      <Row mtop="31px" jc={JustifyContentTypes.flexEnd}>
        <Button color={colors.primary} type={EButtonTypes.submit} onClick={handleSubmit}>
          <Description color={colors.white} fontSize={FontSizeTypes.xxm}>
            Accept
          </Description>
        </Button>
      </Row>
    </Box>
  );
};

export { AppList };
