import { useState, useEffect } from 'react';
import { Group } from '../src/types';
import { fetchData } from './fetch-data';

export const useFetchGroups = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataFromServer = async () => {
      const requests = [];
      for (let i = 0; i <= 13; i++) {
        requests.push(fetchData(i));
      }

      Promise.all(requests).then(results => {
        const nonNullResults = results.filter(
          result => result !== null,
        ) as Group[][];
        const validResults: Group[] = ([] as Group[]).concat(...nonNullResults);
        setGroups(validResults);
        setIsLoading(false);
      });
    };

    fetchDataFromServer();
  }, []);

  return { groups, isLoading };
};
