import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

import { Button, buttonVariants } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Link } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { useUserAction } from '@/hooks/useUser'

const formSchema = z.object({
    email: z.string()
    .min(2, { message: "email must be at least 2 characters."}),
    //.refine((val) => /^[a-z0-9](\.?[a-z0-9]){5,}@(edu.hel|hel)\.com$/.test(val), 'email does not match'),
    password: z.string().min(2, {
        message: "Password must be at least 2 characters.",
    }),


})

export default function Login() {

    const { loginUser } = useUserAction()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.

        const { email, password } = values

        const data = {email,password}

        loginUser(data)

        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                </pre>
            ),
        });

    }


    return (
        <>
            <div className="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    to="/register"
                    className={cn(buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Rekisteröidy
                </Link>
                <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
                    <div className="absolute inset-0 bg-neutral-900" />
                    <h1 className='z-20 text-4xl font-["Archivo"] font-black'>TilaTikki</h1>
                    <p className='z-20 mt-auto text-lg'>Varaa Opetustila Helposti</p>
                </div>

                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Kirjaudu Sisään
                            </h1>
                            <p className="text-sm text-muted-foreground">
                         Muista käyttää etunimi.sukunimi@hel.fi tai @edu.hel.fi sähköpostia
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-2">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Sähköposti</FormLabel>
                                            <FormControl>
                                                <Input type='email' placeholder="etunimi.sukunimi@hel.fi" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Salasana</FormLabel>
                                            <FormControl>
                                                <Input type='password' placeholder="virittamo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Kirjaudu Sisään</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}
