# Scheduled task: FranceDomaine weekly report (Mondays)

Repos: franckj/francedomaine, franckj/ops. Read only, except the report line.

1. In francedomaine: read `data/STATUS.md` (written daily). List domains whose forwarding is not `ok`, and any NON ENREGISTRÉ row. Do not raise renewals (Franck's rule).
2. In ops: last 7 days from the events counter (`python3 -I events/q.py`, site `francedomaine.fr`):
   - `Redirect: Arrival` by domain (props.domain, props.known)
   - `Contact: Click` by domain and kind
   - page views by path (top 10), `Search` queries with no result
3. Chart (matplotlib): arrivals and contact clicks per domain. Send with `python3 -I scripts/tg.py photo <png> "<caption>"` only if Franck has a move (a lead to answer, a broken forwarding he must fix); otherwise write the numbers to ops `domains/francedomaine/REPORTS.md` and send nothing (ops rule 17).
4. Every number with its source and date.
