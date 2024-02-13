import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { Link } from "react-router-dom";

export function Dashboard() {
  return (
    <main className="grid grid-cols-3 gap-5 px-4 pb-2 pt-6 sm:px-8 sm:py-8">
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
        <Link to="/pakila">
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
