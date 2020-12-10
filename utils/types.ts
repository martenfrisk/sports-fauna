export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  Long: any;
  Time: any;
};








export type DivisionType = {
  __typename?: 'DivisionType';
  divisionId?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  teams: TeamTypePage;
  country?: Maybe<Scalars['String']>;
  divisionName?: Maybe<Scalars['String']>;
  events: EventPage;
  _ts: Scalars['Long'];
};


export type DivisionTypeTeamsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type DivisionTypeEventsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type DivisionTypeEventsRelation = {
  create?: Maybe<Array<Maybe<EventInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type DivisionTypeInput = {
  divisionId?: Maybe<Scalars['String']>;
  divisionName?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  teams?: Maybe<DivisionTypeTeamsRelation>;
  events?: Maybe<DivisionTypeEventsRelation>;
};

export type DivisionTypePage = {
  __typename?: 'DivisionTypePage';
  data: Array<Maybe<DivisionType>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type DivisionTypeTeamsRelation = {
  create?: Maybe<Array<Maybe<TeamTypeInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Event = {
  __typename?: 'Event';
  divisionId?: Maybe<DivisionType>;
  awayTeamName?: Maybe<Scalars['String']>;
  lastUpdate?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  homeTeamId?: Maybe<TeamType>;
  dateTime?: Maybe<Scalars['String']>;
  eventId?: Maybe<Scalars['String']>;
  divisionName?: Maybe<Scalars['String']>;
  submittedGuesses: UserGuessPage;
  awayTeamId?: Maybe<TeamType>;
  homeTeamName?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  _ts: Scalars['Long'];
};


export type EventSubmittedGuessesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type EventAwayTeamIdRelation = {
  create?: Maybe<TeamTypeInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type EventDivisionIdRelation = {
  create?: Maybe<DivisionTypeInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type EventHomeTeamIdRelation = {
  create?: Maybe<TeamTypeInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type EventInput = {
  eventId?: Maybe<Scalars['String']>;
  lastUpdate?: Maybe<Scalars['String']>;
  homeTeamName?: Maybe<Scalars['String']>;
  awayTeamName?: Maybe<Scalars['String']>;
  homeTeamId?: Maybe<EventHomeTeamIdRelation>;
  awayTeamId?: Maybe<EventAwayTeamIdRelation>;
  dateTime?: Maybe<Scalars['String']>;
  venue?: Maybe<Scalars['String']>;
  divisionId?: Maybe<EventDivisionIdRelation>;
  divisionName?: Maybe<Scalars['String']>;
  submittedGuesses?: Maybe<EventSubmittedGuessesRelation>;
};

export type EventPage = {
  __typename?: 'EventPage';
  data: Array<Maybe<Event>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type EventSubmittedGuessesRelation = {
  create?: Maybe<Array<Maybe<UserGuessInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type League = {
  __typename?: 'League';
  standings: StandingsPage;
  name: Scalars['String'];
  _id: Scalars['ID'];
  slug: Scalars['String'];
  options: LeagueOptions;
  members: UserPage;
  _ts: Scalars['Long'];
};


export type LeagueStandingsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type LeagueMembersArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type LeagueInput = {
  name: Scalars['String'];
  slug: Scalars['String'];
  members?: Maybe<LeagueMembersRelation>;
  options?: Maybe<LeagueOptionsRelation>;
  standings?: Maybe<LeagueStandingsRelation>;
};

export type LeagueMembersRelation = {
  create?: Maybe<Array<Maybe<UserInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type LeagueOptions = {
  __typename?: 'LeagueOptions';
  _id: Scalars['ID'];
  teams?: Maybe<Array<Maybe<TeamType>>>;
  public?: Maybe<Scalars['Boolean']>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  class?: Maybe<LeagueType>;
  _ts: Scalars['Long'];
};

export type LeagueOptionsInput = {
  class?: Maybe<LeagueType>;
  divisions?: Maybe<Array<Maybe<Scalars['String']>>>;
  teams?: Maybe<Array<Maybe<Scalars['ID']>>>;
  public?: Maybe<Scalars['Boolean']>;
};

export type LeagueOptionsRelation = {
  create?: Maybe<LeagueOptionsInput>;
  connect?: Maybe<Scalars['ID']>;
};

export type LeaguePage = {
  __typename?: 'LeaguePage';
  data: Array<Maybe<League>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type LeagueStandingsRelation = {
  create?: Maybe<Array<Maybe<StandingsInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export enum LeagueType {
  Singleteam = 'SINGLETEAM',
  Singledivision = 'SINGLEDIVISION',
  Multiteam = 'MULTITEAM',
  Multidivision = 'MULTIDIVISION',
  Any = 'ANY'
}


export type Mutation = {
  __typename?: 'Mutation';
  updateUser?: Maybe<User>;
  createUser: User;
  deleteUserGuess?: Maybe<UserGuess>;
  createDivisionType: DivisionType;
  deleteLeague?: Maybe<League>;
  deleteTeamType?: Maybe<TeamType>;
  updateEvent?: Maybe<Event>;
  createUserGuess: UserGuess;
  updateDivisionType?: Maybe<DivisionType>;
  updateUserGuess?: Maybe<UserGuess>;
  createLeague: League;
  deleteDivisionType?: Maybe<DivisionType>;
  updateLeague?: Maybe<League>;
  updateTeamType?: Maybe<TeamType>;
  deleteStandings?: Maybe<Standings>;
  deleteUser?: Maybe<User>;
  deleteLeagueOptions?: Maybe<LeagueOptions>;
  createLeagueOptions: LeagueOptions;
  createEvent: Event;
  createStandings: Standings;
  createTeamType: TeamType;
  updateLeagueOptions?: Maybe<LeagueOptions>;
  deleteEvent?: Maybe<Event>;
  updateStandings?: Maybe<Standings>;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  data: UserInput;
};


export type MutationCreateUserArgs = {
  data: UserInput;
};


export type MutationDeleteUserGuessArgs = {
  id: Scalars['ID'];
};


export type MutationCreateDivisionTypeArgs = {
  data: DivisionTypeInput;
};


export type MutationDeleteLeagueArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteTeamTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateEventArgs = {
  id: Scalars['ID'];
  data: EventInput;
};


export type MutationCreateUserGuessArgs = {
  data: UserGuessInput;
};


export type MutationUpdateDivisionTypeArgs = {
  id: Scalars['ID'];
  data: DivisionTypeInput;
};


export type MutationUpdateUserGuessArgs = {
  id: Scalars['ID'];
  data: UserGuessInput;
};


export type MutationCreateLeagueArgs = {
  data: LeagueInput;
};


export type MutationDeleteDivisionTypeArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateLeagueArgs = {
  id: Scalars['ID'];
  data: LeagueInput;
};


export type MutationUpdateTeamTypeArgs = {
  id: Scalars['ID'];
  data: TeamTypeInput;
};


export type MutationDeleteStandingsArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLeagueOptionsArgs = {
  id: Scalars['ID'];
};


export type MutationCreateLeagueOptionsArgs = {
  data: LeagueOptionsInput;
};


export type MutationCreateEventArgs = {
  data: EventInput;
};


export type MutationCreateStandingsArgs = {
  data: StandingsInput;
};


export type MutationCreateTeamTypeArgs = {
  data: TeamTypeInput;
};


export type MutationUpdateLeagueOptionsArgs = {
  id: Scalars['ID'];
  data: LeagueOptionsInput;
};


export type MutationDeleteEventArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateStandingsArgs = {
  id: Scalars['ID'];
  data: StandingsInput;
};

export type Query = {
  __typename?: 'Query';
  allEvents: EventPage;
  findEventByID?: Maybe<Event>;
  findStandingsByID?: Maybe<Standings>;
  allGuesses: UserGuessPage;
  findGuessByUserId: QueryFindGuessByUserIdPage;
  findUserGuessByID?: Maybe<UserGuess>;
  allUsers: UserPage;
  findUserByID?: Maybe<User>;
  findTeamTypeByID?: Maybe<TeamType>;
  allLeagues: LeaguePage;
  findLeagueByID?: Maybe<League>;
  allTeams: TeamTypePage;
  findDivisionTypeByID?: Maybe<DivisionType>;
  findLeague: QueryFindLeaguePage;
  findLeagueOptionsByID?: Maybe<LeagueOptions>;
};


export type QueryAllEventsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindEventByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindStandingsByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllGuessesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindGuessByUserIdArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  user: Scalars['ID'];
};


export type QueryFindUserGuessByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllUsersArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindUserByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindTeamTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllLeaguesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindLeagueByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAllTeamsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type QueryFindDivisionTypeByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindLeagueArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
};


export type QueryFindLeagueOptionsByIdArgs = {
  id: Scalars['ID'];
};

export type QueryFindGuessByUserIdPage = {
  __typename?: 'QueryFindGuessByUserIdPage';
  data: Array<Maybe<UserGuess>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type QueryFindLeaguePage = {
  __typename?: 'QueryFindLeaguePage';
  data: Array<Maybe<League>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type Standings = {
  __typename?: 'Standings';
  _id: Scalars['ID'];
  league?: Maybe<League>;
  points?: Maybe<Scalars['Int']>;
  member?: Maybe<User>;
  _ts: Scalars['Long'];
};

export type StandingsInput = {
  member?: Maybe<StandingsMemberRelation>;
  points?: Maybe<Scalars['Int']>;
  league?: Maybe<StandingsLeagueRelation>;
};

export type StandingsLeagueRelation = {
  create?: Maybe<LeagueInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type StandingsMemberRelation = {
  create?: Maybe<UserInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type StandingsPage = {
  __typename?: 'StandingsPage';
  data: Array<Maybe<Standings>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type TeamType = {
  __typename?: 'TeamType';
  teamName?: Maybe<Scalars['String']>;
  teamId?: Maybe<Scalars['String']>;
  _id: Scalars['ID'];
  homeEvents: EventPage;
  country?: Maybe<Scalars['String']>;
  division: DivisionTypePage;
  inLeagues?: Maybe<Array<Maybe<LeagueOptions>>>;
  awayEvents: EventPage;
  badge?: Maybe<Scalars['String']>;
  _ts: Scalars['Long'];
};


export type TeamTypeHomeEventsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TeamTypeDivisionArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};


export type TeamTypeAwayEventsArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type TeamTypeAwayEventsRelation = {
  create?: Maybe<Array<Maybe<EventInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TeamTypeDivisionRelation = {
  create?: Maybe<Array<Maybe<DivisionTypeInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TeamTypeHomeEventsRelation = {
  create?: Maybe<Array<Maybe<EventInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TeamTypeInput = {
  teamId?: Maybe<Scalars['String']>;
  teamName?: Maybe<Scalars['String']>;
  division?: Maybe<TeamTypeDivisionRelation>;
  badge?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  homeEvents?: Maybe<TeamTypeHomeEventsRelation>;
  awayEvents?: Maybe<TeamTypeAwayEventsRelation>;
  inLeagues?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type TeamTypePage = {
  __typename?: 'TeamTypePage';
  data: Array<Maybe<TeamType>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  leagues: LeaguePage;
  email: Scalars['String'];
  role?: Maybe<UserRole>;
  username: Scalars['String'];
  _id: Scalars['ID'];
  guesses?: Maybe<Array<Maybe<UserGuess>>>;
  favTeam?: Maybe<Scalars['String']>;
  _ts: Scalars['Long'];
};


export type UserLeaguesArgs = {
  _size?: Maybe<Scalars['Int']>;
  _cursor?: Maybe<Scalars['String']>;
};

export type UserGuess = {
  __typename?: 'UserGuess';
  winner?: Maybe<WinnerEnum>;
  _id: Scalars['ID'];
  score?: Maybe<Array<Maybe<Scalars['String']>>>;
  eventId?: Maybe<Event>;
  apiEventId?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  _ts: Scalars['Long'];
};

export type UserGuessEventIdRelation = {
  create?: Maybe<EventInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type UserGuessInput = {
  eventId?: Maybe<UserGuessEventIdRelation>;
  apiEventId?: Maybe<Scalars['String']>;
  user?: Maybe<UserGuessUserRelation>;
  score?: Maybe<Array<Maybe<Scalars['String']>>>;
  winner?: Maybe<WinnerEnum>;
};

export type UserGuessPage = {
  __typename?: 'UserGuessPage';
  data: Array<Maybe<UserGuess>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export type UserGuessUserRelation = {
  create?: Maybe<UserInput>;
  connect?: Maybe<Scalars['ID']>;
  disconnect?: Maybe<Scalars['Boolean']>;
};

export type UserInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  favTeam?: Maybe<Scalars['String']>;
  leagues?: Maybe<UserLeaguesRelation>;
  role?: Maybe<UserRole>;
  guesses?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UserLeaguesRelation = {
  create?: Maybe<Array<Maybe<LeagueInput>>>;
  connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
  disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UserPage = {
  __typename?: 'UserPage';
  data: Array<Maybe<User>>;
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Guest = 'GUEST',
  Member = 'MEMBER'
}

export enum WinnerEnum {
  Homewin = 'HOMEWIN',
  Draw = 'DRAW',
  Awaywin = 'AWAYWIN'
}
