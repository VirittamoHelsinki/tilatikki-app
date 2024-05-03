import { Separator } from "~/@/components/ui/separator";
import { buttonVariants } from "~/@/components/ui/button";
import { cn } from "~/@/lib/utils";
import { useLocation } from "react-router-dom";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/settings",
  },
  {
    title: "Account",
    href: "/examples/forms/account",
  },
  {
    title: "Appearance",
    href: "/examples/forms/appearance",
  },
  {
    title: "Notifications",
    href: "/examples/forms/notifications",
  },
  {
    title: "Display",
    href: "/examples/forms/display",
  },
];

function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { pathname } = useLocation();
  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className,
      )}
      {...props}
    >
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );
}
export function Profile() {
  return (
    <main className="flex flex-1 flex-col p-4 sm:min-h-0 sm:px-8 sm:py-4">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Hallinnointi</h2>
        <p className="text-muted-foreground">
        Tällä sivulla voit esimerkiksi muokata omia käyttäjätietojasi sekä tarkastella varaushistoriaasi.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">Käyttäjätiedot</h3>
              <p className="text-sm text-muted-foreground">
                Muokkaa käyttäjätietojasi.
              </p>
            </div>
            <Separator />
            <p>Etunimi</p>
            <span>Sukunimi</span>
          </div>
        </div>
      </div>
    </main>
  );
}
