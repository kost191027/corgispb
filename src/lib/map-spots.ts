import type { MapMarker } from "@/components/map/YandexMap";

export type CommunityMapCategory = "all" | "parks" | "cafes" | "community";

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
  },
];

export const COMMUNITY_MAP_CATEGORIES: Array<{
  id: CommunityMapCategory;
  label: string;
  iconName: string;
}> = [
  { id: "all", label: "Все точки", iconName: "map" },
  { id: "parks", label: "Парки и сады", iconName: "park" },
  { id: "cafes", label: "Dog-friendly кафе", iconName: "coffee" },
  { id: "community", label: "Районные группы", iconName: "groups" },
];

export const COMMUNITY_DISTRICT_STATS = [
  { district: "Приморский", ownersLabel: "210 владельцев" },
  { district: "Центральный", ownersLabel: "142 владельца" },
  { district: "Петроградский", ownersLabel: "89 владельцев" },
  { district: "Василеостровский", ownersLabel: "74 владельца" },
];

export function toCommunityMapMarker(spot: CommunityMapSpot): MapMarker {
  return {
    id: spot.id,
    coordinates: spot.coordinates,
    title: spot.title,
    subtitle: spot.subtitle,
    color: spot.color,
    iconName: spot.iconName,
  };
}
