export type CategorySlug =
  | 'cricket'
  | 'football'
  | 'badminton'
  | 'fitness'
  | 'sportswear'
  | 'accessories'

export type Product = {
  id: string
  slug: string
  name: string
  description: string
  longDescription: string
  category: CategorySlug
  group: string
  image: string
  images: string[]
  specs: Record<string, string>
}

const photos = {
  bat: '/gear/bat-portrait.jpg',
  ball: '/gear/ball-shuttle.jpg',
  kit: '/gear/hero-gear.jpg',
  cricket: '/gear/hero-gear.jpg',
  football:
    'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=80',
  badminton:
    'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1400&q=80',
  fitness:
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1400&q=80',
  sportswear:
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1400&q=80',
  accessories:
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=80',
}

export const categories: {
  slug: CategorySlug
  name: string
  description: string
  image: string
  href: string
}[] = [
  {
    slug: 'cricket',
    name: 'Cricket',
    description: 'Bats, balls, protection, keeping gear and full kits',
    image: photos.cricket,
    href: '/shop/cricket',
  },
  {
    slug: 'football',
    name: 'Football',
    description: 'Match balls, boots, guards and team kits',
    image: photos.football,
    href: '/shop/football',
  },
  {
    slug: 'badminton',
    name: 'Badminton',
    description: 'Rackets, shuttlecocks, grips and court shoes',
    image: photos.badminton,
    href: '/shop/badminton',
  },
  {
    slug: 'fitness',
    name: 'Fitness & Training',
    description: 'Drills, strength and warm-up gear',
    image: photos.fitness,
    href: '/shop/fitness',
  },
  {
    slug: 'sportswear',
    name: 'Sportswear',
    description: 'Sublimation jerseys, tracksuits and training wear',
    image: photos.sportswear,
    href: '/shop/sportswear',
  },
  {
    slug: 'accessories',
    name: 'Accessories',
    description: 'Bags, grips, bottles and match-day extras',
    image: photos.accessories,
    href: '/shop/accessories',
  },
]

function gear(
  id: string,
  slug: string,
  name: string,
  description: string,
  category: CategorySlug,
  group: string,
  image: string,
  specs: Record<string, string>,
): Product {
  return {
    id,
    slug,
    name,
    description,
    longDescription: `${description} Visit LBW Sports in Hanamkonda or Mancherial, or send a WhatsApp enquiry and we will confirm what is on the shelf.`,
    category,
    group,
    image,
    images: [image],
    specs,
  }
}

export const products: Product[] = [
  gear('c1', 'english-willow-bats', 'English willow bats', 'Grade willow bats for club and match play.', 'cricket', 'Bats', photos.bat, { Willow: 'English willow', Sizes: 'Junior to full', Grip: 'In store' }),
  gear('c2', 'kashmir-willow-bats', 'Kashmir willow bats', 'Hard-wearing bats for nets, school and tape ball.', 'cricket', 'Bats', photos.bat, { Willow: 'Kashmir willow', Use: 'Practice and tape ball' }),
  gear('c3', 'junior-cricket-bats', 'Junior cricket bats', 'Shorter bats sized for kids and beginners.', 'cricket', 'Bats', photos.bat, { Sizes: 'Kids and junior', Use: 'Academy and school' }),
  gear('c4', 'leather-cricket-balls', 'Leather cricket balls', 'Red and white leather balls for turf cricket.', 'cricket', 'Balls', photos.ball, { Colour: 'Red / white', Use: 'Match and nets' }),
  gear('c5', 'tennis-cricket-balls', 'Tennis cricket balls', 'Tennis balls for practice, tape ball and street cricket.', 'cricket', 'Balls', photos.ball, { Type: 'Tennis cricket', Packs: 'Ask in store' }),
  gear('c6', 'batting-gloves', 'Batting gloves', 'Left and right batting gloves in junior and adult sizes.', 'cricket', 'Protection', photos.cricket, { Hand: 'Left / right', Sizes: 'Junior to adult' }),
  gear('c7', 'batting-pads', 'Batting pads', 'Pads with a firm knee roll for junior and senior players.', 'cricket', 'Protection', photos.cricket, { Sizes: 'Youth / adult' }),
  gear('c8', 'cricket-helmets', 'Cricket helmets', 'Grille helmets with sizes for juniors and seniors.', 'cricket', 'Protection', photos.cricket, { Fit: 'Sized in store' }),
  gear('c9', 'thigh-abdominal-guards', 'Thigh and abdominal guards', 'Inner thigh guards and abdominal protectors.', 'cricket', 'Protection', photos.cricket, { Set: 'Thigh + abdominal' }),
  gear('c10', 'wicket-keeping-gloves', 'Wicket-keeping gloves', 'Keeping gloves for club and academy keepers.', 'cricket', 'Keeping', photos.cricket, { Hand: 'Left / right' }),
  gear('c11', 'wicket-keeping-pads', 'Wicket-keeping pads', 'Shorter keeping pads for crouch and movement.', 'cricket', 'Keeping', photos.cricket, { Sizes: 'Youth / adult' }),
  gear('c12', 'stumps-and-bails', 'Stumps and bails', 'Wooden and plastic stump sets for nets and matches.', 'cricket', 'Match kit', photos.cricket, { Sets: 'Full and practice' }),
  gear('c13', 'complete-cricket-kits', 'Complete cricket kits', 'Bat, pads, gloves, helmet and bag as a starter kit.', 'cricket', 'Match kit', photos.kit, { Levels: 'Junior / senior', Note: 'Contents confirmed in store' }),
  gear('c14', 'cricket-kit-bags', 'Cricket kit bags', 'Duffle and wheeled bags with a bat sleeve.', 'cricket', 'Match kit', photos.accessories, { Styles: 'Duffle / wheeled' }),
  gear('c15', 'cricket-shoes', 'Cricket shoes', 'Rubber and spike options for turf and matting.', 'cricket', 'Footwear', photos.cricket, { Sole: 'Rubber / spike', Fit: 'Try in store' }),

  gear('f1', 'match-footballs', 'Match footballs', 'Size 4 and size 5 balls for training and matches.', 'football', 'Balls', photos.football, { Sizes: '4 and 5' }),
  gear('f2', 'training-footballs', 'Training footballs', 'Durable balls for school and academy sessions.', 'football', 'Balls', photos.football, { Use: 'Training' }),
  gear('f3', 'football-boots', 'Football boots', 'Firm-ground boots in junior and adult sizes.', 'football', 'Boots & guards', photos.football, { Fit: 'Try in store' }),
  gear('f4', 'shin-guards', 'Shin guards', 'Slip-in and strap guards for juniors and seniors.', 'football', 'Boots & guards', photos.football, { Sizes: 'Junior / senior' }),
  gear('f5', 'goalkeeper-gloves', 'Goalkeeper gloves', 'Match and training gloves with finger protection.', 'football', 'Boots & guards', photos.football, { Use: 'Match / training' }),
  gear('f6', 'football-kits', 'Football kits', 'Club shirts, shorts and socks. Custom printing on request.', 'football', 'Teamwear', photos.sportswear, { Custom: 'Names and numbers' }),
  gear('f7', 'training-bibs', 'Training bibs', 'Mesh bibs for drills and small-sided games.', 'football', 'Teamwear', photos.football, { Packs: 'Ask in store' }),

  gear('b1', 'badminton-rackets', 'Badminton rackets', 'Steel and carbon rackets for school, club and college play.', 'badminton', 'Rackets', photos.badminton, { Frame: 'Steel / carbon', Weight: 'Ask in store' }),
  gear('b2', 'junior-rackets', 'Junior rackets', 'Lighter rackets sized for kids.', 'badminton', 'Rackets', photos.badminton, { Use: 'Kids and beginners' }),
  gear('b3', 'feather-shuttlecocks', 'Feather shuttlecocks', 'Feather shuttles for match play.', 'badminton', 'Shuttlecocks', photos.ball, { Type: 'Feather', Tubes: 'Ask in store' }),
  gear('b4', 'nylon-shuttlecocks', 'Nylon shuttlecocks', 'Nylon shuttles for practice and outdoor courts.', 'badminton', 'Shuttlecocks', photos.ball, { Type: 'Nylon' }),
  gear('b5', 'racket-grips', 'Racket grips', 'Replacement grips and overgrips.', 'badminton', 'Court', photos.badminton, { Type: 'Grip / overgrip' }),
  gear('b6', 'badminton-shoes', 'Badminton shoes', 'Court shoes with a non-marking sole.', 'badminton', 'Court', photos.badminton, { Sole: 'Non-marking', Fit: 'Try in store' }),
  gear('b7', 'badminton-nets', 'Badminton nets', 'Practice and match nets.', 'badminton', 'Court', photos.badminton, { Use: 'Court setup' }),

  gear('t1', 'agility-cones', 'Agility cones', 'Marker cones for drills and warm-ups.', 'fitness', 'Training', photos.fitness, { Use: 'Academy and school' }),
  gear('t2', 'agility-ladders', 'Agility ladders', 'Flat ladders for footwork sessions.', 'fitness', 'Training', photos.fitness, { Use: 'Speed and footwork' }),
  gear('t3', 'resistance-bands', 'Resistance bands', 'Loop bands for strength and rehab work.', 'fitness', 'Training', photos.fitness, { Levels: 'Light to heavy' }),
  gear('t4', 'skipping-ropes', 'Skipping ropes', 'Speed ropes for fitness and boxing warm-ups.', 'fitness', 'Training', photos.fitness, { Use: 'Conditioning' }),
  gear('t5', 'yoga-mats', 'Yoga mats', 'Training mats for floor work and stretching.', 'fitness', 'Training', photos.fitness, { Use: 'Floor work' }),
  gear('t6', 'exercise-gloves', 'Training gloves', 'Gym gloves for lifts and grip work.', 'fitness', 'Training', photos.fitness, { Sizes: 'Ask in store' }),

  gear('s1', 'sublimation-jerseys', 'Custom sublimation jerseys', 'Full-print team jerseys with names, numbers and logos.', 'sportswear', 'Teamwear', photos.sportswear, { Type: 'Sublimation', Order: 'WhatsApp the design' }),
  gear('s2', 'tracksuits', 'Tracksuits', 'Training suits for teams and academies.', 'sportswear', 'Teamwear', photos.sportswear, { Sizes: 'Kids to adult' }),
  gear('s3', 'sports-tshirts', 'Sports t-shirts', 'Training tees for practice and events.', 'sportswear', 'Teamwear', photos.sportswear, { Custom: 'Print on request' }),
  gear('s4', 'sports-shoes', 'Multi-sport shoes', 'Everyday trainers for turf, court and gym.', 'sportswear', 'Footwear', photos.sportswear, { Fit: 'Try in store' }),
  gear('s5', 'caps', 'Caps', 'Sports caps for teams and outdoor sessions.', 'sportswear', 'Teamwear', photos.sportswear, { Custom: 'Logo on request' }),

  gear('a1', 'kit-bags', 'Sports kit bags', 'Bags for cricket, football and multi-sport kits.', 'accessories', 'Bags', photos.accessories, { Styles: 'Backpack / duffle / trolley' }),
  gear('a2', 'water-bottles', 'Water bottles', 'Squeeze and sipper bottles for training.', 'accessories', 'Match day', photos.accessories, { Use: 'Training' }),
  gear('a3', 'sports-tape', 'Sports tape and grips', 'Bat grips, finger tape and racket grips.', 'accessories', 'Match day', photos.accessories, { Use: 'Bat, racket, fingers' }),
  gear('a4', 'whistles', 'Whistles', 'Coach whistles for academies and schools.', 'accessories', 'Match day', photos.accessories, { Use: 'Coaching' }),
  gear('a5', 'scorebooks', 'Scorebooks', 'Cricket scorebooks for clubs and schools.', 'accessories', 'Match day', photos.accessories, { Sport: 'Cricket' }),
]

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug)
}

export function getProductsByCategory(category: CategorySlug) {
  return products.filter((p) => p.category === category)
}

export function groupsFor(list: Product[]) {
  const order: string[] = []
  for (const item of list) {
    if (!order.includes(item.group)) order.push(item.group)
  }
  return order.map((group) => ({
    group,
    items: list.filter((item) => item.group === group),
  }))
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return products
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.group.toLowerCase().includes(q) ||
      p.category.includes(q),
  )
}
