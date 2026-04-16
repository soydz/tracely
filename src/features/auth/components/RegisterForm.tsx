'use client'

import { useForm, Controller } from "react-hook-form";
import { useRegister } from "../hooks/useRegister"
import { RegisterFormData, registerSchema } from "../schemas/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
    Form,
    Label,
    Input,
    TextField,
    Button,
    Spinner,
} from "@heroui/react";

export function RegisterForm() {

    const { executeRegister, isPending } = useRegister();

    const { handleSubmit, control, formState: { errors }, } = useForm<RegisterFormData>({
        // zod con react hook form
        resolver: zodResolver(registerSchema),
        // evitar undefined
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterFormData) => {
        await executeRegister(data);
    }

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
                name="fullName"
                control={control}
                render={({ field }) => (
                    <TextField {...field} isRequired isInvalid={!!errors.fullName}>
                        <div>
                            <Label>FullName</Label>
                        </div>
                        <Input placeholder="Jhon Doe" />
                        {errors.fullName && (
                            <span className="text-danger text-tiny">
                                {errors.fullName.message}
                            </span>
                        )}
                    </TextField>
                )}
            />

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

            <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        isRequired
                        type="password"
                        isInvalid={!!errors.confirmPassword}
                    >
                        <div className="flex justify-between">
                            <Label>Confirm</Label>
                        </div>
                        <Input placeholder="********" />
                        {errors.confirmPassword && (
                            <span className="text-danger text-tiny">
                                {errors.confirmPassword.message}
                            </span>
                        )}
                    </TextField>
                )}
            />

            <Button type="submit" fullWidth isPending={isPending}>
                Sign up
            </Button>

            <div className="flex gap-3 justify-center">
                <p className="text-muted">Already have an account?</p>
                <Link href="/login" className="text-accent">
                    Log in
                </Link>
            </div>
        </Form>
    );
}