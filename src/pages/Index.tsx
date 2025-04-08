
import { useState } from "react";
import { RecipeData, processYouTubeUrl } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeUrlInput from "@/components/YouTubeUrlInput";
import RecipeCard from "@/components/RecipeCard";
import LoadingState from "@/components/LoadingState";
import { toast } from "sonner";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recipe, setRecipe] = useState<RecipeData | null>(null);

  const handleProcessUrl = async (url: string) => {
    setIsProcessing(true);
    setRecipe(null);
    
    try {
      toast.info("Processing video...", {
        description: "This might take a minute or two.",
      });
      
      const recipeData = await processYouTubeUrl(url);
      setRecipe(recipeData);
      toast.success("Recipe created successfully!");
    } catch (error) {
      console.error("Error processing URL:", error);
      toast.error("Failed to process video", {
        description: "Please check the URL and try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-8 px-4">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Transform Cooking Videos into Recipes
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Paste any YouTube cooking video URL and we'll extract a structured, 
            easy-to-follow recipe using AI.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <YouTubeUrlInput onSubmit={handleProcessUrl} isProcessing={isProcessing} />
        </div>

        {isProcessing ? (
          <LoadingState />
        ) : recipe ? (
          <RecipeCard recipe={recipe} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
            <ChefHatIcon className="h-16 w-16 text-muted mb-4" />
            <h3 className="text-xl font-medium mb-2">No recipe generated yet</h3>
            <p className="text-muted-foreground">
              Enter a YouTube cooking video URL above to get started.
              We'll analyze the video and generate a detailed recipe for you.
            </p>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

// Icon component for the empty state
const ChefHatIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
    <line x1="6" y1="17" x2="18" y2="17"></line>
  </svg>
);

export default Index;
