import type { TranslationDictionary } from '../types';

const fr: TranslationDictionary = {
  // Nav
  nav_features: 'Fonctionnalités',
  nav_howItWorks: 'Comment ça marche',
  nav_faq: 'FAQ',
  nav_dashboard: 'Tableau de bord',
  nav_launch: 'Lancer',
  nav_trade: 'Échanger',
  nav_liquidity: 'Liquidité',
  nav_ecosystem: 'Écosystème',
  nav_admin: 'Admin',
  nav_postLaunch: 'Post-lancement',

  // Hero
  hero_badge_devnet: '🔧 En cours sur Devnet',
  hero_badge_mainnet: '🚀 En direct sur Mainnet',
  hero_title: 'Plateforme de lancement',
  hero_titleAccent: 'de jetons Solana SPL',
  hero_subtitle:
    "Une plateforme de lancement de jetons non-custodiale de qualité production avec plus de 23 fonctionnalités couvrant le lancement, la gestion, les intégrations d'écosystème et la monétisation. Prête pour la marque blanche. Plus de 15 intégrations partenaires Solana. Déjà construite. Déjà vérifiée.",
  hero_cta_launch: 'Lancer un jeton',
  hero_cta_view: 'Voir ce qui est construit',
  hero_pill_wallet: 'Flux de lancement par portefeuille',
  hero_pill_tiers: 'Niveaux premium et parrainages',
  hero_pill_whiteLabel: 'Prêt pour la marque blanche',
  hero_pill_partners: "15+ partenaires d'écosystème",
  hero_pill_postLaunch: 'Automatisation post-lancement',
  hero_pill_hardened: 'Renforcé pour la production',

  // Section titles
  section_directResponse: 'Réponse directe',
  section_directResponse_title: 'Votre demande, traduite en un vrai système',
  section_directResponse_subtitle:
    "Chaque point du cahier des charges original est traité ci-dessous. Ce n'est pas une promesse — c'est construit.",
  section_whatsBuilt: 'Ce qui est déjà construit',
  section_whatsBuilt_subtitle:
    "23 fonctionnalités couvrant le lancement, la gestion, la monétisation, l'écosystème et l'infrastructure. Chacune est implémentée, pas planifiée.",
  section_hardening: 'Qualité production',
  section_hardening_title: "Ce n'est pas une maquette. C'est de l'ingénierie.",
  section_hardening_subtitle: 'Des métriques réelles du code source. Pas de chiffres inventés.',
  section_howItWorks: 'Comment ça marche',
  section_howItWorks_subtitle:
    "Quatre étapes de zéro à un jeton SPL en direct sur Solana. Chaque étape est guidée et validée.",
  section_phases_title: 'Plateforme complète — Construite en trois phases',
  section_phases_subtitle:
    "La Phase 1 a livré le MVP. De nombreuses fonctionnalités de la Phase 2 sont déjà construites — niveaux premium, marque blanche, intégrations d'écosystème et système de parrainage. Le travail restant concerne principalement l'exécution de liquidité on-chain et le travail de protocole personnalisé, défini séparément.",
  section_feasibility: 'Faisabilité, Complexité et Coût',
  section_feasibility_subtitle: 'Réponses directes aux questions que vous avez posées dans le cahier des charges.',
  section_whyDifferent: "Pourquoi ce n'est pas un clone générique",
  section_whyDifferent_subtitle: "La plupart des offres promettent des fonctionnalités. Celle-ci livre un système.",
  section_pricing: 'Tarification simple et transparente',
  section_pricing_subtitle: 'Un forfait unique. Pas de coûts cachés. Vous voyez le montant exact avant de signer.',
  section_faq: 'Questions fréquemment posées',
  section_cta_title: 'Construisez le lanceur correctement dès le premier jour',
  section_cta_subtitle:
    "Une plateforme de lancement de jetons Solana SPL prête pour la production avec un flux utilisateur propre, une architecture honnête et de la place pour grandir. Déjà construite. Déjà vérifiée. Prête à déployer.",

  // Steps
  step1_title: 'Connectez votre portefeuille',
  step1_desc: "Ouvrez l'application et connectez Phantom ou Solflare. Pas de compte, pas d'inscription, pas d'email. Votre portefeuille est votre identité.",
  step2_title: 'Configurez votre jeton',
  step2_desc: "Entrez le nom, le symbole, les décimales, l'offre totale et téléchargez une image. Choisissez un préréglage ou personnalisez. Liens sociaux optionnels.",
  step3_title: 'Vérifiez les frais et paramètres',
  step3_desc: "Voyez les frais exacts avant de signer. Vérifiez chaque détail. Rien n'est signé tant que vous ne cliquez pas sur confirmer.",
  step4_title: 'Lancez et gérez',
  step4_desc: "Signez la transaction. Votre jeton SPL est frappé sur Solana. Consultez-le sur votre tableau de bord, brûlez l'offre, révoquez les autorités ou explorez les options de liquidité.",

  // Phases
  phase1_title: 'Phase 1 — MVP',
  phase1_desc: 'Plateforme de lancement principale',
  phase2_title: 'Phase 2 — Croissance',
  phase2_desc: "Monétisation, écosystème, marque blanche",
  phase3_title: 'Expansion optionnelle',
  phase3_desc: 'Liquidité on-chain, analytics, programmes personnalisés',

  // Feasibility
  feasibility_title: 'Faisabilité',
  feasibility_text:
    "Hautement faisable. La création de jetons SPL utilise des primitives Solana bien documentées. L'assistant de lancement, l'adaptateur de portefeuille, le téléchargement IPFS et l'architecture des frais sont tous des modèles éprouvés en production.",
  complexity_title: 'Complexité',
  complexity_text:
    "Modérée pour le MVP. Plus élevée pour la Phase 2. Création de jetons + application des frais est simple. La complexité augmente significativement avec les pools de liquidité on-chain.",
  cost_title: 'Coût et Portée',
  cost_text:
    "Le MVP est à portée fixe. Tout dans la colonne MVP est construit et inclus. Les fonctionnalités de Phase 2 sont définies séparément — sans obligation.",

  // Pricing
  pricing_tokenCreation: 'Création de jeton',
  pricing_included: 'Tout inclus en un seul paiement',
  pricing_platformFee: 'Frais de plateforme',
  pricing_networkFee: 'Frais de réseau / loyer estimés',
  pricing_total: 'Total estimé',
  pricing_devnetNote: "Les lancements Devnet utilisent du SOL de test et sont gratuits. Passez au Mainnet quand vous êtes prêt.",

  // Footer
  footer_desc: 'Un outil simple et transparent pour créer des jetons Solana SPL. Aucune connaissance technique requise.',
  footer_network: 'Réseau',
  footer_product: 'Produit',
  footer_legal: 'Juridique',
  footer_terms: "Conditions d'utilisation",
  footer_privacy: 'Politique de confidentialité',
  footer_riskDisclosure: 'Divulgation des risques',
  footer_launchToken: 'Lancer un jeton',
  footer_riskText:
    "Divulgation des risques : Le lancement de jetons sur des blockchains publiques comporte des risques financiers et juridiques importants. Cet outil est fourni uniquement en tant que logiciel d'infrastructure. Vous êtes seul responsable de la conformité de votre lancement de jeton avec toutes les lois et réglementations applicables dans votre juridiction.",
  footer_jurisdictionText:
    "Avis juridictionnel : Le traitement réglementaire des jetons numériques varie selon les pays. Les utilisateurs au Koweït doivent être conscients de la circulaire CBK n° 2/RB/336/2014 et des directives connexes de l'Autorité des marchés financiers.",
  footer_copyright: 'Non affilié à la Fondation Solana.',

  // Common
  common_built: 'Construit',
  common_beta: 'Bêta',
  common_verified: 'Vérifié',
  common_hardened: 'Renforcé',
  common_complete: 'Complet',
  common_done: 'Fait',
  common_youAskedFor: 'Vous avez demandé',
  common_builtHere: 'Construit ici',
  common_startNow: 'Commencer — Gratuit sur Devnet',
  common_viewDashboard: 'Voir le tableau de bord',
  common_notAffiliated: 'Non affilié à la Fondation Solana.',
  common_contactCta: 'Questions sur la Phase 2, les exigences personnalisées ou le déploiement ?',

  // Language
  language_label: 'Langue',

  // Status badges
  status_built: 'Construit',
  status_beta: 'Bêta',
  status_verified: 'Vérifié',
  status_hardened: 'Renforcé',

  // Homepage content arrays
  homepage_requirements: [
    { asked: 'Connexion de portefeuille', built: 'Adaptateur Phantom + Solflare avec détection automatique, bannière réseau et alertes SOL bas.' },
    { asked: 'Interface simple de création de jetons', built: "Assistant guidé en 4 étapes : Détails → Branding → Offre → Vérification. Validation à chaque étape, aperçu en direct, préréglages de lancement." },
    { asked: 'Revenus des frais de création', built: "Architecture de frais fixes avec application atomique on-chain. Le portefeuille trésorerie reçoit les frais à chaque lancement. Le tableau de bord admin suit les revenus." },
    { asked: 'Gestion optionnelle de liquidité', built: "Interface de recherche de pools Raydium AMM V4 + Meteora DLMM avec recherche en direct et calculateur de prix implicite. Intégration SDK on-chain prévue pour la Phase 2." },
    { asked: 'Destruction de jetons', built: "Flux complet de destruction — sélectionnez le montant, confirmez, les jetons sont définitivement retirés de la circulation. On-chain et vérifiable." },
    { asked: 'Conseils sur la faisabilité, la complexité, le coût et les meilleures pratiques', built: "Architecture de production, pipeline de vérification, documentation, feuille de route et cette page — le tout structuré pour un acheteur non technique." },
  ],
  homepage_capabilities: [
    { name: 'UX Portefeuille', desc: 'Adaptateur Phantom + Solflare, bannière réseau, vérifications de solde' },
    { name: 'Assistant de Lancement', desc: 'Flux en 4 étapes : Détails → Branding → Offre → Vérification' },
    { name: 'Flux Métadonnées', desc: 'Upload IPFS via Pinata, métadonnées Metaplex on-chain' },
    { name: 'Architecture Trésorerie / Frais', desc: 'Application atomique des frais, tableau de bord revenus admin' },
    { name: 'Flux de Destruction', desc: 'Destruction de jetons avec confirmation et vérification on-chain' },
    { name: 'Révocation d\'Autorité', desc: "Révocation de l'autorité de frappe + gel avec affichage du score de confiance" },
    { name: 'Tableau de Bord Portfolio', desc: 'Soldes de jetons en direct on-chain avec images depuis RPC' },
    { name: 'Recherche de Pools', desc: 'Raydium V3 API + recherche de pools Meteora DLMM' },
    { name: 'Conscience Réseau', desc: 'Bannière Devnet/mainnet + alertes SOL bas partout' },
    { name: 'Couche de Validation', desc: 'Schémas Zod, 12 codes d\'erreur typés, calcul BigInt sûr' },
    { name: 'Limitation de Débit', desc: 'Upstash Redis distribué, repli en mémoire' },
    { name: 'Pipeline de Vérification', desc: 'TypeScript + vitest + build en une commande' },
    { name: 'Couverture de Tests', desc: '32 tests réussis sur 4 suites' },
    { name: 'Juridique & Conformité', desc: 'Conditions, confidentialité, divulgation des risques, bannière de conformité' },
    { name: 'Documentation', desc: 'README, SETUP, BID_PROPOSAL, docs architecture — alignés sur la réalité' },
    { name: 'Niveaux de Lancement Premium', desc: '3 niveaux : Standard, Premium, Vedette — avec contrôle de fonctionnalités' },
    { name: 'Système White-Label', desc: 'Branding multi-tenant, partage de frais, routage de domaine, drapeaux de fonctionnalités' },
    { name: 'Parrainage & Affiliation', desc: 'Codes de parrainage, suivi des commissions, cumul de remises' },
    { name: 'Générateur de Page Jeton', desc: 'Pages /token/[mint] dynamiques avec score de confiance et données on-chain' },
    { name: 'Hub Écosystème', desc: '15+ partenaires Solana : Jupiter, Raydium, Birdeye, Jito, Pyth, et plus' },
    { name: 'Checklist Post-Lancement', desc: 'Checklist guidée en 13 étapes de la sécurité à la croissance' },
    { name: 'Helius Webhooks', desc: 'Notifications en temps réel pour transferts, baleines, pools et échanges' },
    { name: 'Routage 4-DEX', desc: 'Routage de liens profonds Jupiter, Raydium, Meteora, Orca' },
  ],
  homepage_hardening: [
    { metric: 'TypeScript', value: '0 erreurs', detail: 'Mode strict — aucun raccourci au niveau des types' },
    { metric: 'Suite de Tests', value: '32 réussis', detail: '4 suites : env, utils, api-response, rate-limit' },
    { metric: 'Build', value: 'Exit 0', detail: '18 routes compilées, 0 avertissements' },
    { metric: 'Validation Env', value: 'Basée sur schéma', detail: 'Détection de placeholders, vérifications de sécurité mainnet' },
    { metric: 'Limitation de Débit', value: 'Distribué', detail: 'Upstash Redis avec repli en mémoire' },
    { metric: 'Journalisation', value: 'Structurée', detail: 'JSON prod / humain dev, chronométrage asynchrone' },
    { metric: 'Sécurité Portefeuille', value: 'Conscient du réseau', detail: 'Bannière Devnet/mainnet, alertes SOL bas' },
    { metric: 'Alignement Docs', value: 'Aligné sur la réalité', detail: 'README, SETUP, BID_PROPOSAL correspondent à l\'implémentation' },
    { metric: 'Statut Liquidité', value: 'Découverte active', detail: 'Recherche de pools + routage DEX actif. Exécution native Phase 2' },
  ],
  homepage_mvpItems: [
    'Connexion portefeuille Phantom + Solflare',
    'Assistant guidé de lancement en 4 étapes',
    'Upload métadonnées IPFS (Pinata)',
    'Métadonnées Metaplex on-chain',
    'Architecture trésorerie à frais fixes',
    'Flux de destruction de jetons',
    'Révocation autorité de frappe + gel',
    'Tableau de bord portfolio (en direct depuis RPC)',
    'Préréglages de lancement (Meme Classic, Maxi, Community, Scarce, Governance)',
    'Couche de validation (schémas Zod, 12 codes d\'erreur)',
    'Documents légaux : Conditions, Confidentialité, Divulgation des Risques',
    'Pipeline de vérification complet (tsc + vitest + build)',
  ],
  homepage_phase2Items: [
    'Niveaux de lancement premium (Standard / Premium / Vedette)',
    'Système white-label multi-tenant avec partage de frais',
    'Suivi parrainage + affiliation avec commissions',
    'Générateur de page jeton avec score de confiance',
    'Hub écosystème — 15+ intégrations partenaires Solana',
    'Checklist post-lancement (flux guidé en 13 étapes)',
    'Helius webhooks pour notifications en temps réel',
    'Routage échange 4-DEX (Jupiter, Raydium, Meteora, Orca)',
  ],
  homepage_phase3Items: [
    'Ajout/retrait de liquidité Raydium AMM V4 on-chain',
    'Création de pool Meteora DLMM on-chain',
    'Programmes Rust personnalisés pour tokenomics avancés',
    'Tableau de bord analytique avec intégration Birdeye API',
    'PWA optimisée mobile',
  ],
  homepage_whyDifferent: [
    { title: 'Déjà Construit — Pas Seulement Proposé', desc: '81+ fichiers de production, 18 routes, chaque écran fonctionnel. Vous pouvez l\'exécuter localement aujourd\'hui.' },
    { title: 'Testé & Vérifié', desc: '32 tests unitaires, mode strict TypeScript, pipeline de vérification CI. Pas « ça marche sur ma machine ».' },
    { title: 'Langage de Statut Honnête', desc: 'L\'UI de liquidité dit « Intégration en attente » — pas « Bientôt disponible ». Chaque libellé reflète l\'état réel d\'implémentation.' },
    { title: 'La Documentation Correspond au Code', desc: 'README, SETUP, BID_PROPOSAL et docs architecture sont tous alignés sur ce qui est réellement construit.' },
    { title: 'Renforcement Production Inclus', desc: 'Limitation de débit, validation env, journalisation structurée, en-têtes de sécurité — pas des réflexions après coup, intégrés dès le premier jour.' },
    { title: 'Fondations Éprouvées', desc: 'Construit sur les standards SPL Token + Metaplex pour un risque moindre et une livraison plus rapide. Extensions Rust personnalisées disponibles en Phase 2 — l\'architecture supporte l\'expansion sans réécriture.' },
  ],
  homepage_pricingIncludes: [
    'Création de mint de jeton SPL',
    'Upload image + métadonnées IPFS',
    'Métadonnées Metaplex on-chain',
    'Liens explorateur + tableau de bord',
  ],
  homepage_verifyText: 'Exécutez {cmd} pour reproduire : TypeScript → vitest → Next.js build, une seule commande.',
  homepage_discussLink: 'Discuter du plan de construction →',
  homepage_logoAlt: 'Plateforme de Lancement Solana',

  // Buyer-conversion sections
  section_projectMatch: 'Correspondance directe',
  section_projectMatch_title: 'Pourquoi cela correspond à votre projet',
  section_projectMatch_subtitle: 'Cette version en ligne est la fondation fonctionnelle du type exact de lanceur que vous avez décrit — avec les fonctionnalités MVP déjà implémentées et les fonctionnalités avancées de liquidité définies séparément.',
  homepage_projectMatchItems: [
    'Flux simple de création de meme coins — assistant guidé en 4 étapes, aucun code requis',
    'Connexion wallet Phantom + Solflare avec détection automatique',
    'Outils de burn de tokens — sélectionnez le montant, confirmez, retirez définitivement de la supply',
    'Revenus des frais de lancement — trésorerie à frais fixe avec tableau de bord admin',
    'Fonctionnalités de liquidité optionnelles prévues pour la Phase 2 — sans dérive du périmètre',
  ],
  homepage_bridgingStatement: 'Tout ce qui précède est en ligne et fonctionnel. Vous pouvez connecter un wallet et tester le flux complet sur Devnet aujourd\'hui — sans configuration, sans attente.',
  section_scorecard: 'En un coup d\'œil',
  section_scorecard_title: 'Votre cahier des charges vs. ce qui est construit',
  section_scorecard_subtitle: 'Une comparaison rapide entre votre cahier des charges, ce qui est déjà en ligne, et ce que j\'adapterais pour votre version.',
  scorecard_col_youAsked: 'Vous avez demandé',
  scorecard_col_status: 'Statut',
  scorecard_col_forYou: 'Pour votre version',
  homepage_scorecardItems: [
    { asked: 'Connexion wallet', status: 'Construit', forYou: 'Configuration marque & réseau' },
    { asked: 'Création de token simple', status: 'Construit', forYou: 'Contenu & personnalisation UX' },
    { asked: 'Revenus des frais', status: 'Construit', forYou: 'Montant des frais + trésorerie' },
    { asked: 'Gestion des tokens', status: 'Construit', forYou: 'Contrôles supplémentaires si nécessaire' },
    { asked: 'Chemin de liquidité', status: 'Préparé', forYou: 'Optionnel — ajout possible après le MVP' },
  ],

  // Proof section
  nav_proof: 'Preuves',
  hero_cta_proof: 'Voir les preuves',
  section_proof: 'Preuves, pas promesses',
  section_proof_title: 'Chaque affirmation est vérifiable',
  section_proof_subtitle: 'Ceci n\'est pas un pitch deck. Chaque capacité décrite sur cette page a un lien live, un fichier source ou une commande de vérification derrière elle.',
  homepage_proofCards: [
    { title: 'App en direct', desc: 'La plateforme complète est en ligne et testable sur Devnet maintenant. Connectez un wallet et testez le flux complet.', linkLabel: 'Essayer en direct →' },
    { title: 'Code source', desc: 'Dépôt complet — 81+ fichiers, 18 routes, TypeScript strict mode, zéro erreur.', linkLabel: 'Voir le dépôt →' },
    { title: 'Commande de vérification', desc: 'Une seule commande lance les vérifications TypeScript, 32 tests et un build de production Next.js complet.', linkLabel: 'npm run verify' },
    { title: 'Guide d\'installation', desc: 'Clonez, installez, configurez et lancez la plateforme localement en moins de 5 minutes.', linkLabel: 'Lire le guide →' },
    { title: 'Docs d\'architecture', desc: 'Conception du système, stack technique, structure des fichiers et architecture de déploiement — tout documenté.', linkLabel: 'Lire les docs →' },
    { title: 'Proposition & périmètre', desc: 'Détail complet du périmètre : phases, tarification, calendrier et livrables.', linkLabel: 'Lire la proposition →' },
  ],
  footer_proof: 'Preuves',
  footer_liveApp: 'App en direct',
  footer_sourceCode: 'Code source',
  footer_setupGuide: 'Guide d\'installation',
  footer_architecture: 'Architecture',
  footer_verification: 'Vérification',

  // Sample Devnet Launch
  section_devnetLaunch: 'Reçu on-chain',
  section_devnetLaunch_title: 'Ce que chaque lancement produit',
  section_devnetLaunch_subtitle: 'Chaque jeton créé via la plateforme génère cinq artefacts vérifiables on-chain. Essayez l\'assistant vous-même sur devnet — cela prend 30 secondes.',
  devnetLaunch_mintLabel: 'Adresse du mint',
  devnetLaunch_txLabel: 'Transaction de création',
  devnetLaunch_metadataLabel: 'Métadonnées JSON',
  devnetLaunch_imageLabel: 'Image du jeton',
  devnetLaunch_explorerLabel: 'Page du jeton sur l\'explorateur',
  devnetLaunch_viewMint: 'Voir sur l\'explorateur',
  devnetLaunch_viewTx: 'Voir la transaction',
  devnetLaunch_viewMetadata: 'Voir les métadonnées',
  devnetLaunch_viewImage: 'Voir l\'image',
  devnetLaunch_viewExplorer: 'Ouvrir la page du jeton',
  devnetLaunch_mintDesc: 'Adresse unique du jeton SPL sur Solana — vérifiable on-chain',
  devnetLaunch_txDesc: 'Enregistrement de transaction signé avec trace complète des instructions',
  devnetLaunch_metadataDesc: 'Nom, symbole et URI de l\'image stockés sur IPFS via Pinata',
  devnetLaunch_imageDesc: 'Visuel du jeton épinglé sur IPFS — immuable et permanent',
  devnetLaunch_explorerDesc: 'Vue complète du jeton sur Solana Explorer avec détenteurs et historique',
  devnetLaunch_tryCta: 'Essayer l\'assistant sur Devnet',
  devnetLaunch_note: 'Cette section montre les cinq artefacts produits par chaque lancement. Essayez l\'assistant sur launch.unykorn.org pour créer votre propre échantillon vérifiable sur Solana devnet. Les jetons Devnet n\'ont aucune valeur monétaire.',

  // Inline proof links on requirement cards
  homepage_requirementProofLinks: [
    { label1: 'Ouvrir le flux live', label2: 'Voir le code wallet' },
    { label1: 'Ouvrir l\'assistant', label2: 'Voir le code assistant' },
    { label1: 'Voir la logique des frais', label2: 'Voir le dashboard admin' },
    { label1: 'Ouvrir le pool finder', label2: 'Voir le code liquidité' },
    { label1: 'Ouvrir le dashboard', label2: 'Voir le code burn' },
    { label1: 'Lire la proposition', label2: 'Voir l\'architecture' },
  ],

  // Legal deliverable proof
  legal_deliverableProof: 'Les pages légales et les flux de divulgation sont déjà inclus et peuvent être personnalisés pour votre juridiction de déploiement.',

  section_customize: 'Votre version',
  section_customize_title: 'Ce que je personnaliserais pour vous',
  section_customize_subtitle: 'Ce n\'est pas une démo générique. Voici exactement ce qui sera adapté à votre projet.',
  homepage_customizeItems: [
    { title: 'Branding et domaine', desc: 'Votre logo, couleurs, polices et domaine personnalisé — entièrement en marque blanche.' },
    { title: 'Wallet de trésorerie', desc: 'Votre wallet reçoit chaque frais de lancement. Vous contrôlez les revenus dès le premier jour.' },
    { title: 'Montant des frais', desc: 'Définissez les frais en SOL par création de token selon votre marché et votre stratégie tarifaire.' },
    { title: 'Presets de tokens', desc: 'Personnalisez les presets de lancement — meme coin, gouvernance, communauté, ou vos propres catégories.' },
    { title: 'Pages légales', desc: 'Conditions, politique de confidentialité et divulgation des risques adaptées à votre juridiction.' },
    { title: 'Liquidité Phase 2', desc: 'Intégrations on-chain Raydium et Meteora construites quand vous êtes prêt — selon votre calendrier.' },
  ],
  section_timeline: 'Calendrier',
  section_timeline_title: 'Calendrier de livraison',
  homepage_timelineItems: [
    { phase: 'Livraison MVP', time: '1–2 semaines', detail: 'Branding, domaine, config trésorerie, presets de lancement, pages légales. Tout le nécessaire pour lancer.' },
    { phase: 'Affinage', time: '1 semaine', detail: 'Tour de retours, polish UX, tests mobile, walkthrough client final.' },
    { phase: 'Phase 2 (Optionnelle)', time: '2–3 semaines', detail: 'Liquidité on-chain, analytics avancés, programmes Rust personnalisés — périmètre et prix définis séparément.' },
  ],
  homepage_timelineNote: 'Le MVP est déjà construit à 90%+. Le calendrier reflète la personnalisation, le branding et le déploiement — pas la construction depuis zéro.',

  // FAQ
  faq_items: [
    { q: "Qu'est-ce qu'un jeton SPL ?", a: "Un jeton SPL est l'équivalent Solana d'un jeton ERC-20 sur Ethereum. C'est un jeton fongible fonctionnant sur la blockchain Solana. Vous pouvez définir le nom, le symbole, l'offre, les décimales et joindre des métadonnées (image, description, liens)." },
    { q: 'Dois-je savoir coder ?', a: "Non. Cette plateforme gère toutes les interactions on-chain pour vous. Vous remplissez un formulaire simple, uploadez l'image de votre jeton, vérifiez les détails et confirmez la transaction dans votre portefeuille. C'est tout." },
    { q: 'Combien coûte le lancement d\'un jeton ?', a: 'Les frais de plateforme sont de {creationFee} SOL, plus environ {networkFee} SOL pour les frais réseau Solana et le loyer de compte. Le total est affiché clairement avant que vous ne signiez quoi que ce soit.' },
    { q: 'Quels portefeuilles sont supportés ?', a: 'Phantom et Solflare sont supportés nativement. Ce sont les portefeuilles Solana les plus utilisés et tous deux sont non-custodiaux — vos clés privées restent dans votre portefeuille, jamais sur ce serveur.' },
    { q: 'Puis-je tester avant le lancement réel ?', a: "Oui. La plateforme fonctionne sur Devnet par défaut, qui utilise du SOL de test. Vous pouvez obtenir du SOL Devnet gratuit depuis le faucet Solana sur faucet.solana.com. Quand vous êtes prêt à lancer sur Mainnet, changez le réseau de votre portefeuille vers Mainnet-Beta." },
    { q: "Où est stockée l'image de mon jeton ?", a: "Les images de jetons et métadonnées sont uploadées sur IPFS — un réseau de stockage décentralisé. L'URI IPFS adressée par contenu est attachée aux métadonnées on-chain de votre jeton pour qu'elle soit accessible en permanence." },
    { q: 'Détenez-vous mes jetons ou avez-vous accès à mon portefeuille ?', a: 'Non. C\'est un outil non-custodial. Vous signez chaque transaction vous-même avec votre portefeuille. Nous ne demandons, stockons, ni accédons jamais à vos clés privées.' },
    { q: 'Puis-je détruire des jetons après le lancement ?', a: "Oui. Le tableau de bord inclut un flux de destruction où vous pouvez envoyer des jetons à l'adresse de destruction, les retirant définitivement de la circulation." },
    { q: 'Y a-t-il un risque juridique à lancer un jeton ?', a: "Les lanceurs de jetons peuvent avoir des implications réglementaires significatives selon votre juridiction, la distribution du jeton et s'il est commercialisé comme un investissement. Cet outil est uniquement un logiciel d'infrastructure. Vous êtes seul responsable de la conformité de votre lancement avec les lois applicables. Ceci n'est pas un conseil juridique — consultez un avocat qualifié avant de lancer." },
  ],

  // Common additions
  common_devnet: 'Devnet',
  common_mainnet: 'Mainnet',
};

export default fr;
