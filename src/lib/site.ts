// Site-wide facts. Legal identity from ops _context/company.md (COMPANY 1972, read 2026-10-24).
export const SITE = {
  name: 'FranceDomaine',
  host: 'francedomaine.fr',
  url: 'https://francedomaine.fr',
  // The address is assembled in the browser (src/components/MailLinks.astro), never written whole in the HTML.
  mail: { user: 'contact', host: 'francedomaine.fr' },
  title: 'Noms de domaine premium .fr à vendre pour votre marque | FranceDomaine.fr',
  description:
    "Le nom de domaine parfait pour votre marque. Noms courts, clairs et en .fr, prêts à l'emploi : prix sur demande, paiement par escrow, transfert sous 24 à 72 h.",
  locale: 'fr_FR',
  since: 1999,
  legal: {
    company: 'COMPANY 1972',
    form: 'SASU au capital de 1 000 €',
    address: "126 rue d'Alésia, 75014 Paris, France",
    rcs: 'RCS Paris 833 312 705',
    siret: '833 312 705 00027',
    vat: 'FR01833312705',
    director: 'Franck Jankowski',
  },
} as const;
