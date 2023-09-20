import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";


export default function Dashboard() {

    return (
        <div className="flex gap-5 py-[70px] flex-wrap">
            {Array.from({ length: 9 }, (_, i) => (
                <Card key={i} className="w-full flex-[1_1_30%]">
                    <Link to='/pasila'>
                        <CardHeader>
                            <CardTitle>Pasila koulu</CardTitle>
                            <CardDescription>Kolmikerrosinen koulu rakennus, jossa on noin 150 opetustilaa</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img className="rounded w-full object-cover max-h-44" src="/MicrosoftTeams-image.png" alt="placeholder" />
                        </CardContent>
                    </Link>
                </Card>
            )
            )}
        </div>
    )
}
