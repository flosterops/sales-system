import { fetchUsers } from 'requests/fetch-users';
import { useEffect, useState } from 'react';
import { isError } from 'models/guards';
import { ISearchUser } from 'models/users';

interface IFetchUserFilters {
  active: string;
  search: string;
}

export interface IUseFetchUsersOptions {
  currentPage: number;
  filters: IFetchUserFilters;
}

export interface IUserSearchCriteria {
  active: boolean;
  phrase: string;
}

export interface IExpandedBody {
  criteria: IUserSearchCriteria;
  page: {
    pageNumber: number;
    pageSize: number;
  };
}

export const useFetchUsers = (options: IUseFetchUsersOptions) => {
  const { currentPage, filters } = options;
  const [users, setUsers] = useState<ISearchUser[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [trigger, setTrigger] = useState<boolean>(false);

  const updateUsers = () => setTrigger((prev) => !prev);

  useEffect(() => {
    const loadUsers = async () => {
      const body: IExpandedBody = {
        criteria: {} as IUserSearchCriteria,
        page: {
          pageNumber: currentPage,
          pageSize: 10,
        },
      };

      if (filters.active) {
        body.criteria.active = filters.active === 'active';
      }

      if (filters.search) {
        body.criteria.phrase = filters.search;
      }

      const data = await fetchUsers(body);
      if (isError(data)) {
        setUsers([]);
        setTotalPages(0);
      } else {
        setUsers(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    };

    loadUsers();
  }, [currentPage, filters, trigger]);

  return { users, totalPages, updateUsers };
};
