import { signInWithEmail } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex-1 flex items-center justify-center p-6 pt-32 pb-16 min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-md bg-surface-container-lowest p-8 rounded-[2rem] shadow-ambient">
        <h1 className="text-display font-bold text-2xl text-primary mb-6 text-center">Войти</h1>
        <form action={signInWithEmail} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 tracking-wide text-on-surface/80 block">Email</label>
            <Input name="email" type="email" required />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 tracking-wide text-on-surface/80 block">Пароль</label>
            <Input name="password" type="password" required />
          </div>
          <Button type="submit" className="w-full mt-2">Войти</Button>
        </form>
        <p className="mt-6 text-center text-sm text-on-surface/70">
          Нет аккаунта? <Link href="/register" className="text-primary hover:underline font-medium">Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
