import React from 'react';

export default function SosModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm font-body"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Modal Container — compact, scrollable */}
      <div className="relative w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto bg-surface-container-lowest shadow-2xl rounded-2xl md:rounded-[2rem] flex flex-col md:flex-row m-2">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant hover:bg-primary-container hover:text-on-primary transition-colors active:scale-95 shadow-sm"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        {/* Left Side: Visuals & Map */}
        <div className="w-full md:w-5/12 bg-surface-container-low p-4 md:p-5 flex flex-col gap-4">
          <div>
            <h3 className="font-headline font-black text-sm mb-2 text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
              Фотографии
            </h3>
            <div className="grid grid-cols-3 gap-1.5">
              <div className="col-span-3 aspect-[2.5/1] bg-surface-container-high rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer group">
                <span className="material-symbols-outlined text-2xl text-outline-variant mb-1 group-hover:scale-110 transition-transform">add_a_photo</span>
                <span className="text-[9px] font-bold text-on-surface-variant tracking-widest uppercase">Главное фото</span>
              </div>
              <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center border-2 border-dashed border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-outline-variant text-xl">add</span>
              </div>
              <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center border-2 border-dashed border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-outline-variant text-xl">add</span>
              </div>
              <div className="aspect-square bg-surface-container-high rounded-lg flex items-center justify-center border-2 border-dashed border-outline-variant/30 hover:bg-surface-container-highest transition-colors cursor-pointer">
                <span className="material-symbols-outlined text-outline-variant text-xl">add</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-headline font-black text-sm mb-2 text-primary flex items-center gap-1.5">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              Где и когда
            </h3>
            <div className="rounded-lg overflow-hidden h-28 bg-surface-container-high relative border border-outline-variant/20 shadow-inner group cursor-pointer">
              <img 
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                alt="Map showing St. Petersburg streets with a pin marker" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrE75o1RkIW06RQHV2npOdtaZCbmdiaxjY7ZBTjsYjqw9sixZ02m_RuO384aHcyDvMfd1Bki2sb7tg2ZEMxUwyzX1YtSN4R8U9qdIexYIE3uC_6ffrGyHnV2OamZhVV1ijT7h67yteFTrVfCk2Hy9wXHZBV1StWQo0CLieqPxEpzlkWt7P0VlTFxpzTj3TyH85oEQnF2R2A8AwdcBy7MZ-wZ10OUWb9NNbsP7mkypFhOZFM8UC9kz6PkixcacLoT_DR-NremqO_5o" 
                crossOrigin="anonymous" 
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg animate-bounce shadow-primary/40">
                  <span className="material-symbols-outlined text-on-primary text-xs">pets</span>
                </div>
              </div>
              <div className="absolute bottom-1.5 right-1.5 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase text-on-surface shadow-sm">
                Выбрать на карте
              </div>
            </div>
            
            <div className="mt-3">
              <label className="block text-[9px] font-bold text-outline-variant mb-1 uppercase tracking-widest pl-1">Дата и время пропажи</label>
              <input 
                className="w-full bg-surface-container-high border border-outline-variant/10 rounded-lg p-2.5 font-body text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all text-on-surface" 
                type="datetime-local" 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Form Details */}
        <div className="w-full md:w-7/12 p-4 md:p-5 flex flex-col justify-center">
          <header className="mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-[9px] font-black uppercase tracking-widest mb-2 shadow-sm">
              Срочное объявление
            </span>
            <h1 className="text-xl md:text-2xl font-headline font-black tracking-tight text-on-surface leading-[1.1]">
              SOS: Пропала <span className="text-primary italic">собака</span>
            </h1>
          </header>

          <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
            {/* Basic Info Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-outline-variant uppercase tracking-widest pl-1">Кличка</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-2.5 font-medium text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-stone-400" 
                  placeholder="Как зовут питомца?" 
                  type="text" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-[9px] font-bold text-outline-variant uppercase tracking-widest pl-1">Возраст</label>
                <input 
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-2.5 font-medium text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none transition-all placeholder:text-stone-400" 
                  placeholder="Напр. 2 года" 
                  type="text" 
                />
              </div>
            </div>

            {/* Breed Selection */}
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-outline-variant uppercase tracking-widest pl-1">Порода</label>
              <div className="flex flex-wrap gap-1.5">
                <label className="relative cursor-pointer group">
                  <input defaultChecked className="peer sr-only" name="breed" type="radio" />
                  <div className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface-variant text-xs font-bold peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-all duration-300">
                    Пемброк
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input className="peer sr-only" name="breed" type="radio" />
                  <div className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface-variant text-xs font-bold peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-all duration-300">
                    Кардиган
                  </div>
                </label>
                <label className="relative cursor-pointer group">
                  <input className="peer sr-only" name="breed" type="radio" />
                  <div className="px-3 py-1.5 rounded-full bg-surface-container-high border border-outline-variant/10 text-on-surface-variant text-xs font-bold peer-checked:bg-primary peer-checked:text-on-primary peer-checked:border-primary transition-all duration-300">
                    Другая
                  </div>
                </label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-outline-variant uppercase tracking-widest pl-1">Описание примет</label>
              <textarea 
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg p-2.5 font-medium text-sm focus:ring-2 focus:ring-primary/40 focus:border-primary/40 outline-none resize-none transition-all placeholder:text-stone-400" 
                placeholder="Особые отметины, ошейник, характер..." 
                rows={2}
              ></textarea>
            </div>

            {/* Contact & Reward */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-tertiary-container/10 border border-tertiary/10 rounded-xl">
              <div className="space-y-1 relative">
                <label className="block text-[9px] font-bold text-tertiary uppercase tracking-widest pl-1">Телефон для связи</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-tertiary text-sm">call</span>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-2.5 pl-8 font-medium text-sm focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary/40 outline-none transition-all placeholder:text-stone-300" 
                    placeholder="+7 (___) ___ __ __" 
                    type="tel" 
                  />
                </div>
              </div>
              <div className="space-y-1 relative">
                <label className="block text-[9px] font-bold text-tertiary uppercase tracking-widest pl-1">Вознаграждение</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-2.5 top-1/2 -translate-y-1/2 text-tertiary text-sm">card_giftcard</span>
                  <input 
                    className="w-full bg-surface-container-lowest border border-outline-variant/20 rounded-lg p-2.5 pl-8 font-medium text-sm focus:ring-2 focus:ring-tertiary/40 focus:border-tertiary/40 outline-none transition-all placeholder:text-stone-300" 
                    placeholder="0 ₽" 
                    type="text" 
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button 
                className="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary py-3 rounded-full font-headline font-black text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2" 
                type="submit"
                onClick={onClose}
              >
                Опубликовать объявление
                <span className="material-symbols-outlined font-black text-lg">send</span>
              </button>
              <p className="text-center font-body text-[8px] text-outline-variant uppercase tracking-widest leading-relaxed mt-1.5 font-bold max-w-sm mx-auto">
                Нажимая кнопку, вы соглашаетесь на рассылку всем участникам клуба.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
