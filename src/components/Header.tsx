
import { ChefHat } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-4 md:py-6">
      <div className="container flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <ChefHat className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">RecipeForge</h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
