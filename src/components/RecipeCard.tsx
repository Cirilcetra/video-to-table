
import { RecipeData } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, Bookmark, Share2, Copy, Printer, Users } from "lucide-react";
import { toast } from "sonner";

interface RecipeCardProps {
  recipe: RecipeData;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const handleCopyRecipe = () => {
    // Format the recipe as text
    const recipeText = `
      ${recipe.title}
      
      Servings: ${recipe.servings}
      Prep Time: ${recipe.prepTime}
      Cook Time: ${recipe.cookTime}
      Total Time: ${recipe.totalTime}
      
      INGREDIENTS:
      ${recipe.ingredients.map(item => `• ${item}`).join('\n')}
      
      INSTRUCTIONS:
      ${recipe.instructions.map((step, index) => `${index + 1}. ${step}`).join('\n')}
      
      ${recipe.notes ? `NOTES: ${recipe.notes}` : ''}
    `.trim();
    
    // Copy to clipboard
    navigator.clipboard.writeText(recipeText)
      .then(() => toast.success("Recipe copied to clipboard"))
      .catch(() => toast.error("Failed to copy recipe"));
  };

  const handlePrintRecipe = () => {
    window.print();
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">{recipe.title}</CardTitle>
            <CardDescription className="flex items-center mt-2 space-x-4">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {recipe.totalTime}
              </span>
              <span className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {recipe.servings}
              </span>
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-medium text-lg mb-2">Ingredients</h3>
          <ul className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <span className="mr-2 mt-1 text-accent">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="font-medium text-lg mb-2">Instructions</h3>
          <ol className="space-y-3 list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="pl-1">
                <span className="ml-1">{instruction}</span>
              </li>
            ))}
          </ol>
        </div>
        
        {recipe.notes && (
          <>
            <Separator />
            <div>
              <h3 className="font-medium text-lg mb-2">Notes</h3>
              <p className="text-muted-foreground">{recipe.notes}</p>
            </div>
          </>
        )}
      </CardContent>
      
      <CardFooter className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" onClick={handleCopyRecipe}>
          <Copy className="w-4 h-4 mr-1" /> Copy
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrintRecipe}>
          <Printer className="w-4 h-4 mr-1" /> Print
        </Button>
        <Button variant="outline" size="sm">
          <Bookmark className="w-4 h-4 mr-1" /> Save
        </Button>
        <Button variant="outline" size="sm">
          <Share2 className="w-4 h-4 mr-1" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecipeCard;
