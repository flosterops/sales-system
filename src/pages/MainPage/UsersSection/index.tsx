import React, { ReactElement, useMemo, useState } from 'react';
import { SectionContainer } from 'ui/SectionContainer';
import { Box } from 'ui/Box';
import { Column, Row } from 'ui/Layout';
import { Form } from 'widgets/Form';
import { Field } from 'widgets/Form/Field';
import { EFieldTypes, EInputTypes, IInitialUsersFormValues } from 'models/forms';
import { initialFormValues } from 'helpers/forms';
import { FormikProps } from 'formik';
import { EIconTypes } from 'models/icons';
import { Circle } from 'ui/Circle';
import { AlignItemsTypes, JustifyContentTypes } from 'models/layout';
import { colors } from 'styles/colors';
import { Icon } from 'ui/Icon';
import { Table } from 'widgets/Table';
import { NavLink } from 'ui/NavLink';
import { ERouteLinks } from 'models/route';
import { Pagination } from 'widgets/Pagination';
import { useDebounce } from 'helpers/useDebounce';
import { getGroupUserColumns } from './helpers';
import { useFetchUsers } from './hooks';

const activeSelectOptions = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
];

const UsersSection = (): ReactElement => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [filters, setFilters] = useState({ active: '', search: '' });
  const debounceFilters = useDebounce(filters, 1000);

  const { users, totalPages } = useFetchUsers({ currentPage, filters: debounceFilters });
  const columns = useMemo(() => getGroupUserColumns({}), []);

  return (
    <SectionContainer title="Users">
      <Column>
        <Box padding="30px">
          <Form initialValues={initialFormValues.users} onSubmit={() => {}}>
            {(formikProps: FormikProps<IInitialUsersFormValues>): ReactElement => (
              <>
                <Row ai={AlignItemsTypes.center} jc={JustifyContentTypes.spaceBetween}>
                  <Row componentWidth="auto">
                    <Row componentWidth="281px" mright="20px">
                      <Field
                        name="search"
                        type={EInputTypes.search}
                        value={formikProps.values.search}
                        icon={EIconTypes.search}
                        placeholder="Search user"
                        onChange={(e) =>
                          setFilters((prev) => ({ ...prev, search: e.target.value }))
                        }
                      />
                    </Row>
                    <Row componentWidth="169px">
                      <Field
                        name="active"
                        type={EFieldTypes.select}
                        value={formikProps.values.active || ''}
                        options={activeSelectOptions}
                        icon={EIconTypes.account}
                        label="Status"
                        onChange={(e) => {
                          formikProps.setFieldValue('active', e.target.value);
                          setFilters((prev) => ({ ...prev, active: e.target.value }));
                        }}
                      />
                    </Row>
                  </Row>
                  <Row componentWidth="auto">
                    <NavLink to={ERouteLinks.usersAdd}>
                      <Circle
                        componentHeight="60px"
                        componentWidth="60px"
                        bg={colors.turquoise}
                        ai={AlignItemsTypes.center}
                        jc={JustifyContentTypes.center}
                      >
                        <Icon
                          mleft="5px"
                          type={EIconTypes.userPlus}
                          color={colors.white}
                          fontSize="27px"
                          pointer
                        />
                      </Circle>
                    </NavLink>
                  </Row>
                </Row>
              </>
            )}
          </Form>
          <Table columns={columns} dataSource={users} />
          <Pagination
            pageSize={10}
            total={totalPages}
            onChange={() => setCurrentPage(currentPage + 1)}
            current={currentPage + 1}
          />
        </Box>
      </Column>
    </SectionContainer>
  );
};

export { UsersSection };
