import { GroupCardProps, User } from '../types';
import { useState } from 'react';
import '../css/index.css';
import '../css/elements.css';

function GroupCard({ group }: GroupCardProps): JSX.Element {
  const [isShown, setIsShown] = useState<boolean>(false);

  const toggleFriendsList = () => {
    setIsShown(!isShown);
  };

  const FriendsList = ({ friends }: { friends: User[] }): JSX.Element => (
    <div>
      {friends.map((friend, index) => (
        <div key={index}>
          {friend.first_name} {friend.last_name}
        </div>
      ))}
    </div>
  );

  return (
    <div className='group-card' key={group.id}>
      {group.avatar_color && (
        <div
          className='avatar'
          style={{
            backgroundColor: group.avatar_color,
          }}
        ></div>
      )}
      <div>
        <div>Название группы: {group.name}</div>
        <div>Тип группы: {group.closed ? 'Закрытая' : 'Открытая'}</div>
        <div>Количество подписчиков: {group.members_count}</div>
        {group.friends && group.friends.length > 0 && (
          <div onClick={toggleFriendsList}>
            Количество друзей: {group.friends.length}
            {isShown && <FriendsList friends={group.friends} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupCard;
