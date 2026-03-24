import { YandexMap } from "@/components/map/YandexMap";

export default function MapPage() {
  return (
    <div className="mx-auto max-w-7xl w-full p-6 py-12 flex-1 flex flex-col">
      <h1 className="text-display-lg text-primary font-bold mb-4">Карта прогулок</h1>
      <p className="text-on-surface/70 text-lg mb-8 max-w-2xl">
        Отмечайте места, где вы гуляете со своим корги, находите новые площадки для дрессировки и договаривайтесь о совместных встречах в Петербурге.
      </p>
      
      <div className="flex-1 min-h-[600px] relative">
         <YandexMap />
      </div>
    </div>
  );
}
