# contact@francedomaine.fr (checked 2026-11-06, public DNS)

| Record | Today | Needed |
|---|---|---|
| MX | mx1.hostinger.com (5), mx2.hostinger.com (10) | same: mail already goes to Hostinger Email |
| SPF | `v=spf1 include:_spf.mail.hostinger.com ~all` | same |
| DKIM | **missing** (no hostingermail-a/b/c CNAMEs) | 3 CNAMEs below: without them outbound mail lands in spam |
| DMARC | `v=DMARC1; p=none; rua=mailto:franck@francedomaine.fr` | keep `p=none` during warm-up |
| autodiscover | missing | CNAME below (mail apps set themselves up) |

DNS is on Cloudflare (brian / ryleigh). Records to add (copied from bonjourdomain.com's working Hostinger setup; if hPanel shows other values, hPanel wins):

| Type | Name | Value | Proxy |
|---|---|---|---|
| CNAME | hostingermail-a._domainkey | hostingermail-a.dkim.mail.hostinger.com | DNS only |
| CNAME | hostingermail-b._domainkey | hostingermail-b.dkim.mail.hostinger.com | DNS only |
| CNAME | hostingermail-c._domainkey | hostingermail-c.dkim.mail.hostinger.com | DNS only |
| CNAME | autodiscover | autodiscover.mail.hostinger.com | DNS only |

## Mailbox

Whether `contact@francedomaine.fr` already exists in Hostinger is **not checked** (only hPanel shows it). Hostinger's guide to create a mailbox: https://www.hostinger.com/support/1583217-how-to-create-and-manage-mailboxes-for-hostinger-email/

## Outbound rules

- Personal emails only, sent from the mailbox (webmail or a mail app), one at a time. Not Resend: its policy bans unsolicited mail and a ban would stop franckj.com and templatery.com mail (ops `domains/expertsrenovation-fr/email-setup.md`).
- Warm-up: 3–4 emails a day for the first week, then up to 10 a day (ops `domains/outbound/PLAN-2026-11.md`).
- Each email links to the domain's page (`https://francedomaine.fr/domaines/<slug>/`), so a click is counted.
