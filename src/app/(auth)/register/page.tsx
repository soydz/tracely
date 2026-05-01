import { RegisterForm } from "@/features/auth/components/RegisterForm";

export default function register() {
  return (
    <div className="h-svh flex justify-center items-center ">
      <div className="w-md flex flex-col gap-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-foreground tracking-tighter leading-tight">Join Tracely</h2>
          <p className="text-muted text-sm md:text-base mx-auto leading-relaxed mt-2">Experience a refined way to track spending and master your savings</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
