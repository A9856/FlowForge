import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Sidebar() {
  return (
    <Card className="w-56 rounded-none border-r">
      <CardContent className="p-4 space-y-4">
        <h2 className="font-bold text-lg">FlowForge</h2>

        <nav className="flex flex-col gap-2">
          <Button asChild variant="ghost">
            <NavLink to="/">Dashboard</NavLink>
          </Button>

          <Button asChild variant="ghost">
            <NavLink to="/board">Board</NavLink>
          </Button>

          <Button asChild variant="ghost">
            <NavLink to="/settings">Settings</NavLink>
          </Button>
        </nav>
      </CardContent>
    </Card>
  );
}
