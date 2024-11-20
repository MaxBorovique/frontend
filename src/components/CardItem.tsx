import { Link } from "react-router-dom";
import { Card } from "../types/Card";
import config from "../config";

interface CardItemProps {
  card: Card;
}

export const CardItem: React.FC<CardItemProps> = ({ card }) => {
  const { nickname, origin_description, superpowers, images: image } = card;
  const mainImage = image && image.length > 0 ? image[0] : "/placeholder.webp";

  const mainSuperpower =
    superpowers.split(',')[0] || "No superpowers available";
  return (
    <article className="font-normal bg-cards-bg dark:bg-dark-cards-bg font-body max-w-[288px]">
      <div className="flex flex-col justify-between p-2">
        <div className="mx-auto rounded-x min-w-[272px] h-[180px] 2xl:min-w-[237px] md:max-w-[268px] sm:min-w-[272px]  mb-3 overflow-hidden">
          <img
            src={`${config.BASE_URL}/${mainImage}`}
            alt="The image of Superhero"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="font-medium font-title text-title text-[32px] mb-1 dark:text-dark-title">
            {nickname}
          </h3>
          <div className="flex items-center justify-center px-2  border rounded-[40px]  border-primary mb-3">
            <span className="text-[12px] leading-[18px] text-center text-primary align-middle">
              {mainSuperpower}
            </span>
          </div>
          <div className=" px-1 pb-1 max-h-[60px] overflow-hidden text-secondary-text line-clamp-4 mb-3 min-h-[60px]">
            <p className="text-sm font-body text-secondary-text dark:text-dark-secondary-text">
              {origin_description}
            </p>
          </div>
          <Link to={`/cards/${card._id}`} className="w-full">
            <button className="flex justify-center w-full py-3 transition-all duration-300 border rounded-x border-secondary hover:border-secondary-hover hover:text-secondary">
              <div className="flex items-center justify-center leading-5 rounded text-secondary font-title text-medium">
                <span className="flex text-xl items-center justify-center gap-2 after:bg-[url('/arrow.svg')] after:bg-no-repeat after:bg-center after:w-5 after:h-5 after:inline-block">
                  Learn more
                </span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
};
