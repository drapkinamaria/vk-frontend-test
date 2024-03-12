import { useEffect, useState } from 'react';
import { Group } from '../types';
import '../css/elements.css';
import GroupCard from '../components/group-card';
import Filters from '../components/filters';
import { useFetchGroups } from '../../utils/use-fetch-groups';

function GroupsComponent(): JSX.Element {
  const { groups, isLoading } = useFetchGroups();
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [closedFilter, setClosedFilter] = useState<string>('all');
  const [colorFilter, setColorFilter] = useState<string>('any');
  const [friendsFilter, setFriendsFilter] = useState<boolean | null>(null);

  useEffect(() => {}, [closedFilter, colorFilter, friendsFilter, groups]);

  useEffect(() => {
    const filterGroups = () => {
      let tempGroups = groups;

      if (closedFilter !== 'all') {
        tempGroups = tempGroups.filter(group =>
          closedFilter === 'closed' ? group.closed : !group.closed,
        );
      }

      if (colorFilter !== 'any') {
        tempGroups = tempGroups.filter(
          group => group.avatar_color === colorFilter,
        );
      }

      if (friendsFilter !== null) {
        tempGroups = tempGroups.filter(group =>
          friendsFilter
            ? group.friends && group.friends.length > 0
            : !group.friends || group.friends.length === 0,
        );
      }

      setFilteredGroups(tempGroups);
    };

    filterGroups();
  }, [closedFilter, colorFilter, friendsFilter, groups]);

  if (isLoading) {
    return <div className='all'>Загрузка...</div>;
  }

  const uniqueColors: string[] = Array.from(
    new Set(
      groups
        .map(group => group.avatar_color)
        .filter(
          (color): color is string =>
            color !== undefined && color !== null && color.trim() !== '',
        ),
    ),
  );

  return (
    <div className='all'>
      <h1>Группы</h1>
      <Filters
        setClosedFilter={setClosedFilter}
        setColorFilter={setColorFilter}
        setFriendsFilter={setFriendsFilter}
        uniqueColors={uniqueColors}
      />
      <div className='cards'>
        {filteredGroups.length > 0 ? (
          filteredGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))
        ) : (
          <p>Группы не найдены</p>
        )}
      </div>
    </div>
  );
}

export default GroupsComponent;
