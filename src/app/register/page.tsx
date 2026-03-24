import { signUpWithEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-16 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-[2rem] shadow-ambient">
        <h1 className="text-display font-bold text-2xl text-primary mb-6 text-center">Создать аккаунт</h1>
        {searchParams.error && (
          <div className="mb-4 p-3 bg-error-container text-on-error-container rounded-xl text-sm text-center font-medium">
            {decodeURIComponent(searchParams.error)}
          </div>
        )}
        <form action={signUpWithEmail} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 tracking-wide text-on-surface/80 block">Имя и Фамилия</label>
            <Input name="name" type="text" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 tracking-wide text-on-surface/80 block">Email</label>
            <Input name="email" type="email" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 tracking-wide text-on-surface/80 block">Пароль</label>
            <Input name="password" type="password" required minLength={8} />
          </div>
          <Button type="submit" className="w-full mt-2">Зарегистрироваться</Button>
        </form>
        <p className="mt-6 text-center text-sm text-on-surface/70">
          Уже есть аккаунт? <Link href="/login" className="text-primary hover:underline font-medium">Войти</Link>
        </p>
      </div>
    </div>
  );
}
