"use client";

import React, { useState } from "react";
import AddPetModal from "@/components/shared/AddPetModal";

export default function CabinetPage() {
  const [isAddPetModalOpen, setIsAddPetModalOpen] = useState(false);

  return (
    <>
      <main className="pt-24 pb-32 px-4 max-w-7xl mx-auto font-body">
        
        {/* Hero Section / Owner Profile */}
        <section className="relative mb-12">
          <div className="bg-surface-container-low rounded-xl p-8 md:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-8 border-none">
            <div className="relative group">
              <div className="absolute inset-0 bg-primary-container blur-2xl opacity-20 rounded-full group-hover:opacity-30 transition-opacity"></div>
              <img 
                alt="Аватар пользователя" 
                className="relative w-32 h-32 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1v_Sw7D64y9XkFXYrXaHM05QND-t5nUCkqBoOgi9Z-8e5sDyTA96XxU0f0cAGJ9WG1SZolx9FEJo84qipcS5HBFuxKnrtcrbNkYUmZTXbTw_QQK-cbYWJjIps26NpR3uOh26gk3V7XyvXyICB9kJDVsr7WsAf_Ci0lkI9mCXH5Mjxs3w3Svfbdww7uz9a8LBjt6qJXwB3aHHI9mUZ0BB-2LBG-cBGUzGvK9DorEU_ZmNSgFjA2aloXIDJnpJ44d_JPfMlZzqHXcI" 
                crossOrigin="anonymous" 
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-black font-headline text-on-surface mb-2 tracking-tight">Александр Волков</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 text-tertiary mb-6">
                <span className="material-symbols-outlined text-base">location_on</span>
                <span className="font-medium">Санкт-Петербург, Петроградский р-н</span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95">
                  Редактировать
                </button>
                <button className="bg-white text-primary border border-primary/20 px-8 py-3 rounded-full font-bold hover:bg-primary/5 transition-all">
                  Поделиться профилем
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Content Area (My Corgis & Stats) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* My Corgis Header */}
            <div className="flex justify-between items-end px-2">
              <div>
                <h2 className="text-2xl font-black font-headline text-on-surface">Мои корги</h2>
                <p className="text-on-surface-variant">2 хвостика в семье</p>
              </div>
              <button 
                onClick={() => setIsAddPetModalOpen(true)}
                className="flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-xl">add_circle</span>
                Добавить питомца
              </button>
            </div>

            {/* My Corgis List (Horizontal Scroll) */}
            <div className="flex gap-6 overflow-x-auto pb-4 hide-scrollbar snap-x">
              {/* Pet Card 1 */}
              <div className="min-w-[300px] md:min-w-[340px] snap-start bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group border-none cursor-pointer">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    alt="Корги Пряник" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1nwSy8WH7taF12JiFOJia_i-Sk4Ds4F6fSaJMQuNRSlMrw-9Mpf1C5vWDHZ13h5uhptDH87BX-wHzMwBNk74Ph3xRim-iA-dHTGE3by-dh7J-RTaMaWtBzCTobh_K0daHHsENLWF3GyAjjRWqRErIuhvm2-H9qK6Xw8vgzqqtUr3Y0RfvjKhKZIHy2RwtKxsE-m7HjWZzbdmzxWG22uN1UuzzcgHadcJNN8ExOyVqfYZvzmolbmT4HVQFKLpLv0wAi_jSWmKfoCo" 
                    crossOrigin="anonymous" 
                  />
                  <div className="absolute top-3 right-3 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Чемпион
                  </div>
                </div>
                <h3 className="text-xl font-bold font-headline mb-1">Пряник</h3>
                <p className="text-sm text-on-surface-variant mb-3">3 года • Пемброк</p>
                <p className="text-sm text-tertiary font-medium bg-tertiary/5 p-3 rounded-lg italic">
                  &quot;Обожает ловить капли дождя и бегать за чайками на набережной&quot;
                </p>
              </div>

              {/* Pet Card 2 */}
              <div className="min-w-[300px] md:min-w-[340px] snap-start bg-surface-container-lowest rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group border-none cursor-pointer">
                <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                  <img 
                    alt="Корги Булочка" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMQ2SKJ5ncbXxgbXMhvcLhksx0SsLx1rxrdLenLIDJHfWvrzPdOctY7qoc6zk36JGQEdapnLL4gajgftW24r079pxnbLW24DY74Hh85R74n48HD9u41rh9ff43TlRs9eGs9kGbi_TcBm6A3_Nx9c2KPBkM6KK_-kdQ8Roly8kbIgvCjdy1L9ypAVi-i3oTs_Egc9W3RUoiza4BsLr6RsykimAFLKBKax7F3PboW5v1OSPWm-7Nhkl_efVyGnuOZh4YA9ODKHcAi8g" 
                    crossOrigin="anonymous" 
                  />
                  <div className="absolute top-3 right-3 bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    Любитель бегать
                  </div>
                </div>
                <h3 className="text-xl font-bold font-headline mb-1">Булочка</h3>
                <p className="text-sm text-on-surface-variant mb-3">1.5 года • Кардиган</p>
                <p className="text-sm text-tertiary font-medium bg-tertiary/5 p-3 rounded-lg italic">
                  &quot;Самый быстрый корги в Таврическом саду. Не ест, если не почесать пузо&quot;
                </p>
              </div>
            </div>

            {/* Stats and Achievement Section */}
            <div className="bg-primary text-on-primary rounded-xl p-8 relative overflow-hidden mt-2 border-none">
              <div className="absolute -right-8 -bottom-8 opacity-10">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              </div>
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4">
                  <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shadow-lg shrink-0">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  </div>
                  <div>
                    <p className="text-xs uppercase font-black opacity-80 tracking-widest leading-loose">Уровень</p>
                    <h4 className="text-xl font-bold font-headline leading-tight">Золотая лапка</h4>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black font-headline">24</span>
                  <span className="text-sm opacity-80 pt-1">Посещено встреч</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black font-headline">152</span>
                  <span className="text-sm opacity-80 pt-1">Постов на форуме</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Content */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Calendar Block */}
            <div className="bg-surface-container-high rounded-xl p-6 border-none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-black font-headline">Календарь ухода</h2>
                <span className="material-symbols-outlined text-primary">event</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg flex gap-4 items-center">
                  <div className="bg-orange-100 text-orange-800 px-3 py-2 rounded flex flex-col items-center min-w-[50px]">
                    <span className="text-[10px] font-bold">ЗАВТРА</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Прогулка в саду</h4>
                    <p className="text-xs text-on-surface-variant">Таврический сад, 18:00</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg flex gap-4 items-center opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                  <div className="bg-stone-100 text-stone-600 px-3 py-2 rounded flex flex-col items-center min-w-[50px]">
                    <span className="text-[10px] font-bold uppercase">12 Мар</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Прививка</h4>
                    <p className="text-xs text-on-surface-variant">Ветклиника «Лапа»</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg flex gap-4 items-center opacity-80 cursor-pointer hover:opacity-100 transition-opacity">
                  <div className="bg-stone-100 text-stone-600 px-3 py-2 rounded flex flex-col items-center min-w-[50px]">
                    <span className="text-[10px] font-bold uppercase">20 Мар</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Груминг</h4>
                    <p className="text-xs text-on-surface-variant">Студия «Пушистик»</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 py-3 border-2 border-primary/20 text-primary font-bold rounded-lg hover:bg-primary/5 transition-all text-sm active:scale-95">
                Открыть весь график
              </button>
            </div>

            {/* Communities & Discussion */}
            <div className="bg-surface-container-low rounded-xl p-6 border-none">
              <h2 className="text-xl font-black font-headline mb-4">Сообщества</h2>
              <div className="space-y-3">
                <a className="block p-3 rounded-lg hover:bg-white transition-colors group" href="#">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-tertiary text-white rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">groups</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">Петроградские корги</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Районная группа • 42 участника</p>
                    </div>
                  </div>
                </a>
                <a className="block p-3 rounded-lg hover:bg-white transition-colors group" href="#">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-sm">forum</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm group-hover:text-primary transition-colors">Лучший корм для щенков</p>
                      <p className="text-xs text-on-surface-variant mt-0.5">Активно сейчас: 12 ответов</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Notifications Settings */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-outline-variant/10">
              <h2 className="text-xl font-black font-headline mb-4">Уведомления</h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium">События и встречи</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="text-sm font-medium">Здоровье и календарь</span>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input className="sr-only peer" type="checkbox" defaultChecked />
                    <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </main>

      <AddPetModal isOpen={isAddPetModalOpen} onClose={() => setIsAddPetModalOpen(false)} />
    </>
  );
}
