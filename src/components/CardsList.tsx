import { Card } from "../types/Card";
import { CardItem } from "./CardItem";

interface CardsListProps {
  data: Card[];
}
export const CardsList: React.FC<CardsListProps> = ({ data }) => {
  return (
    <section className="grid 2xl:grid-cols-5 xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-6 mx-auto justify-items-center max-w-[1360px] mb-10">
      {data.map((card) => (
          <CardItem card={card} key={card._id} />
      ))}
    </section>
  );
};
