import { LoginForm } from "@/features/auth/components/LoginForm";

export default function Login() {
  return (
    <div className="h-svh flex justify-center items-center ">
      <div className="w-md flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground tracking-tighter leading-tight">Secure Access</h2>
          <p className="text-muted text-sm md:text-base mx-auto leading-relaxed mt-2">Return to your dashboard to manage your wealth and budgets</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
