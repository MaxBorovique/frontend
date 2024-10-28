import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center my-auto w-[500px] h-[250px] bg-main-bg dark:bg-dark-main-bg rounded-sm">
          <h2 className="mb-3 text-3xl font-medium uppercase font-title text-secondary-text dark:text-dark-secondary-text">Something went wrong. Please try again later!</h2>
          <Link className="p-3 text-3xl font-medium uppercase border rounded-sm font-title text-secondary-text dark:text-dark-secondary-text hover:scale-125 border-primary" to={'/home'}>Go home</Link>
      </div>
    </div>
  );
};