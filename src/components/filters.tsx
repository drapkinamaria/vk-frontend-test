import { FiltersProps } from '../types';
import '../css/elements.css';

function Filters({
  setClosedFilter,
  setColorFilter,
  setFriendsFilter,
  uniqueColors,
}: FiltersProps): JSX.Element {
  const handleFriendsFilterChange = (value: string) => {
    if (value === 'true') {
      setFriendsFilter(true);
    } else if (value === 'false') {
      setFriendsFilter(false);
    } else {
      setFriendsFilter(null);
    }
  };

  return (
    <div className='filters'>
      <div className='filter-item'>
        <label htmlFor='closedFilter'>Статус группы:</label>
        <select
          id='closedFilter'
          onChange={e => setClosedFilter(e.target.value)}
        >
          <option value='all'>все</option>
          <option value='closed'>закрытые</option>
          <option value='open'>открытые</option>
        </select>
      </div>
      <div className='filter-item'>
        <label htmlFor='colorFilter'>Цвет аватара:</label>
        <select id='colorFilter' onChange={e => setColorFilter(e.target.value)}>
          <option value='any'>любой</option>
          {uniqueColors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <div className='filter-item'>
        <label htmlFor='friendsFilter'>Друзья в группе:</label>
        <select
          id='friendsFilter'
          onChange={e => handleFriendsFilterChange(e.target.value)}
        >
          <option value='null'>все группы</option>
          <option value='true'>с друзьями</option>
          <option value='false'>без друзей</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
