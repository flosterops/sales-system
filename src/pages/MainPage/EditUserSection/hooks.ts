import { useEffect, useState } from 'react';
import { getUser } from 'requests/fetch-users';
import { ISearchUser } from 'models/users';
import { isError } from 'models/guards';

export const useGetUser = (id: string) => {
  const [user, setUser] = useState<ISearchUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const loadUser = async (): Promise<void> => {
      try {
        const data = await getUser(id);
        if (isError(data)) {
          return setUser(null);
        }
        return setUser(data.data);
      } catch (e: any) {
        console.error(e.message);
        return setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return { loading, user };
};
