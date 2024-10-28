import { AddButton } from "./AddButton";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface Props {
  adding: boolean;
  setAdding: (prev: boolean) => void;
}

export const Header: React.FC<Props> = ({ setAdding, adding }) => {
  const addingHandler = () => {
    setAdding(!adding);
  };

  return (
    <header className="z-[1] sticky rounded-sm top-3 top bg-cards-bg dark:bg-dark-cards-bg sm:mb-[32px] md:mb-[36px] xl:mb-10">
      <div className="flex items-center justify-between p-[12px]">
        <div className="flex justify-start max-w-[240px] overflow-visible">
          <a href="/home">
            <div className="bg-[url('/logo.svg')] min-w-[76px] h-12 bg-no-repeat bg-center bg-cover"></div>
          </a>
        </div>
        <div className="searchField"></div>
        <div className="flex items-center justify-center gap-4">
          <ThemeSwitcher />
          <AddButton handler={addingHandler} buttonText="Add new hero" />
        </div>
      </div>
    </header>
  );
};
