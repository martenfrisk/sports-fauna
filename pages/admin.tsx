/* eslint-disable consistent-return */
/* eslint-disable no-tabs */
import GuessItem from '@/components/admin/guess-item';
import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout';
import { db } from '@/utils/firebase';
import { isEventFinished } from '@/utils/converters';

import {
  withAuthUser,
  AuthAction,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

const Admin = ({
  events,
  users,
  eventsLastUpdate,
  isAdmin,
}: {
  events: any;
  users: any;
  eventsLastUpdate: any;
  isAdmin: any;
}) => {
  const [updateMsg, setUpdateMsg] = useState('');
  const importEvents = async () => {
    await fetch('/api/functions/events-import', {
      method: 'POST',
      body: JSON.stringify({ league: 2021 }),
    })
      .then((res) => res.text())
      .then((data) => setUpdateMsg(data));
  };

  return (
    <Layout>
      <div className="min-h-screen my-10">
        {isAdmin ? (
          <>
            {eventsLastUpdate && (
              <div>
                <p>
                  Events last imported:
                  {' '}
                  {new Date(eventsLastUpdate).toDateString()}
                  {' '}
                  -
                  {' '}
                  {new Date(eventsLastUpdate).getHours()}
                </p>
                <p>
                  Today:
                  {new Date().toDateString()}
                </p>
                {updateMsg === '' ? (
                  <button
                    onClick={importEvents}
                    className="px-2 py-px border-2 border-blue-400 rounded-md"
                    type="button"
                  >
                    Click to import new events/results
                  </button>
                ) : (
                  <p>{updateMsg}</p>
                )}
              </div>
            )}
            {users && (
              <div>
                <p className="mb-2 text-lg">Users</p>
                {users.map((user) => (
                  <div key={user.id} className="mb-4 ml-2">
                    <p>
                      User:
                      {user.email}
                    </p>
                    {user.guess && (
                      <>
                        {Object.entries(user.guess).map(
                          ([guessKey, guessValue]) => (
                            <>
                              <p>
                                League name:
                                {guessKey}
                              </p>
                              {Object.entries(guessValue).map(
                                // eslint-disable-next-line array-callback-return
                                ([eventId, guessOptions]) => {
                                  const event = events.find(
                                    (i) => i.id === guessOptions.eventId,
                                  );
                                  if (
                                    isEventFinished(
                                      new Date(guessOptions.eventDate),
                                    )
                                    && !guessOptions.corrected
                                    && eventId !== 'points'
                                    && event.score.winner
                                  ) {
                                    return (
                                      <div
                                        key={eventId}
                                        className="px-4 py-2 my-2 bg-blue-50"
                                      >
                                        <p className="mb-2 text-lg">
                                          Event id:
                                          {' '}
                                          {eventId}
                                        </p>
                                        <GuessItem
                                          guessOptions={guessOptions}
                                          userId={user.id}
                                          leagueId={guessKey}
                                          key={`${guessKey}-${eventId}`}
                                          eventId={eventId}
                                          event={event}
                                        />
                                      </div>
                                    );
                                  }
                                },
                              )}
                            </>
                          ),
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            <div>Looks like you ended up here by accident. Go home.</div>
            <Link href="/">
              <a className="btn-blue">Back</a>
            </Link>
          </>
        )}

        {/* {userID ? (
					userID.admin ? (
						<div>
							<div>
								<details>
									<summary>Update standings</summary>
									{pastEventsWithGuess && pastEventsWithGuess.map((event: Event) => {
										const resultForThis = results.find(x => x.eventId === event.eventId)
										if (event) {
											getEventResult(event.eventId)
										}
										return (
											<FinishedEvents key={event._id}
											resultForThis={resultForThis}
											event={event}
											updateStandings={updateStandings}
											setStandingsUpdated={setStandingsUpdated}
											standingsUpdated={standingsUpdated} />
										)
									})}
								</details>
							</div>
							<details>
								<summary>
							Populate database with events

								</summary>
								{data && (
									data.allTeams.data.map((team: TeamType) => {
										const games = [
											...team.awayEvents.data,
											...team.homeEvents.data].sort((a, b) => b._ts - a._ts )
										return (
											<div key={team._id} className="flex justify-between w-full ">
												<span>
													{team.teamName}
												</span>
												<span className="text-xs">
										Last updated: {new Date(games[0]._ts / 1000 ).toUTCString()}
												</span>
												<button
												// onClick={() => getEventsAndPopulateDB(
													token, team.teamId, team._id, data.allTeams.data)}
												>
										Get events
												</button>
												<span>{team.awayEvents.data.length === 0 &&
													team.awayEvents.data.length === 0 ? (
													<span className="bg-red-100">
											No events
													</span>
												) : (
													<span className="bg-green-100">
												Has events
													</span>
												)}</span>
											</div>
										)})
								)}

							</details>
							{users && (
								<details>
									<summary>User administration</summary>
									{users.allUsers.data.map(user => (
										<EditUser key={user._id} user={user} token={token} />
									))}
								</details>
							)}
						</div>
					) : (

					)
				) : (
					<div>Loading...</div>
				)} */}
      </div>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(async ({ AuthUser }) => {
  // const token = await AuthUser.getIdToken()
  const users = [];
  await db
    .ref('users')
    .once('value')
    .then((DataSnapshot) => {
      DataSnapshot.forEach((singleUser) => {
        users.push({ ...singleUser.val(), id: singleUser.key });
      });
    });
  const events = [];
  await db
    .ref('teams/2021')
    .once('value')
    .then((TeamSnapshot) => {
      TeamSnapshot.forEach((singleTeam) => {
        const teamId = singleTeam.child('id').val();
        singleTeam.child('events').forEach((EventSnap) => {
          events.push({
            ...EventSnap.val(),
            teamId,
          });
        });
      });
    });
  let eventsLastUpdate = '';
  await db
    .ref('teams/updateHistory/lastUpdate')
    .once('value')
    // eslint-disable-next-line no-return-assign
    .then((Snap) => (eventsLastUpdate = Snap.val()));
  const isAdmin = await db
    .ref(`users/${AuthUser.id}`)
    .get()
    .then((data) => data.child('admin').exists());
  return {
    props: {
      users: users || null,
      events: events || null,
      eventsLastUpdate: eventsLastUpdate || null,
      isAdmin: isAdmin || null,
    },
  };
});

export default withAuthUser()(Admin);
