export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  product: string;
}

export const REVIEWS: Review[] = [
  {
    id: "1",
    name: "Fatima B.",
    rating: 5,
    comment: "Excellent produit ! Ma peau est beaucoup plus douce et hydratee depuis que j'utilise le serum au cactus. Je recommande vivement.",
    date: "2024-12-15",
    product: "Serum Cactus"
  },
  {
    id: "2",
    name: "Ahmed K.",
    rating: 5,
    comment: "Le shampoing a l'huile d'argan a completement transforme mes cheveux. Ils sont plus forts et brillants que jamais.",
    date: "2024-12-10",
    product: "Shampoing Argan"
  },
  {
    id: "3",
    name: "Aicha M.",
    rating: 4,
    comment: "Tres bonne qualite. L'huile de nigelle est pure et sent delicieusement bon. Livraison rapide aussi.",
    date: "2024-12-05",
    product: "Huile de Nigelle"
  },
  {
    id: "4",
    name: "Youssef R.",
    rating: 5,
    comment: "Je suis un homme et j'adore ces produits. Le baume a barbe est exceptionnel, ma barbe est plus douce et disciplinee.",
    date: "2024-11-28",
    product: "Baume a Barbe"
  },
  {
    id: "5",
    name: "Samira L.",
    rating: 5,
    comment: "Le pack de soins du visage est genial. Mon teint est plus lumineux et mes pores sont resserres. Merci Dakhla Artisanal !",
    date: "2024-11-20",
    product: "Pack Visage"
  },
  {
    id: "6",
    name: "Karim D.",
    rating: 4,
    comment: "Produits naturels de qualite. Le savon noir fait un excellent gommage. Ma peau est toute douce apres utilisation.",
    date: "2024-11-15",
    product: "Savon Noir"
  },
  {
    id: "7",
    name: "Nadia S.",
    rating: 5,
    comment: "Je commande regulierement et je ne suis jamais decue. Les produits sont authentiques et livres avec soin.",
    date: "2024-11-10",
    product: "Huile d'Argan"
  },
  {
    id: "8",
    name: "Hassan T.",
    rating: 5,
    comment: "Le serum anti-chute fonctionne vraiment ! J'ai vu une nette amelioration apres seulement 3 semaines d'utilisation.",
    date: "2024-11-05",
    product: "Serum Anti-Chute"
  },
  {
    id: "9",
    name: "Laila F.",
    rating: 4,
    comment: "Tres satisfaite de ma commande. Les produits sentent merveilleusement bon et sont 100% naturels comme promis.",
    date: "2024-10-28",
    product: "Creme Hydratante"
  },
  {
    id: "10",
    name: "Omar N.",
    rating: 5,
    comment: "J'ai offert le coffret cadeau a ma mere et elle a adore ! Presentation soignee et produits de qualite.",
    date: "2024-10-20",
    product: "Coffret Cadeau"
  }
];
