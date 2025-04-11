
import { Link } from "react-router-dom";

export const NavLogo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div>
        <img 
          src="/lovable-uploads/b486d576-e0ba-4dde-92b2-dcac9a60c681.png" 
          alt="Rekaland Logo" 
          className="h-8 md:h-10 drop-shadow-sm" 
        />
      </div>
    </Link>
  );
};
