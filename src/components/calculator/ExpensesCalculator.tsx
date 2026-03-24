"use client";

import { useForm } from "react-hook-form";
import { useMemo } from "react";
import { Input } from "@/components/ui/input";

type CalculatorForm = {
  foodPrice: number;
  foodAmount: number; // kg per month
  vetCheckups: number; // per year
  vaccines: number; // per year
  toysAndTreats: number; // per month
  grooming: number; // per month
};

export function ExpensesCalculator() {
  const { register, watch } = useForm<CalculatorForm>({
    defaultValues: {
      foodPrice: 600,
      foodAmount: 5,
      vetCheckups: 3000,
      vaccines: 2500,
      toysAndTreats: 1500,
      grooming: 2000,
    },
  });

  const formValues = watch();

  const results = useMemo(() => {
    const foodMonthly = (formValues.foodPrice || 0) * (formValues.foodAmount || 0);
    const toysMonthly = Number(formValues.toysAndTreats || 0);
    const groomingMonthly = Number(formValues.grooming || 0);
    
    // Yearly specifics
    const vetYearly = Number(formValues.vetCheckups || 0);
    const vaccinesYearly = Number(formValues.vaccines || 0);

    const monthlyTotal = foodMonthly + toysMonthly + groomingMonthly;
    const yearlyTotal = (monthlyTotal * 12) + vetYearly + vaccinesYearly;

    return {
      monthlyTotal,
      yearlyTotal,
    };
  }, [formValues]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mt-8">
      {/* Form Section */}
      <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-ambient">
        <h2 className="text-2xl font-display font-bold text-primary mb-6">Ваши вводные данные</h2>
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Цена корма (за кг, руб)</label>
              <Input type="number" {...register("foodPrice")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Расход корма (кг/мес)</label>
              <Input type="number" {...register("foodAmount")} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Вет. осмотры (в год, руб)</label>
              <Input type="number" {...register("vetCheckups")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Вакцинация (в год, руб)</label>
              <Input type="number" {...register("vaccines")} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Игрушки/лакомства (в мес, руб)</label>
              <Input type="number" {...register("toysAndTreats")} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-on-surface/80">Груминг/косметика (в мес, руб)</label>
              <Input type="number" {...register("grooming")} />
            </div>
          </div>
        </form>
      </div>

      {/* Results Section */}
      <div className="bg-primary text-on-primary p-8 rounded-[2rem] shadow-lg sticky top-32">
        <h2 className="text-2xl font-display font-bold mb-8">Итоговые расходы</h2>
        
        <div className="space-y-6">
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <span className="block text-sm font-medium uppercase tracking-wider mb-1 opacity-80">В месяц (ориентировочно)</span>
            <span className="text-4xl font-display font-bold">
              {results.monthlyTotal.toLocaleString("ru-RU")} <span className="text-2xl font-normal">₽</span>
            </span>
          </div>
          
          <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
            <span className="block text-sm font-medium uppercase tracking-wider mb-1 opacity-80">В год (включая вет. услуги)</span>
            <span className="text-4xl font-display font-bold">
              {results.yearlyTotal.toLocaleString("ru-RU")} <span className="text-2xl font-normal">₽</span>
            </span>
          </div>
        </div>

        <p className="mt-8 text-sm opacity-80 leading-relaxed">
          * Обратите внимание: Это базовые расходы на здоровую собаку. В калькуляторе не учтены расходы на покупку щенка, амуницию, кинолога, форс-мажорные ветеринарные услуги и передержку.
        </p>
      </div>
    </div>
  );
}
