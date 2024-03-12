export type User = {
  first_name: string;
  last_name: string;
};

export type Group = {
  id: number;
  name: string;
  closed: boolean;
  avatar_color?: string;
  members_count: number;
  friends?: User[];
};

export type GetGroupsResponse = {
  result: 1 | 0;
  data?: Group[];
};

export type GroupCardProps = {
  group: Group;
};

export type FiltersProps = {
  setClosedFilter: React.Dispatch<React.SetStateAction<string>>;
  setColorFilter: React.Dispatch<React.SetStateAction<string>>;
  setFriendsFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
  uniqueColors: string[];
};
