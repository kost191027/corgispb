export type CommunityGroup = {
  id: string;
  name: string;
  district: string;
  todayTopic: string;
  description: string;
  imageUrl?: string;
  membersCount?: number;
  source?: "editorial" | "community";
  authorId?: string;
  authorName?: string;
  createdAt?: string;
};

export const COMMUNITY_GROUPS: CommunityGroup[] = [
  {
    id: "group-primorsky",
    name: "Приморские Булочки",
    district: "Приморский",
    todayTopic: "Лучшие дождевики для Питера",
    description:
      "Живая районная группа для прогулок у залива, быстрых созвонов и обмена советами по активным маршрутам.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCao7eAlsRZZBVp-LBvyonKM1X7d-RIBNhTTHpXsr8gcSZaSyD17UOIIph1zf1fUL5Z16CSgzwlN95VXaBQFdYemwIAdM18OQo_GjV87Wr5d_4zu46jGWQurw9yrsXPRv8EptqQwAWaVGw9_BxTuR52TyJ_lt7OgwuRusZpcdzF-X6TBqfKd9zWaDC-h4AJ1urKdIudMzXJxI1mO2KjiJosntlKTUdSUItfX7JFVMQZJJ73Ndy9-My1IFnz0EPSnlZBKMRJ98v8U6A",
    source: "editorial",
  },
  {
    id: "group-central",
    name: "Центральные Коржи",
    district: "Центральный",
    todayTopic: "Встреча в Таврическом саду",
    description:
      "Городской чат для тех, кто любит короткие прогулки после работы, фотосессии и быстрые сборы в центре.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClP-AZnXv_kdT6RYgbHicUI1a6QoGs4ilE8Ldx-4y1cPoH6rSzDj8azX5TOoPHLhPIC0Jf-cO-wQce4t9II-nLCgs0tmWXoN61KePrpn71Xwh4n5HkxulnaveJBZHWFIrOefcuh8oav3P22JYroclu9Ipoav-P0ST2wKYxXFCZVy1jK21dGlUz36lPtz3kpFK5gaSeJxSw3u_fW_JKxpN9lNj-iJWt1YghqsLqDyxvUGL4KuDuRIWyIXCT36ogOAJuRWYWqknQubk",
    source: "editorial",
  },
  {
    id: "group-petrogradsky",
    name: "Петроградские Ушки",
    district: "Петроградский",
    todayTopic: "Где устроить раннюю прогулку без толпы",
    description:
      "Собираемся на тихие утренние прогулки, делимся дог-френдли локациями и дружим семьями.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCao7eAlsRZZBVp-LBvyonKM1X7d-RIBNhTTHpXsr8gcSZaSyD17UOIIph1zf1fUL5Z16CSgzwlN95VXaBQFdYemwIAdM18OQo_GjV87Wr5d_4zu46jGWQurw9yrsXPRv8EptqQwAWaVGw9_BxTuR52TyJ_lt7OgwuRusZpcdzF-X6TBqfKd9zWaDC-h4AJ1urKdIudMzXJxI1mO2KjiJosntlKTUdSUItfX7JFVMQZJJ73Ndy9-My1IFnz0EPSnlZBKMRJ98v8U6A",
    source: "editorial",
  },
  {
    id: "group-admiralteysky",
    name: "Адмиралтейские Хвосты",
    district: "Адмиралтейский",
    todayTopic: "Идеи для летнего пикника с корги",
    description:
      "Неспешная районная группа для камерных встреч, пикников и общения тех, кто живет ближе к воде и садам.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClP-AZnXv_kdT6RYgbHicUI1a6QoGs4ilE8Ldx-4y1cPoH6rSzDj8azX5TOoPHLhPIC0Jf-cO-wQce4t9II-nLCgs0tmWXoN61KePrpn71Xwh4n5HkxulnaveJBZHWFIrOefcuh8oav3P22JYroclu9Ipoav-P0ST2wKYxXFCZVy1jK21dGlUz36lPtz3kpFK5gaSeJxSw3u_fW_JKxpN9lNj-iJWt1YghqsLqDyxvUGL4KuDuRIWyIXCT36ogOAJuRWYWqknQubk",
    source: "editorial",
  },
];
