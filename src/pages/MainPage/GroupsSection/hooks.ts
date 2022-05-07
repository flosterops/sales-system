import { useEffect, useState } from 'react';
import { isError } from 'models/guards';
import { fetchGroups, ISearchGroup } from 'requests/fetch-groups';
import { ISelectOptionsModel } from 'widgets/Form/Select';
import { fetchApps, IAppSearch } from 'requests/fetch-apps';
import { EAppKeyTypes } from 'models/applications';
import { mapGroupSource } from '../UsersSection/helpers';

export interface IFetchUserFilters {
  appId: string;
  search: string;
}

export interface IUseFetchUsersOptions {
  currentPage: number;
  filters: IFetchUserFilters;
}

export interface IGroupSearchCriteria {
  appId: string;
  phrase: string;
  excludedIds: string[];
}

export interface IExpandedBody {
  criteria: IGroupSearchCriteria;
  page: {
    pageNumber: number;
    pageSize: number;
  };
}

export interface IAppSelectOptions extends ISelectOptionsModel {
  appKey: EAppKeyTypes | string;
}

export const useFetchGroups = (options: IUseFetchUsersOptions) => {
  const { currentPage, filters } = options;
  const [groups, setGroups] = useState<ISearchGroup[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  const mappedGroups = mapGroupSource(groups);

  useEffect(() => {
    const loadGroups = async () => {
      const body: IExpandedBody = {
        criteria: {} as IGroupSearchCriteria,
        page: {
          pageNumber: currentPage,
          pageSize: 10,
        },
      };

      if (filters.appId) {
        body.criteria.appId = filters.appId;
      }

      if (filters.search) {
        body.criteria.phrase = filters.search;
      }

      const data = await fetchGroups(body);
      if (isError(data)) {
        setGroups([]);
        setTotalPages(0);
      } else {
        setGroups(data.data.content);
        setTotalPages(data.data.totalPages);
      }
    };

    loadGroups();
  }, [currentPage, filters]);

  return { groups: mappedGroups, totalPages };
};

export const mapAppsToSelectOptions = (apps: IAppSearch[]): IAppSelectOptions[] =>
  apps.map((app: IAppSearch) => ({
    label: app.displayName,
    value: app.id,
    appKey: app.key as EAppKeyTypes,
  }));

export const useAppSelectOptions = (defaultAppSelectOptions: IAppSelectOptions[] = []) => {
  const [options, setOptions] = useState<IAppSelectOptions[]>(defaultAppSelectOptions);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchApps();

        if (isError(data)) {
          return setOptions(defaultAppSelectOptions);
        }

        return setOptions([
          ...defaultAppSelectOptions,
          ...mapAppsToSelectOptions(data.data.content),
        ]);
      } catch (e) {
        return setOptions(defaultAppSelectOptions);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  return { options, loading };
};
