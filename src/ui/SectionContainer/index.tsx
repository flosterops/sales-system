import React, { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { Column } from 'ui/Layout';
import { Title, TitleTags } from 'ui/Title';
import { EFontFamilies, FontSizeTypes, ISpaceTypes } from 'models/layout';

interface ISectionContainer extends ISpaceTypes {
  title: string | ReactNode;
}

const SectionContainer = ({
  title,
  children,
  ...props
}: PropsWithChildren<ISectionContainer>): ReactElement => (
  <Column {...props}>
    <Title
      mbottom="14px"
      tagName={TitleTags.h2}
      fontFamily={EFontFamilies.bree}
      fontSize={FontSizeTypes.l}
    >
      {title}
    </Title>
    {children}
  </Column>
);

export { SectionContainer };
