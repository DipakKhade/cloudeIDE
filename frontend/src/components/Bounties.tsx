import { Badge } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

export default function Bounties(
  currentBounties: {
    amount: number;
    event: string;
    startTime: number;
  }[]
) {
  return (
    <>
      <section>
        <h2 className="text-2xl font-bold mb-4">Bounties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentBounties.map((cb, index) => (
            <Card key={index} className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex justify-between">
                  <span className="text-green-400">{cb.amount}</span>
                  <Badge variant="secondary">{cb.amount}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-bold mb-2">{cb.event}</h3>
                <div className="flex items-center text-sm text-gray-400">
                  <Avatar className="h-6 w-6 mr-2">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>DL</AvatarFallback>
                  </Avatar>
                  {cb.startTime}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Apply Now!</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
