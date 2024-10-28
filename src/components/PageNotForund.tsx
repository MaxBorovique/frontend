import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-screen backdrop-blur-sm">
      <div className="flex flex-col gap-4 items-center justify-center my-auto w-[500px] h-[250px] bg-main-bg dark:bg-dark-main-bg rounded-sm">
          <h2 className="font-medium uppercase font-title text-8xl text-secondary-text">error <span className="text-primary">404</span></h2>
          <Link className="p-3 text-3xl font-medium uppercase border rounded-sm font-title text-secondary-text dark:text-dark-secondary-text hover:scale-125 border-primary" to={'/home'}>Go home</Link>
      </div>
    </div>
  );
};