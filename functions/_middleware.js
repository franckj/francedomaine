// Runs before every request.
// 1. One address only: www.francedomaine.fr answers with a permanent redirect to francedomaine.fr.
// 2. /r/<domain>[/anything]: a listed name 302s to its page, tagged ?via=redirect for the arrival event.
//    Done here, not in _redirects: Pages applied only about the first 100 lines of that file (found 2026-11-06,
//    names past line ~102 and the old category 301s answered 404). Unlisted names fall through to the
//    "/r/*  /a-vendre/  200" rewrite in _redirects.
import db from '../src/data/domains.json';

const listed = new Set(db.filter((d) => d.status === 'disponible' || d.status === 'reserve').map((d) => d.id.toLowerCase()));

export const onRequest = ({ request, next }) => {
  const url = new URL(request.url);
  if (url.hostname === 'www.francedomaine.fr') {
    url.hostname = 'francedomaine.fr';
    return Response.redirect(url.toString(), 301);
  }
  const m = url.pathname.match(/^\/r\/([^/]+)/);
  if (m) {
    let name = m[1];
    try { name = decodeURIComponent(name); } catch {}
    name = name.toLowerCase();
    if (listed.has(name)) return Response.redirect(`${url.origin}/domaines/${name.replace(/\./g, '-')}/?via=redirect`, 302);
  }
  return next();
};
