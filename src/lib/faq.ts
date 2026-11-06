// Home FAQ: Franck's published answers (live site, Jan 2026), lightly trimmed. Edit here; FAQPage JSON-LD follows.
export const homeFaq = [
  { q: 'Pourquoi investir dans un nom de domaine premium ?', a: "Un nom de domaine premium est votre premier actif digital. Il donne d'emblée crédibilité et professionnalisme à votre marque. Un domaine court, mémorable ou aligné avec votre activité se retient mieux, facilite le bouche-à-oreille et renforce votre positionnement." },
  { q: "Quels sont les avantages d'un domaine en .fr ?", a: "L'extension .fr est un signal de confiance pour le marché français. Elle indique que vous êtes établi en France, aide votre référencement local sur Google.fr et relève des règles de l'AFNIC, l'office d'enregistrement du .fr." },
  { q: 'Un domaine court fait-il vraiment la différence ?', a: "Chaque caractère compte. Un domaine court se mémorise en une lecture, s'écrit sans faute et projette une image de marque établie." },
  { q: "Comment se déroule l'acquisition d'un domaine ?", a: "Vous nous écrivez pour le domaine souhaité, nous établissons une proposition. Une fois l'accord conclu, le transfert passe par un service d'escrow qui protège les deux parties. Vous recevez le domaine sous 24 à 72 heures." },
  { q: 'Puis-je faire une offre ?', a: "Oui. Sur la page de chaque domaine, le bouton « Faire une offre » prépare un e-mail avec le nom du domaine : indiquez votre montant et votre projet." },
  { q: 'Un domaine premium améliore-t-il le SEO ?', a: "Un nom contenant des mots-clés pertinents peut aider pour ces requêtes. Surtout, un domaine mémorable génère davantage de recherches directes de votre marque." },
];

export const domainFaq = (name: string) => [
  { q: `Comment acheter ${name} ?`, a: `Écrivez-nous avec le bouton « Demander le prix » ou « Faire une offre ». Une fois l'accord conclu, le paiement passe par un service d'escrow et ${name} vous est transféré sous 24 à 72 heures.` },
  { q: 'Le paiement est-il sécurisé ?', a: "Oui : un service d'escrow conserve les fonds et ne les verse qu'une fois le transfert du domaine effectué." },
  { q: `Puis-je garder mon hébergeur et ma boîte e-mail avec ${name} ?`, a: "Oui. Après le transfert, le domaine est à votre nom chez le registraire de votre choix et vous le reliez à l'hébergeur et aux e-mails que vous voulez." },
];

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});
