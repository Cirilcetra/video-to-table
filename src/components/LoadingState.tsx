
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LoadingState = () => {
  return (
    <Card className="w-full max-w-3xl mx-auto animate-pulse-slow">
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded w-3/4"></div>
          <div className="flex space-x-4">
            <div className="h-4 bg-muted rounded w-24"></div>
            <div className="h-4 bg-muted rounded w-24"></div>
          </div>
        </div>
        
        <div className="space-y-3 pt-4">
          <div className="h-5 bg-muted rounded w-40"></div>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-muted rounded w-full"></div>
            ))}
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-3">
          <div className="h-5 bg-muted rounded w-40"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-4 bg-muted rounded w-full"></div>
            ))}
          </div>
        </div>
        
        <div className="flex space-x-2 pt-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-muted rounded w-20"></div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default LoadingState;
