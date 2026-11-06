// Questions on each domain page.
export const domainFaq = (name: string) => [
  { q: `Comment acheter ${name} ?`, a: `Écrivez-nous avec le bouton « Demander le prix » ou « Faire une offre ». Une fois l'accord conclu, le paiement passe par un service d'escrow et ${name} vous est transféré sous 24 à 72 heures.` },
  { q: 'Le paiement est-il sécurisé ?', a: "Oui : un service d'escrow conserve les fonds et ne les verse qu'une fois le transfert du nom de domaine effectué." },
  { q: `Puis-je garder mon hébergeur et ma boîte e-mail avec ${name} ?`, a: "Oui. Après le transfert, le nom de domaine est à votre nom chez le registraire de votre choix et vous le reliez à l'hébergeur et aux e-mails que vous voulez." },
];

export const faqLd = (items: { q: string; a: string }[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

/** Three short selling points for a domain page, from facts about the name itself (length, extension). */
export const domainPoints = (name: string) => {
  const label = name.slice(0, name.indexOf('.'));
  const ext = name.slice(name.indexOf('.'));
  const pts: { t: string; d: string }[] = [];
  if (ext === '.fr') pts.push({ t: 'En .fr', d: "L'extension que vos clients français reconnaissent, réservée aux titulaires établis en Europe." });
  else pts.push({ t: `En ${ext}`, d: "L'extension la plus connue au monde, pour une ambition au-delà de la France." });
  if (!/[-0-9]/.test(label)) pts.push({ t: 'Sans tiret ni chiffre', d: "Il s'écrit comme il se dit : le test du téléphone est réussi." });
  pts.push({ t: 'Prêt à l’emploi', d: 'Transfert sous 24 à 72 h après accord, paiement protégé par escrow.' });
  return pts;
};
