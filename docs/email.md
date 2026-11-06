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

## Mailbox (checked 2026-11-06)

- The mailbox is **franck@francedomaine.fr** (Hostinger Email). contact@francedomaine.fr is only a forward to it. Outbound goes from franck@ (Franck 2026-11-06: "use franck@, better for trust").
- Claude reaches it over IMAP/SMTP (imap.hostinger.com 993, smtp.hostinger.com 465, from Hostinger's settings page), password saved on Franck's machine only, never printed. No Hostinger account access (Franck refused the OAuth: it grants the whole account).
- Helpers on Franck's machine: `fd-mail.py status|list|read|send` and `fd-mail-triage.py` (daily, read-only, Telegram note only when a real person wrote; scams and newsletters ignored).
- **Every send needs Franck's yes on that exact email** (2026-11-06: "always ask me to validate sending"). `fd-mail.py send` refuses without `--approved`.
- Inbox on 2026-11-06: 112 messages in INBOX plus Junk; no real buyer. 33 scam (fake brokers and "financing for domain buyers" on throwaway .help/.co domains, fake tax, notary, registered-letter and bank mail), the rest newsletters and DMARC/TLS reports.

## Outbound rules

- Personal emails only, sent from the mailbox (webmail or a mail app), one at a time. Not Resend: its policy bans unsolicited mail and a ban would stop franckj.com and templatery.com mail (ops `domains/expertsrenovation-fr/email-setup.md`).
- Warm-up: 3–4 emails a day for the first week, then up to 10 a day (ops `domains/outbound/PLAN-2026-11.md`).
- Each email links to the domain's page (`https://francedomaine.fr/domaines/<slug>/`), so a click is counted.
