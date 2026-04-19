import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  to, 
  label = "Back", 
  className = "" 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        bg-gradient-to-r from-gray-600 to-gray-700 
        hover:from-gray-700 hover:to-gray-800 
        text-white font-medium rounded-lg 
        transition-all duration-200 
        shadow-md hover:shadow-lg 
        transform hover:scale-105
        ${className}
      `}
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
};

export default BackButton;
