import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/@/components/ui/card";
import { Link } from "react-router-dom";
import { usePremiseAction } from "../hooks/usePremise";
import { useTypedSelector } from "~/hooks/useTypedSelector";
import { Premise } from "../Redux/Reducers/premiseState";

export function Dashboard() {
  const { getAllPremises } = usePremiseAction();
  // Use the updated state structure here
  const { premisesData, isLoading } = useTypedSelector(
    (state) => state.premise,
  );


  useEffect(() => {
    getAllPremises();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!premisesData.success || !Array.isArray(premisesData.premises)) {
    console.error(
      "Expected premisesData.premises to be an array, but received:",
      premisesData.premises,
    );
    return <div>Error: Data is not available.</div>;
  }

  return (
    <main className="grid grid-cols-3 gap-5 px-4 pb-2 pt-6 sm:px-8 sm:py-8">
      {premisesData.premises.map((premise: Premise) => (
        <Card key={premise._id} className="col-span-1 w-full">
          <Link to={`/premises/${premise._id}`}>
            <CardHeader>
              <CardTitle>{premise.name}</CardTitle>
              <CardDescription>{premise.address}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                className="max-h-44 w-full rounded object-cover"
                src={premise.premise_facade[0]}
                alt={`${premise.name} facade`}
              />
            </CardContent>
          </Link>
        </Card>
      ))}
    </main>
  );
}
