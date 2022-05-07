import React, { ReactElement } from 'react';
import { Header } from 'widgets/Header';
import { Column } from 'ui/Layout';
import { AlignItemsTypes } from 'models/layout';
import { ProfileForm } from './ProfileForm';

const ProfilePage = (): ReactElement => (
  <>
    <Header />
    <Column ai={AlignItemsTypes.center} padding="40px">
      <ProfileForm />
    </Column>
  </>
);

export { ProfilePage };
