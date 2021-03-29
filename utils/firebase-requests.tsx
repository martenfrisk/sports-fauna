/* eslint-disable no-console */
import { gql, request } from 'graphql-request';
import { graphQLClient } from '@/utils/graphql-client';
// eslint-disable-next-line import/extensions
import { League, TeamType, UserGuess } from './types/types';
import { auth, db } from './firebase';

export const updateUserGuess = async (
  userId: string,
  eventId: number,
  leagueName: string,
  guess: string,
  eventDate: Date,
  teamId: any,
) => {
  await db
    .ref(`/users/${userId}/guess/${leagueName}/${eventId}`)
    .set({
      guess, corrected: false, eventDate, team: teamId, eventId,
    })
    .catch((error) => console.error(error));
};

export const getEvents = async (team: TeamType, setEvents: any) => {
  const query = gql`
    query GetEvents($teamId: ID) {
      eventsNext(teamId: $teamId) {
        home {
          name
          id
        }
        away {
          name
          id
        }
        name
        dateTime
        league {
          name
        }
      }
    }
  `;
  const variables = {
    teamId: team.teamId,
  };
  try {
    request('https://sportsdb.netlify.app/', query, variables).then(
      ({ eventsNext }) => {
        setEvents((prev: any) => [
          ...prev,
          {
            name: team.teamName,
            events: eventsNext,
          },
        ]);
      },
    );
  } catch (err) {
    console.error(err);
  }
};

export const getEventsFromDb = async (leagueId: string, teamId: string) => {
  const events = [];
  await db
    .ref(`/teams/${leagueId}/${teamId}/events`)
    .once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        events.push({ ...snap.val() });
      });
    });
  return events;
};

export const getLeaguesByUser = async (userId: string) => {
  const leagues = [];
  await db.ref(`/users/${userId}/leagues`).once('value', (snapshot) => {
    snapshot.forEach((snap) => {
      leagues.push(snap.key);
    });
  });
  return leagues;
};

export const getLeaguesWithTeams = async (
  token: string,
  id: any,
  setLeagues: any,
) => {
  const query = gql`
    query FindUser($id: ID!) {
      findUserByID(id: $id) {
        username
        leagues {
          data {
            name
            slug
          }
        }
      }
    }
  `;

  await graphQLClient(token)
    .request(query, { id })
    .then((res) => {
      setLeagues(() => res.findUserByID);
      console.log(res);
    })
    .catch((error) => console.error(error));
};

export const getLeagues = async () => {
  const teams = [];
  await db.ref('/leagues').once('value', (snapshot) => {
    snapshot.forEach((snap) => {
      teams.push({ ...snap.val() });
    });
  });
  return teams;
};

export const getAllTeams = async (leagueId: string) => {
  const teams = [];
  try {
    db.ref(`teams/${leagueId}`)
      .once('value')
      .then((snapshot) => {
        snapshot.forEach((snap) => {
          const team = snap.val();
          teams.push({
            id: team.id,
            crestUrl: team.crestUrl,
            name: team.name,
            shortName: team.shortName,
          });
        });
      });
  } catch (error) {
    console.error(error);
  }
  return teams;
};

export const RemoveGuess = async (token: string, id: UserGuess['_id']) => {
  const query = gql`
    mutation RemoveUserGuess($id: ID!) {
      deleteUserGuess(id: $id) {
        user {
          username
        }
      }
    }
  `;
  try {
    await graphQLClient(token).request(query, { id });
  } catch (err) {
    console.error(err);
  }
};

export const FindUserGuessByID = async (user: string, leagueName: string) => {
  const res = [];
  try {
    await db
      .ref(`users/${user}/guess/${leagueName}`)
      .once('value', (snapshot) => {
        snapshot.forEach((snap) => {
          res.push({ event: snap.key, guess: snap.val() });
        });
      });
  } catch (error) {
    console.error(error);
  }
  return res;
};

export const FindLeague = async (slug: League['slug']) => {
  const res = await db
    .ref(`leagues/${slug}`)
    .get()
    .then((data) => data.toJSON());
  return res;
};

export const getAllTeamTypes = async (token: string) => {
  const query = gql`
    {
      allTeams {
        data {
          _id
          teamId
          teamName
          badge
        }
      }
    }
  `;
  const res = await graphQLClient(token).request(query);
  return res;
};

export const updateLeagueOptions = async (
  slug: string,
  isPublic: boolean,
  pickedTeam: unknown,
  setUpdateMessage: any,
  setErrorMessage: any,
) => {
  db.ref(`leagues/${slug}`)
    .update({
      public: isPublic,
      teams: pickedTeam,
    })
    .then(() => setUpdateMessage('Updated'))
    .catch((error) => setErrorMessage(error));
};

export const getNewLeagueData = async () => {
  const res = [];
  try {
    await db.ref('leagues').once('value', (snapshot) => {
      snapshot.forEach((snap) => {
        res.push({ ...snap.val() });
      });
    });
  } catch (error) {
    console.error(error);
  }
  return res;
};

export const getUser = async () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      return user;
    }
    throw new Error('User not found');
  });
};

export const joinLeague = async (
  league: {
    id: string;
    name: string;
  },
  user: {
    id: string;
    name: string;
  },
) => {
  db.ref(`/users/${user.id}/leagues/${league.name}`).set('');
  db.ref(`/leagues/${league.name}/members/${user.id}`).set({
    username: user.name,
  });
};
export const leaveLeague = async (
  league: {
    id: string;
    name: string;
  },
  user: {
    id: string;
    name: string;
  },
) => {
  db.ref(`/users/${user.id}/leagues/${league.name}`).remove();
  db.ref(`/leagues/${league.name}/members/${user.id}`).remove();
};
