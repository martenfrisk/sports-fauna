export const fetcher = (url) => fetch(url).then((r) => r.json());

export const convertWinner = (winner) => {
  switch (winner) {
    case 'HOME_TEAM':
      return '1';
    case 'AWAY_TEAM':
      return '2';
    case 'DRAW':
      return 'X';
    default:
      return 'error';
  }
};

export const snapshotToArray = (snapshot) => (
  Object.entries(snapshot).map((e) => Object.assign(e[1], { key: e[0] }))
);
