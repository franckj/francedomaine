// Home page copy (French, audience 100 % France). Edit the words here; the page layout is src/pages/index.astro.
// Facts used: .fr eligibility = AFNIC naming charter (holders established in the EU, Iceland, Liechtenstein,
// Norway or Switzerland); escrow and 24–72 h transfer = Franck's published process. No figures without a source.

export const hero = {
  eyebrow: 'Noms de domaine premium .fr et .com',
  // Franck 2026-11-06: "Your first headline was the right one". The word in `hl` is set in Bleu France.
  title: { before: 'Le nom de domaine ', hl: 'parfait', after: ' pour votre marque' },
  lead: "Un nom court, clair, en .fr : vos clients vous trouvent, vous retiennent et vous font confiance avant même d'avoir lu une ligne. Choisissez-le parmi une sélection de noms déjà enregistrés, prêts à devenir les vôtres.",
};

export const problem = {
  title: 'Un nom approximatif vous coûte des clients. Sans que vous le voyiez.',
  intro: 'Le nom de domaine est la seule partie de votre marque que vos clients doivent taper lettre par lettre. Chaque hésitation est une porte de sortie.',
  points: [
    'On vous cherche, on tombe sur un concurrent au nom presque identique.',
    "Vous dictez votre adresse au téléphone : « avec un tiret… non, sans s… » L'e-mail n'arrive jamais.",
    'Votre vrai nom était pris : vous avez ajouté « -france », « -paris » ou un chiffre, et vous ressemblez à une copie.',
    'Vous payez de la publicité pour une adresse que personne ne retient.',
  ],
};

export const reasons = {
  title: 'Pourquoi le bon domaine change tout',
  intro: 'Un bon nom ne fait pas votre entreprise. Il retire tous les obstacles entre elle et vos clients.',
  items: [
    { t: 'Éviter la confusion', d: "Un nom, une orthographe, une adresse. Si un autre détient le .fr de votre nom, une partie de vos visiteurs et de vos e-mails part chez lui. Posséder le bon domaine, c'est fermer cette fuite." },
    { t: 'Posséder votre catégorie', d: "Un nom générique comme superaliments.fr ou occultation.fr, c'est le mot même que vos clients emploient. Vous n'êtes plus « une boutique de plus » : vous êtes l'adresse du sujet." },
    { t: 'La force du .fr', d: "C'est l'extension que vos clients français reconnaissent au premier coup d'œil. Elle est réservée aux personnes et entreprises établies en Europe : elle dit d'emblée que vous êtes d'ici, et qu'on peut vous faire confiance." },
    { t: 'Court, donc mémorable', d: "Moins de lettres, moins de fautes. Un nom court se lit d'un coup d'œil, tient sur une carte de visite, un véhicule ou un logo, et se retient après une seule lecture." },
    { t: 'Une vraie marque', d: "Un nom évocateur ou inventé, comme aurae.fr ou omnify.fr, n'appartient qu'à vous. Distinctif, il se décline, se raconte et se protège en général plus facilement à titre de marque qu'un terme courant." },
    { t: 'Le test du téléphone', d: "Le bon nom s'entend une fois et s'écrit sans faute. C'est lui qui fait marcher le bouche-à-oreille, la radio, les podcasts, les salons : tous les moments où l'on ne peut pas cliquer." },
    { t: 'Une adresse e-mail sérieuse', d: "contact@votremarque.fr inspire plus confiance qu'une adresse gratuite ou qu'un nom à rallonge. Chaque e-mail, chaque devis, chaque facture porte votre nom de domaine." },
    { t: 'Un actif qui vous appartient', d: "Une campagne publicitaire s'arrête, un domaine reste. Il fait partie du patrimoine de votre entreprise : il se transmet, se revend, et prend de la valeur à mesure que votre marque grandit." },
  ],
};

export const audiences = {
  title: 'Pour qui ?',
  items: [
    { t: 'Vous créez votre entreprise', d: 'Partez avec le nom définitif. Changer de domaine dans trois ans coûte bien plus cher : site, référencement, supports imprimés, habitudes de vos clients.' },
    { t: 'Votre entreprise existe déjà', d: "Récupérez le .fr ou le nom court qui vous manque. Vous gardez votre adresse actuelle et la redirigez vers la nouvelle : rien n'est perdu." },
    { t: 'Vous lancez une marque ou une boutique', d: "Prenez le nom de votre catégorie ou un nom de marque prêt à l'emploi, et concentrez votre budget sur le produit plutôt que sur l'explication de votre adresse." },
  ],
};

export const faq = [
  { q: 'Pourquoi payer un domaine, alors qu’on en enregistre pour quelques euros ?', a: "Un nom libre à quelques euros est un nom que personne n'a encore voulu. Les noms courts, clairs et en .fr sont presque tous déjà enregistrés. Le prix d'un domaine premium rachète ce que vous ne pourrez pas créer : un nom évident, que vos clients retiennent." },
  { q: '.fr ou .com ?', a: "Si vos clients sont en France, le .fr est l'extension qu'ils reconnaissent et qui dit que vous êtes d'ici. Le .com reste utile pour une ambition internationale. L'idéal : le nom que vous voulez dans l'extension qui parle à vos clients." },
  { q: "Comment se déroule l'achat ?", a: "Vous nous écrivez depuis la fiche du domaine, nous vous faisons une proposition écrite. Une fois l'accord conclu, le paiement passe par un service d'escrow qui protège les deux parties, et vous recevez le domaine sous 24 à 72 heures." },
  { q: 'Puis-je faire une offre ?', a: "Oui. Sur la fiche de chaque domaine, le bouton « Faire une offre » prépare un e-mail avec le nom du domaine : indiquez votre montant et votre projet." },
  { q: 'Le domaine sera-t-il vraiment à mon nom ?', a: "Oui. Après le transfert, le domaine est enregistré au nom de votre entreprise, chez le registraire de votre choix. Vous le reliez au site et aux e-mails que vous voulez." },
  { q: "J'ai déjà un site : vais-je perdre mon référencement ?", a: "Non, si le changement est fait proprement : votre ancienne adresse redirige chaque page vers la nouvelle (redirection 301), et vos visiteurs comme les moteurs de recherche suivent." },
  { q: 'Un bon domaine suffit-il pour être bien référencé ?', a: "Non, et méfiez-vous de qui le promet. Un bon nom aide surtout les gens : il se retient, se recommande et se recherche directement. Le contenu et la qualité de votre site font le reste." },
];

export const finalCta = {
  title: "Chaque nom n'existe qu'une fois.",
  text: "Une fois vendu, il ne revient pas sur le marché. Si l'un de nos domaines vous parle, écrivez-nous ; s'il manque le vôtre, dites-nous ce que vous cherchez : nous avons d'autres noms hors catalogue.",
};
