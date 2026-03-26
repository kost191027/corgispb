"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { reportSosAction } from "@/actions/sos";

export function SosForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    const formData = new FormData(e.currentTarget);
    formData.set("breed", "Пемброк");
    formData.set("reportType", "lost");
    const result = await reportSosAction(formData);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.message);
    }

    setIsSubmitting(false);
  }

  if (success) {
    return (
      <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-ambient text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🚨</div>
        <h2 className="text-2xl font-display font-bold text-primary mb-2">Тревога отправлена!</h2>
        <p className="text-on-surface/70 mb-6 relative z-10">Мы разослали уведомление всем волонтерам и участникам чата. Надеемся, ваш питомец скоро найдется.</p>
        <Button onClick={() => setSuccess(false)}>Отправить еще одно</Button>
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest p-8 sm:p-12 rounded-[2rem] shadow-ambient">
      <div className="flex justify-between items-center mb-8 relative z-0">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-surface-container-low -z-10 -translate-y-1/2 rounded-full overflow-hidden">
           <div className="h-full bg-primary transition-all duration-300" style={{ width: step === 1 ? '50%' : '100%' }} />
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 1 ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface/50'}`}>1</div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${step >= 2 ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface/50'}`}>2</div>
      </div>

      <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); setStep(2); }} className="space-y-6 relative z-10">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-display font-bold mb-6">Шаг 1: Описание питомца</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface/80">Как зовут собаку?</label>
                <Input name="petName" required placeholder="Например: Арчи" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface/80">Окрас и особые приметы</label>
                <Input name="description" required placeholder="Триколор, красный ошейник..." />
              </div>
            </div>
            <div className="mt-8">
              <Button type="submit" className="w-full">Далее</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl font-display font-bold mb-6">Шаг 2: Контакты и место</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface/80">Где потерялся? (Адрес или район)</label>
                <Input name="address" required placeholder="Приморский парк Победы" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-on-surface/80">Телефон для связи</label>
                <Input name="phone" type="tel" required placeholder="+7 (999) 000-00-00" />
              </div>
            </div>
            <div className="mt-8 flex gap-4">
              <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">Назад</Button>
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Отправка..." : "Отправить SOS"}
              </Button>
            </div>
            {error ? (
              <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
            ) : null}
          </div>
        )}
      </form>
    </div>
  );
}
