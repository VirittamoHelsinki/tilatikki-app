import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Cookies from "universal-cookie";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { useUserAction } from "@/hooks/useUser";
import { useTypedSelector } from "@/hooks/useTypedSelector";

const formSchema = z.object({
  email: z
    .string()
    .regex(
      /^[a-zA-Z]+\.+[a-zA-Z]+@(edu\.)?hel\.fi$/,
      "Invalid email format first.last@hel.fi or @edu.hel.fi",
    )
    .min(2, {
      message: "email must be at least 2 characters.",
    })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(10, "Password must be at least 10 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export default function Login() {
  const { loginUser, getMe } = useUserAction();
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.user.currentUser);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    loginUser({ email: values.email, password: values.password });
    getMe();
    if (user) navigate("/");
  }

  const cookies = new Cookies();
  const tilatikkiCookie = cookies.get("tilatikkiToken");

  useEffect(() => {
    if (tilatikkiCookie) {
      navigate("/");
    }
  }, [tilatikkiCookie, navigate]);

  return (
    <>
      <main className="container relative hidden flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8",
          )}
        >
          Rekisteröidy
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-neutral-900" />
          <h1 className='z-20 font-["Archivo"] text-4xl font-black'>
            TilaTikki
          </h1>
          <p className="z-20 mt-auto text-lg">Varaa Opetustila Helposti</p>
        </div>

        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">
                Kirjaudu Sisään TilaTikkiin
              </h1>
              <p className="text-sm text-muted-foreground">
                Helsingin kaupungin tilavarausjärjestelmä opetustiloille.
              </p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-2"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sähköposti</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="etunimi.sukunimi@hel.fi"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Sähköposti pitää olla @hel.fi tai @edu.hel.fi
                      </FormDescription>
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
                        <Input
                          type="password"
                          placeholder="virittamo"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Salasana pitää olla vähintään 10 merkkiä pitkä
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Kirjaudu Sisään</Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
