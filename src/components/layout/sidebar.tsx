import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Sidebar() {
  return (
    <Card className="w-full md:w-56 rounded-none border-b md:border-r">
      <CardContent className="p-3 md:p-4">
        <h2 className="font-bold text-lg mb-3 md:mb-4">
          FlowForge
        </h2>

        <nav className="flex md:flex-col gap-2">
          <Button asChild variant="ghost" className="justify-start">
            <NavLink to="/">Dashboard</NavLink>
          </Button>

          <Button asChild variant="ghost" className="justify-start">
            <NavLink to="/board">Board</NavLink>
          </Button>

          {/* <Button asChild variant="ghost" className="justify-start">
            <NavLink to="/analytics">Analytics</NavLink>
          </Button> */}

          <Button asChild variant="ghost" className="justify-start">
            <NavLink to="/settings">Settings</NavLink>
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
