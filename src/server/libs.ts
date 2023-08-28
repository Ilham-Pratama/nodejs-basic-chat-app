import http from 'http';

export const getCurrentSessionFromSocket = (
  session: http.IncomingMessage,
) => {
  const firstSessionObjectKey = Object.keys(
    session.sessionStore.sessions,
  )[0];

  if (!firstSessionObjectKey) return {};

  const res = JSON.parse(
    (session.sessionStore.sessions[firstSessionObjectKey] ||
      '') as string,
  );

  console.dir(res);
  console.dir(session.session);

  return res;
};
