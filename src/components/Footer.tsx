
const Footer = () => {
  return (
    <footer className="w-full py-6 mt-auto">
      <div className="container flex flex-col items-center justify-center space-y-2">
        <p className="text-sm text-muted-foreground text-center">
          RecipeForge uses AI to transform cooking videos into structured recipes
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} RecipeForge
        </p>
      </div>
    </footer>
  );
};

export default Footer;
