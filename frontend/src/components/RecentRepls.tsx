import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";

interface Repl {
  replname: string;
  time: number;
}

export default function RecentRepls(repls: Repl[]) {
  console.log(repls);

  return (
    <>
      <section className="mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Recent Repls</h2>
          <Button variant="ghost">All Repls</Button>
        </div>
        <div className="space-y-4">
          {repls.map((repl, index) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-4 rounded"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 rounded mr-4"></div>
                  <div>
                    <h3 className="font-medium">{repl.replname}</h3>
                    <p className="text-sm text-gray-400">
                      @DipakKhade • {repl.time}ago
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
        <Button variant="outline" className="mt-4 w-full">
          See all Repls
        </Button>
      </section>
    </>
  );
}
