import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

export function Dashboard() {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const tilatikkiCookie = cookies.get("tilatikkiToken");

  useEffect(() => {
    if (!tilatikkiCookie) navigate("/login");
  }, [navigate, tilatikkiCookie]);

  return (
    <main className="grid grid-cols-3 gap-5 py-[70px]">
      {/*{Array.from({ length: 9 }, (_, i) => ( */}
      <Card className="col-span-1 w-full">
        <Link to="/jatkasaari">
          <CardHeader>
            <CardTitle>Jätkäsaari koulu</CardTitle>
            <CardDescription>
              Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              className="max-h-44 w-full rounded object-cover"
              src="/jatkasaari-koulu.png"
              alt="placeholder"
            />
          </CardContent>
        </Link>
      </Card>
      <Card className="col-span-1 w-full">
        <Link to="/jatkasaari">
          <CardHeader>
            <CardTitle>Pakila koulu</CardTitle>
            <CardDescription>
              Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              className="max-h-44 w-full rounded object-cover"
              src="/pakila-koulu.jpg"
              alt="placeholder"
            />
          </CardContent>
        </Link>
      </Card>
      <Card className="col-span-1 w-full">
        <Link to="/jatkasaari">
          <CardHeader>
            <CardTitle>Pakila koulu</CardTitle>
            <CardDescription>
              Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <img
              className="max-h-44 w-full rounded object-cover"
              src="/pakila-koulu.jpg"
              alt="placeholder"
            />
          </CardContent>
        </Link>
      </Card>

      {/*  ))} */}
    </main>
  );
}
