import React, { ReactElement, useState } from 'react';
import { SectionContainer } from 'ui/SectionContainer';
import { Box } from 'ui/Box';
import { Row } from 'ui/Layout';
import { Form } from 'widgets/Form';
import { FormikProps } from 'formik';
import { Field } from 'widgets/Form/Field';
import { initialFormValues } from 'helpers/forms';
import { EFieldTypes, EInputTypes, IInitialGroupsFormValues } from 'models/forms';
import { Circle } from 'ui/Circle';
import { colors } from 'styles/colors';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { Icon } from 'ui/Icon';
import { EIconTypes } from 'models/icons';
import { Table } from 'widgets/Table';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { useDebounce } from 'helpers/useDebounce';
import { Pagination } from 'widgets/Pagination';
import { groupsColumns } from './helpers';
import { useAppSelectOptions, useFetchGroups } from './hooks';

const GroupsSection = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState({ appId: '', search: '' });
  const debouncedFilters = useDebounce(filters, 1000);

  const { groups, totalPages } = useFetchGroups({ filters: debouncedFilters, currentPage });
  const { options: appSelectOptions } = useAppSelectOptions([
    { label: 'All', value: '', appKey: '' },
  ]);

  return (
    <SectionContainer title="Groups">
      <Box padding="30px">
        <Form initialValues={initialFormValues.groups} onSubmit={() => {}}>
          {(formikProps: FormikProps<IInitialGroupsFormValues>): ReactElement => (
            <Row jc={JustifyContentTypes.spaceBetween} ai={AlignItemsTypes.center}>
              <Row componentWidth="auto">
                <Row componentWidth="280px" mright="20px">
                  <Field
                    name="search"
                    type={EInputTypes.text}
                    value={formikProps.values.search}
                    placeholder="Group name..."
                    icon={EIconTypes.search}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, search: e.target.value }))
                    }
                  />
                </Row>
                <Row componentWidth="280px">
                  <Field
                    name="appId"
                    type={EFieldTypes.select}
                    value={formikProps.values.appId}
                    options={appSelectOptions}
                    placeholder="Select application..."
                    label="Application"
                    icon={EIconTypes.account}
                    onChange={(e) => {
                      setFilters((prev) => ({ ...prev, appId: e.target.value }));
                      formikProps.setFieldValue('appId', e.target.value);
                    }}
                  />
                </Row>
              </Row>
              <NavLink to={ERouteLinks.groupsAdd}>
                <Circle
                  componentHeight="60px"
                  componentWidth="60px"
                  bg={colors.turquoise}
                  ai={AlignItemsTypes.center}
                  jc={JustifyContentTypes.center}
                >
                  <Icon type={EIconTypes.plus} color={colors.white} fontSize="30px" pointer />
                </Circle>
              </NavLink>
            </Row>
          )}
        </Form>
        <Table columns={groupsColumns} dataSource={groups} />
        <Pagination
          pageSize={10}
          total={totalPages}
          onChange={() => setCurrentPage(currentPage + 1)}
          current={currentPage}
        />
      </Box>
    </SectionContainer>
  );
};

export { GroupsSection };
