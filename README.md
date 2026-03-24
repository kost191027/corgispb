<div align="center">

<img src="public/favicon.ico" width="80" alt="CorgiSPB Logo" />

# 🐾 КоргиСПБ — Портал коргиводов Санкт-Петербурга

**Масштабный городской портал для владельцев и заводчиков корги в Санкт-Петербурге**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Appwrite](https://img.shields.io/badge/Appwrite-BaaS-F02E65?logo=appwrite)](https://appwrite.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📖 О проекте

**КоргиСПБ** — это не просто сайт, это живая экосистема для всех, кто влюблён в вельш-корги пемброк и кардиган. Проект объединяет тысячи владельцев, заводчиков и экспертов Санкт-Петербурга на единой платформе.

### Миссия

> Создать самый полезный, красивый и дружелюбный цифровой дом для корги-сообщества северной столицы.

### Почему это важно?

В Петербурге уже сформировалось большое и активное сообщество любителей корги. Прежде оно было разрознено по чатам и группам в соцсетях. **КоргиСПБ** объединяет все точки входа — от поиска щенка до экстренной помощи при потере питомца — в едином, современном продукте.

---

## ✨ Ключевые возможности

### 🏠 Главная страница
- Интерактивная карта прогулок и горячих точек СПб (Яндекс Карты API 3.0)
- Афиша ближайших корги-встреч
- Лента новостей и экспертных статей
- Экстренная кнопка SOS

### 🐕 О породе
- Полное руководство по породе корги (пемброк и кардиган)
- Раздел Здоровье с экспертными статьями
- Калькулятор рациона питания
- Раздел «Как выбрать корги»

### 🤝 Сообщество
- **Форум** с тематическими обсуждениями и вложенными комментариями
- **Карта встреч** — интерактивная афиша прогулок и событий с фильтрами по районам
- **Фотогалерея** — архив встреч сообщества

### 🔧 Сервисы
- **SOS-модалка** — молниеносная публикация объявления о пропаже питомца с прикреплением фото и карты
- **Потеряшки** — отдельная страница поиска пропавших животных
- **Заводчики** — каталог проверенных питомников с детальными страницами (Royal Tails style)
- **Личный кабинет** — профиль владельца, управление питомцами, история встреч

### 🔐 Авторизация
- Регистрация и вход через email/пароль
- Защищённые роуты для авторизованных пользователей
- Rate-limiting и защита Appwrite

---

## 🛠 Технологический стек

### Frontend

| Технология | Версия | Назначение |
|---|---|---|
| **Next.js** | 14 (App Router) | SSR/SSG, файловый роутинг, intercepting routes |
| **React** | 18 | UI-компоненты, хуки |
| **TypeScript** | 5 | Строгая типизация |
| **Tailwind CSS** | 3 | Утилитарная стилизация |
| **Framer Motion** | 12 | Анимации и переходы |

### UI & Дизайн-система

| Технология | Назначение |
|---|---|
| **Material Symbols Outlined** | Иконки (локально, без CDN) |
| **Plus Jakarta Sans** | Заголовочный шрифт (headline) |
| **Be Vietnam Pro** | Основной шрифт (body) |
| **Material Design 3** | Цветовые токены (surface, primary, tertiary...) |
| **Radix UI** | Accessible primitives — Dialog, DropdownMenu |

Дизайн-система «**The Playful Editorial**» — авторская тема на базе Material Design 3 с тёплой оранжево-терракотовой палитрой, glassmorphism и плавными микроанимациями.

### Backend & Инфраструктура

| Технология | Назначение |
|---|---|
| **Appwrite** | BaaS — Auth, Database, Storage, Real-time |
| **node-appwrite** | Server-side SDK для Next.js Server Actions |
| **Yandex Maps API 3.0** | Интерактивные карты (прогулки, потеряшки) |

### Управление состоянием и формами

| Библиотека | Назначение |
|---|---|
| **Zustand** | Глобальное состояние (авторизация, UI) |
| **TanStack Query** | Серверное состояние, кэширование |
| **React Hook Form** | Управление формами |
| **Zod** | Валидация схем данных |

### Инструменты разработки

| Инструмент | Назначение |
|---|---|
| **Husky** | Git hooks, проверка кода перед коммитом |
| **ESLint** | Линтинг |
| **PostCSS** | Обработка CSS |

---

## 📁 Структура проекта

```
corgi-portal/
├── src/
│   ├── app/                        # Роутинг (Next.js App Router)
│   │   ├── @modal/                 # Intercepting routes (модальные окна)
│   │   ├── about/                  # Раздел «О породе»
│   │   │   ├── health/             # Здоровье + статьи экспертов
│   │   │   └── how-to-choose/      # Как выбрать корги
│   │   ├── breeders/
│   │   │   └── [breederId]/        # Детальная страница питомника
│   │   ├── cabinet/                # Личный кабинет
│   │   ├── calculator/             # Калькулятор питания
│   │   ├── community/              # Сообщество
│   │   │   └── forum/
│   │   │       └── [articleId]/    # Статья форума
│   │   ├── login/                  # Вход
│   │   ├── meetings/               # Встречи и события
│   │   ├── pets/                   # Питомцы пользователя
│   │   ├── register/               # Регистрация
│   │   ├── sos/                    # Страница SOS
│   │   ├── layout.tsx
│   │   └── page.tsx                # Главная страница
│   ├── components/
│   │   ├── shared/                 # Переиспользуемые компоненты
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SosModal.tsx
│   │   │   └── AddPetModal.tsx
│   │   └── ui/                     # UI-примитивы
│   └── lib/                        # Утилиты и конфигурация
│       └── appwrite/               # Appwrite client, auth, db
└── public/                         # Статические ресурсы
    ├── fonts/                      # Шрифты (локально)
    └── icons/                      # Material Symbols (локально)
```

---

## 🚀 Быстрый старт

### Требования

- Node.js 18+
- npm или yarn
- Аккаунт [Appwrite Cloud](https://cloud.appwrite.io/) или self-hosted инстанс

### Установка

```bash
# 1. Клонировать репозиторий
git clone https://github.com/your-username/corgi-portal.git
cd corgi-portal

# 2. Установить зависимости
npm install

# 3. Создать файл окружения
cp .env.example .env.local
```

### Настройка переменных окружения

```env
# Appwrite
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=ваш_project_id
APPWRITE_API_KEY=ваш_server_api_key

# Коллекции Appwrite
NEXT_PUBLIC_APPWRITE_DB_ID=corgi_db
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=users
NEXT_PUBLIC_APPWRITE_PETS_COLLECTION=pets
NEXT_PUBLIC_APPWRITE_LOST_COLLECTION=lost_pets

# Yandex Maps
NEXT_PUBLIC_YANDEX_MAPS_KEY=ваш_ключ
```

### Запуск

```bash
# Режим разработки
npm run dev

# Сборка продакшн-версии
npm run build && npm start

# Линтинг
npm run lint
```

Откройте [http://localhost:3000](http://localhost:3000).

---

## 🗺 Страницы и роуты

| Роут | Описание |
|---|---|
| `/` | Главная страница с картой и афишей |
| `/about` | О породе корги |
| `/about/health` | Здоровье и питание |
| `/about/health/[articleId]` | Статья эксперта |
| `/about/how-to-choose` | Как выбрать корги |
| `/community` | Сообщество и форум |
| `/community/forum/[articleId]` | Статья на форуме |
| `/meetings` | Встречи и события |
| `/breeders` | Каталог заводчиков |
| `/breeders/[breederId]` | Страница питомника |
| `/calculator` | Калькулятор рациона |
| `/sos` | Потеряшки и SOS |
| `/cabinet` | Личный кабинет |
| `/login` | Вход |
| `/register` | Регистрация |

---

## 🎨 Дизайн-система

Проект использует авторскую дизайн-систему **«The Playful Editorial»**:

- **Цвета**: Material Design 3 — тёплая терракотово-оранжевая палитра (`primary: #904d00`, `tertiary: #2a676e`)
- **Шрифты**: Plus Jakarta Sans (заголовки) + Be Vietnam Pro (текст)
- **Компоненты**: Glassmorphism, bento-сетки, rounded-[2rem] карточки
- **Иконки**: Material Symbols Outlined (localized, `FILL` 0→1 анимации)
- **Тени**: layered shadows с цветными оттенками через `shadow-primary/20`

---

<div align="center">
  Сделано с ❤️ в Санкт-Петербурге 🐾
</div>
