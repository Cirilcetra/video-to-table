
import { useState } from "react";
import { RecipeData, processYouTubeUrl } from "@/lib/api";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import YouTubeUrlInput from "@/components/YouTubeUrlInput";
import RecipeCard from "@/components/RecipeCard";
import LoadingState from "@/components/LoadingState";
import ApiKeyInput from "@/components/ApiKeyInput";
import { toast } from "sonner";
import { ChefHat } from "lucide-react";

const Index = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [recipe, setRecipe] = useState<RecipeData | null>(null);
  const [apiKey, setApiKey] = useState<string>("");

  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };

  const handleProcessUrl = async (url: string) => {
    if (!apiKey) {
      toast.error("OpenAI API key is required", {
        description: "Please add your OpenAI API key first",
      });
      return;
    }

    setIsProcessing(true);
    setRecipe(null);
    
    try {
      toast.info("Processing video...", {
        description: "This might take a minute or two.",
      });
      
      const recipeData = await processYouTubeUrl(url, apiKey);
      setRecipe(recipeData);
      toast.success("Recipe created successfully!");
    } catch (error) {
      console.error("Error processing URL:", error);
      toast.error("Failed to process video", {
        description: "Please check the URL and API key, then try again.",
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

        <div className="flex flex-col items-center justify-center mb-6">
          <ApiKeyInput onApiKeyChange={handleApiKeyChange} />
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
            <ChefHat className="h-16 w-16 text-muted mb-4" />
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

export default Index;
