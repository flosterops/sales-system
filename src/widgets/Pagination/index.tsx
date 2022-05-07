import React, { ReactElement } from 'react';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { colors } from 'styles/colors';
import { Separator, StyledPagination, StyledPagPage } from './styles';

interface IPagination {
  pageSize: number;
  total: number;
  onChange: (page: number, pageSize: number) => void;
  current: number;
}

const Pagination = ({
  pageSize,
  total,
  onChange,
  current,
}: IPagination): ReactElement | null => {
  if (!total || total === 1) {
    return null;
  }
  return (
    <StyledPagination
      pageSize={pageSize}
      total={total * pageSize}
      onChange={onChange}
      current={current}
      showLessItems
      itemRender={(page, type) => {
        switch (type) {
          case 'page':
          default:
            return <StyledPagPage>{page}</StyledPagPage>;
          case 'next':
            return (
              <StyledPagPage>
                <Icon
                  type={EIconTypes.rightChevron}
                  color={colors.turquoise}
                  fontSize="18px"
                  pointer
                />
              </StyledPagPage>
            );
          case 'prev':
            return (
              <StyledPagPage>
                <Icon
                  type={EIconTypes.leftChevron}
                  color={colors.turquoise}
                  fontSize="18px"
                  pointer
                />
              </StyledPagPage>
            );
          case 'jump-prev':
          case 'jump-next':
            return <Separator>...</Separator>;
        }
      }}
    />
  );
};

export { Pagination };
