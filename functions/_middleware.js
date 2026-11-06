// One address only: www.francedomaine.fr answers with a permanent redirect to francedomaine.fr.
export const onRequest = ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === 'www.francedomaine.fr') {
    url.hostname = 'francedomaine.fr';
    return Response.redirect(url.toString(), 301);
  }
  return next();
};
