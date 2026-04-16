"use client";

import {
  Form,
  Label,
  Input,
  TextField,
  Button,
  Separator,
  Spinner,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";

import { GoogleIcon } from "@/shared/components";

import { LoginFormData, loginSchema } from "../schemas/login.schema";
import { useLogin } from "../hooks/useLogin";

export function LoginForm() {

  const {executeLogin, isPending} = useLogin();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>({
    // zod con react hook form
    resolver: zodResolver(loginSchema),
    // evitar undefined
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    await executeLogin(data);
  };

  return (
    <Form
      className="relative flex flex-col gap-6"
      onSubmit={handleSubmit(onSubmit)}
    >
      {isPending && (
        <div className="absolute inset-0 z-50 flex flex-col justify-center items-center bg-white/40 backdrop-blur-md rounded-2xl border border-white/20 transition-all duration-300 animate-in fade-in zoom-in-95 m-5">
          <Spinner size="lg" color="accent" />
          <p className="mt-4 text-center text-lg font-semibold text-default-600 animate-pulse max-w-64 px-4 text-accent">
            Logging in...
          </p>
        </div>
      )}

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField {...field} isRequired isInvalid={!!errors.email}>
            <div>
              <Label>Email</Label>
            </div>
            <Input placeholder="example@mail.com" />
            {errors.email && (
              <span className="text-danger text-tiny">
                {errors.email.message}
              </span>
            )}
          </TextField>
        )}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            isRequired
            type="password"
            isInvalid={!!errors.password}
          >
            <div className="flex justify-between">
              <Label>Password</Label>

              <Link
                href="/forgot-password"
                className="text-accent text-tiny transition-opacity"
              >
                Forgot password?
              </Link>
            </div>
            <Input placeholder="********" />
            {errors.password && (
              <span className="text-danger text-tiny">
                {errors.password.message}
              </span>
            )}
          </TextField>
        )}
      />

      <Button type="submit" fullWidth isPending={isPending}>
        Sign in
      </Button>

      <div className="flex items-center w-full my-2">
        <Separator className="flex-1" />
        <p className="px-5 text-xs text-muted tracking-wider uppercase">OR</p>
        <Separator className="flex-1" />
      </div>

      <Button fullWidth className="flex flex-row gap-3 bg-white">
        <GoogleIcon />
        Sign in with Google
      </Button>

      <div className="flex gap-3 justify-center">
        <p className="text-muted">Don&apos;t have an account?</p>
        <Link href="/register" className="text-accent">
          Sign up
        </Link>
      </div>
    </Form>
  );
}
