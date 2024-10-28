import { CircularProgress } from "@mui/material";

export const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen backdrop-blur-sm">
      <CircularProgress 
        color="error" 
        size={60}
      />
    </div>
  );
};