"use client";

import React from "react";

interface AddPetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddPetModal({ isOpen, onClose }: AddPetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-12 bg-inverse-surface/40 backdrop-blur-md font-body">
      {/* Modal Card */}
      <div className="bg-surface-container-lowest w-full max-w-5xl max-h-[95vh] overflow-y-auto hide-scrollbar rounded-xl shadow-2xl flex flex-col md:flex-row relative">
        
        {/* Left Side: Photo Upload Area */}
        <div className="w-full md:w-5/12 p-8 bg-surface-container-low border-r border-outline-variant/15">
          <div className="sticky top-0 space-y-6">
            <h3 className="text-2xl font-bold font-headline text-on-surface-variant flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
               Фотографии
            </h3>

            {/* Main Photo Placeholder */}
            <div className="aspect-square w-full rounded-xl border-2 border-dashed border-outline-variant bg-surface-container flex flex-col items-center justify-center gap-4 text-outline group hover:border-primary/50 transition-colors cursor-pointer overflow-hidden relative">
              <span className="material-symbols-outlined text-5xl">add_a_photo</span>
              <div className="text-center px-6">
                <p className="font-bold text-on-surface">Главное фото</p>
                <p className="text-sm opacity-60">Нажмите для выбора</p>
              </div>
            </div>

            {/* Additional Photos Slots */}
            <div className="grid grid-cols-3 gap-4">
              <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center text-outline hover:border-primary/50 cursor-pointer">
                <span className="material-symbols-outlined">add</span>
              </div>
              <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center text-outline hover:border-primary/50 cursor-pointer">
                <span className="material-symbols-outlined">add</span>
              </div>
              <div className="aspect-square rounded-lg border-2 border-dashed border-outline-variant bg-surface-container flex items-center justify-center text-outline hover:border-primary/50 cursor-pointer">
                <span className="material-symbols-outlined">add</span>
              </div>
            </div>

            <div className="p-6 bg-surface rounded-lg border border-outline-variant/20 italic text-sm text-tertiary">
              &quot;Совет: Лучше всего смотрятся фото при дневном свете, когда корги улыбается!&quot;
            </div>
          </div>
        </div>

        {/* Right Side: Form Content */}
        <div className="w-full md:w-7/12 p-8 md:p-12">
          <div className="flex justify-between items-start mb-10">
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-headline text-on-surface tracking-tight flex items-center gap-3">
                Добавить хвостика
                <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>pets</span>
              </h2>
              <p className="text-on-surface-variant">Расскажите о своем пушистом друге</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-surface-container-high rounded-full transition-colors active:scale-95 text-outline"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            {/* Row 1: Name & Age */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Кличка</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant" 
                  placeholder="Напр. Арчи" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Возраст</label>
                <input 
                  className="w-full px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant" 
                  placeholder="Напр. 2 года" 
                  type="text"
                />
              </div>
            </div>

            {/* Row 2: Breed Segmented Control */}
            <div className="space-y-3">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Порода</label>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 bg-secondary-container text-on-secondary-container rounded-full font-bold shadow-sm ring-2 ring-secondary/20 transition-all" type="button">Pembroke</button>
                <button className="px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-medium hover:bg-surface-container-highest transition-all" type="button">Cardigan</button>
                <button className="px-6 py-3 bg-surface-container-high text-on-surface-variant rounded-full font-medium hover:bg-surface-container-highest transition-all" type="button">Other</button>
              </div>
            </div>

            {/* Row 3: District Dropdown */}
            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Район прогулок</label>
              <div className="relative">
                <select className="w-full appearance-none px-6 py-4 bg-surface-container-high rounded-full focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all text-on-surface">
                  <option value="">Выберите район</option>
                  <option>Приморский</option>
                  <option>Центральный</option>
                  <option>Василеостровский</option>
                  <option>Выборгский</option>
                  <option>Московский</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                  <span className="material-symbols-outlined text-outline">expand_more</span>
                </div>
              </div>
            </div>

            {/* Row 4: Character Chips */}
            <div className="space-y-3">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">Характер</label>
              <div className="flex flex-wrap gap-2">
                <div className="px-4 py-2 bg-surface-container-highest rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary-fixed transition-colors">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm font-medium">Игривый</span>
                </div>
                <div className="px-4 py-2 bg-primary-fixed text-on-primary-fixed-variant rounded-full flex items-center gap-2 cursor-pointer ring-2 ring-primary/30">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm font-bold">Любит мяч</span>
                </div>
                <div className="px-4 py-2 bg-surface-container-highest rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary-fixed transition-colors">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm font-medium">Мастер сна</span>
                </div>
                <div className="px-4 py-2 bg-surface-container-highest rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary-fixed transition-colors">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm font-medium">Модник</span>
                </div>
                <div className="px-4 py-2 bg-surface-container-highest rounded-full flex items-center gap-2 cursor-pointer hover:bg-primary-fixed transition-colors">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  <span className="text-sm font-medium">Бегун</span>
                </div>
              </div>
            </div>

            {/* Row 5: Textarea */}
            <div className="space-y-2">
              <label className="font-headline text-sm font-bold text-on-surface-variant uppercase tracking-wider ml-1">О характере</label>
              <textarea 
                className="w-full px-6 py-4 bg-surface-container-high rounded-xl focus:ring-2 focus:ring-primary/40 border-none outline-none transition-all placeholder:text-outline-variant resize-none" 
                placeholder="Расскажите небольшую историю о вашем корги..." 
                rows={4}
              ></textarea>
            </div>

            {/* Row 6: Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                className="bg-gradient-to-r from-primary to-primary-container text-white font-bold px-10 py-4 rounded-full shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-300 flex-1 order-2 sm:order-1" 
                type="submit"
                onClick={onClose}
              >
                Опубликовать
              </button>
              <button 
                className="px-10 py-4 bg-surface-container-highest text-on-surface-variant font-bold rounded-full hover:bg-surface-container-high transition-all flex-1 order-1 sm:order-2 active:scale-95" 
                type="button"
                onClick={onClose}
              >
                Отмена
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
