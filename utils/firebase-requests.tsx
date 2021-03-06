/* eslint-disable no-console */
// eslint-disable-next-line import/extensions
import { League } from './types/types';
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
