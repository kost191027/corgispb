import type { MapMarker } from "@/components/map/YandexMap";

export type CommunityMapCategory = "all" | "parks" | "cafes" | "community";

export type CommunityMapSpotAuthor = {
  id?: string;
  name: string;
  profileHref?: string;
  isAdmin?: boolean;
};

export type CommunityMapSpot = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  district: string;
  category: Exclude<CommunityMapCategory, "all">;
  coordinates: [number, number];
  color: NonNullable<MapMarker["color"]>;
  iconName: string;
  badge: string;
  author?: CommunityMapSpotAuthor;
  source?: "editorial" | "community";
};

export type CommunityMapDistrictStat = {
  district: string;
  ownersCount: number;
  pointsCount: number;
  ownersLabel: string;
  pointsLabel: string;
};

export const COMMUNITY_MAP_SPOTS: CommunityMapSpot[] = [
  {
    id: "park-300",
    title: "Парк 300-летия",
    subtitle: "Большая территория у залива",
    description: "Самая просторная локация для забегов, встреч и спокойных вечерних прогулок у воды.",
    district: "Приморский",
    category: "parks",
    coordinates: [30.2146, 59.9722],
    color: "green",
    iconName: "park",
    badge: "Прогулки и встречи",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
  {
    id: "tavrichesky",
    title: "Таврический сад",
    subtitle: "Вечерние прогулки и встречи центра",
    description: "Знаковая точка для центрального сообщества: сюда удобно приехать после работы и быстро собрать корги-компанию.",
    district: "Центральный",
    category: "community",
    coordinates: [30.3685, 59.9483],
    color: "teal",
    iconName: "groups",
    badge: "Активная группа",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
  {
    id: "yusupov",
    title: "Юсуповский сад",
    subtitle: "Пикники и фотосессии",
    description: "Неспешные выходные встречи, пледы на траве и безопасный формат для новичков и щенков.",
    district: "Адмиралтейский",
    category: "parks",
    coordinates: [30.2987, 59.9278],
    color: "green",
    iconName: "photo_camera",
    badge: "Семейный формат",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
  {
    id: "dog-cafe-lapki",
    title: "Dog-friendly кафе «Лапки»",
    subtitle: "Петроградская сторона",
    description: "Кофе, вода для собак, пледы и понятный шумовой фон. Хорошая остановка после прогулки.",
    district: "Петроградский",
    category: "cafes",
    coordinates: [30.3095, 59.9685],
    color: "orange",
    iconName: "coffee",
    badge: "Кофе после прогулки",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
  {
    id: "hvost-i-usy",
    title: "Кафе «Хвост и Усы»",
    subtitle: "В.О., 6-я линия",
    description: "Теплое место для коротких встреч и знакомства владельцев из Василеостровского района.",
    district: "Василеостровский",
    category: "cafes",
    coordinates: [30.2867, 59.9567],
    color: "orange",
    iconName: "lunch_dining",
    badge: "Dog-friendly кафе",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
  {
    id: "sevcable-group",
    title: "Севкабель и набережная",
    subtitle: "Группа Василеостровского района",
    description: "Чат и офлайн-точка для вечерних встреч, быстрых прогулок и анонсов по выходным.",
    district: "Василеостровский",
    category: "community",
    coordinates: [30.2279, 59.9246],
    color: "teal",
    iconName: "pets",
    badge: "Живой чат района",
    author: { name: "Редакция Корги СПб", isAdmin: true },
    source: "editorial",
  },
];

export const COMMUNITY_MAP_CATEGORIES: Array<{
  id: CommunityMapCategory;
  label: string;
  iconName: string;
  badge: string;
  color: NonNullable<MapMarker["color"]>;
}> = [
  { id: "all", label: "Все точки", iconName: "map", badge: "Все места", color: "orange" },
  { id: "parks", label: "Парки и сады", iconName: "park", badge: "Прогулки и встречи", color: "green" },
  { id: "cafes", label: "Dog-friendly кафе", iconName: "coffee", badge: "Dog-friendly кафе", color: "orange" },
  { id: "community", label: "Районные группы", iconName: "groups", badge: "Активная группа", color: "teal" },
];

export function toCommunityMapMarker(spot: CommunityMapSpot): MapMarker {
  return {
    id: spot.id,
    coordinates: spot.coordinates,
    title: spot.title,
    badge: spot.badge,
    subtitle: spot.subtitle,
    color: spot.color,
    iconName: spot.iconName,
  };
}

export function getCommunityCategoryMeta(category: Exclude<CommunityMapCategory, "all">) {
  return COMMUNITY_MAP_CATEGORIES.find((item) => item.id === category)!;
}

function pluralizeCount(
  count: number,
  forms: [string, string, string],
) {
  const absolute = Math.abs(count) % 100;
  const lastDigit = absolute % 10;

  if (absolute > 10 && absolute < 20) {
    return forms[2];
  }

  if (lastDigit > 1 && lastDigit < 5) {
    return forms[1];
  }

  if (lastDigit === 1) {
    return forms[0];
  }

  return forms[2];
}

export function formatOwnersLabel(count: number) {
  return `${count} ${pluralizeCount(count, ["владелец", "владельца", "владельцев"])}`;
}

export function formatPointsLabel(count: number) {
  return `${count} ${pluralizeCount(count, ["точка", "точки", "точек"])}`;
}

export function buildCommunityDistrictStat(
  district: string,
  ownersCount: number,
  pointsCount: number,
): CommunityMapDistrictStat {
  return {
    district,
    ownersCount,
    pointsCount,
    ownersLabel: formatOwnersLabel(ownersCount),
    pointsLabel: formatPointsLabel(pointsCount),
  };
}
