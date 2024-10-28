import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../utils/customHooks";
import { deleteHero, getOneHero } from "../store/slices/heroesSlice";
import { Container } from "./Container";
import { EditHeroForm } from "./EditHeroForm";

export const HeroPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [editing, setEditing] = useState(false);

  const hero = useAppSelector((state) => state.heroes.hero);
  console.log("hero", hero);

  useEffect(() => {
    if (id) {
      dispatch(getOneHero(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (hero && hero?.images?.length > 0) {
      setMainImage(`http://localhost:1000/${hero.images[0]}`);
    }
  }, [hero])

  const deleteHandler = () => {
    if (hero) {
      dispatch(deleteHero(hero._id));
    }
    navigate("/");
  };

  const handleMainImageChange = (image: string) => {
    setMainImage(`http://localhost:1000/${image}`);
  };

  return (
    <>
      <Container>
        <section className="bg-main-bg dark:bg-dark-main-bg">
          {editing && <EditHeroForm setEditing={setEditing} hero={hero} />}
          {hero && (
            <div className="grid md:grid-cols-2 md:gap-5 sm:grid-cols-1">
              <div className="flex flex-col max-w-[592px]">
              {mainImage && (
                <div className="w-full mb-4">
                  <img
                    className="object-cover w-full max-h-[494px] rounded-x"
                    src={mainImage}
                    alt={`${hero.nickname || "Hero"} main image`}
                  />
                </div>
              )}
                <div className="mt-4 overflow-x-auto border-2 border-dashed border-secondary ">
                  <div className="relative flex gap-4 min-w-min ">
                  {hero.images.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        onClick={() => handleMainImageChange(image)}
                        className="object-cover w-[110px] h-[84px] rounded-x flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity duration-300"
                        src={`http://localhost:1000/${image}`}
                        alt={`${hero.nickname || "Hero"} image ${index + 1}`}
                      />
                    </div>
                  ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-row justify-between w-full">
                  <h2 className="mb-3 font-medium font-title text-8xl text-title dark:text-dark-title">
                    {hero.nickname}
                  </h2>
                  <div className="flex items-center justify-end xl:flex-row sm:flex-col">
                    <button
                      onClick={deleteHandler}
                      className="py-[10px] rounded-x px-4 text-base border-0 border-primary hover:border-primary-hover font-title text-primary hover:text-primary-hover hover:scale-110 transition-all duration-300"
                    >
                      <span className="flex text-xl items-center justify-center before:bg-[url('/delete.svg')] before:bg-no-repeat before:bg-center before:w-4 before:h-4 gap-2">
                        Delete
                      </span>
                    </button>
                    <button
                      onClick={() => setEditing(true)}
                      className="py-[10px] rounded-x px-4 text-base border border-secondary hover:border-secondary-hover font-title text-secondary hover:text-secondary-hover hover:scale-110 transition-all duration-300"
                    >
                      <span className="flex text-xl items-center justify-center before:bg-[url('/edit.svg')] before:bg-no-repeat before:bg-center before:w-4 before:h-4 gap-2">
                        Edit
                      </span>
                    </button>
                  </div>
                </div>
                <h3 className="flex gap-3 mb-3 font-medium font-title text-2xl text-title dark:text-dark-title before:content-[' '] before:bg-[url('/quote.svg')] before:bg-no-repeat before:bg-center before:w-[24px] before:h-18">
                  {hero.catch_phrase}
                </h3>
                <div className="flex-col gap-4 mb-6">
                  <div className="flex-col gap-2 ">
                    <span className="text-sm font-normal font-body text-tertiary-text dark:text-dark-tertiary-text">
                      Real name
                    </span>
                    <p className="text-base font-normal font-body text-secondary-text dark:text-dark-secondary-text">
                      {hero.real_name}
                    </p>
                  </div>
                  <div className="flex-col gap-2 ">
                    <span className="text-sm font-normal font-body text-tertiary-text dark:text-dark-tertiary-text">
                      Superpowers
                    </span>
                    <p className="text-base font-normal font-body text-secondary-text dark:text-dark-secondary-text">
                      {hero.superpowers}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-base font-normal font-body text-secondary-text dark:text-dark-secondary-text">
                    {hero.origin_description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>
      </Container>
    </>
  );
};
