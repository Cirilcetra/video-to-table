
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface ApiKeyInputProps {
  onApiKeyChange: (apiKey: string) => void;
}

const ApiKeyInput = ({ onApiKeyChange }: ApiKeyInputProps) => {
  const [apiKey, setApiKey] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check for saved API key in localStorage
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      onApiKeyChange(savedApiKey);
    }
  }, [onApiKeyChange]);

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("API key cannot be empty");
      return;
    }

    // Save to localStorage
    localStorage.setItem("openai_api_key", apiKey);
    onApiKeyChange(apiKey);
    toast.success("API key saved successfully");
    setIsVisible(false);
  };

  return (
    <div className="mb-6">
      {isVisible ? (
        <div className="space-y-3">
          <div>
            <label htmlFor="api-key" className="block text-sm font-medium mb-1">
              OpenAI API Key
            </label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="mb-2"
            />
            <p className="text-xs text-muted-foreground mb-2">
              Your API key is stored locally in your browser and never sent to our servers.
            </p>
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSaveApiKey}>Save Key</Button>
            <Button variant="outline" onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsVisible(true)}
        >
          {apiKey ? "Change API Key" : "Add API Key"}
        </Button>
      )}
    </div>
  );
};

export default ApiKeyInput;
