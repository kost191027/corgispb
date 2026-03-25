import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container mt-auto px-6 py-12 text-on-surface">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-display font-bold text-primary mb-4">Корги СПб</h3>
          <p className="text-on-surface/70 text-sm">
            Главное сообщество любителей корги в Санкт-Петербурге. Гуляем, общаемся, помогаем.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">О проекте</h4>
          <ul className="space-y-2 text-sm text-on-surface/70">
            <li><Link href="/about" className="hover:text-primary transition-colors">О нас</Link></li>
            <li><Link href="/community" className="hover:text-primary transition-colors">Комьюнити</Link></li>
            <li><Link href="/community/forum" className="hover:text-primary transition-colors">Правила форума</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Сервисы</h4>
          <ul className="space-y-2 text-sm text-on-surface/70">
            <li><Link href="/sos" className="hover:text-primary transition-colors">Потеряшки (SOS)</Link></li>
            <li><Link href="/calculator" className="hover:text-primary transition-colors">Калькулятор</Link></li>
            <li><Link href="/breeders" className="hover:text-primary transition-colors">Заводчики</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4 text-sm">Мы в соцсетях</h4>
          <ul className="space-y-2 text-sm text-on-surface/70">
            <li><a href="#" className="hover:text-primary transition-colors">Telegram Chat</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">VK Group</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl mt-12 pt-8 border-t border-outline-variant/30 text-center text-sm text-on-surface/50">
        © {new Date().getFullYear()} Корги СПб. Сделано с любовью к пушистым попкам.
      </div>
    </footer>
  );
}
