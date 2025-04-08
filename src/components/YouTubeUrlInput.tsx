
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface YouTubeUrlInputProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

const YouTubeUrlInput = ({ onSubmit, isProcessing }: YouTubeUrlInputProps) => {
  const [url, setUrl] = useState("");

  // Basic YouTube URL validation
  const isValidYouTubeUrl = (url: string) => {
    // This is a simple validation, could be more comprehensive
    return url.includes("youtube.com/watch") || url.includes("youtu.be/");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    if (!isValidYouTubeUrl(url)) {
      toast.error("Please enter a valid YouTube video URL");
      return;
    }

    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-2xl">
      <div className="flex flex-col space-y-2">
        <label htmlFor="youtube-url" className="text-sm font-medium">
          YouTube Video URL
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            id="youtube-url"
            type="text"
            placeholder="https://www.youtube.com/watch?v=..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            disabled={isProcessing}
          />
          <Button 
            type="submit" 
            disabled={isProcessing}
            className="whitespace-nowrap"
          >
            {isProcessing ? "Processing..." : "Create Recipe"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Paste a cooking video URL to generate a structured recipe
        </p>
      </div>
    </form>
  );
};

export default YouTubeUrlInput;
