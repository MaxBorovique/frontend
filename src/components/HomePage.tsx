import { CardsList } from "../components/CardsList";
import { AppPagination } from "../components/Pagination";
import { SearchField } from "../components/SearchField";
import { Loader } from "../components/Loader";
import { ErrorPage } from "../components/Error";
import { getAllHeroes } from "../store/slices/heroesSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../utils/customHooks";

export const HomePage = () => {
  const [query, setQuery] = useState("");
  const { data, isLoading, isError } = useAppSelector(
    (state) => state.heroes.heroes
  );

  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAllHeroes());
  }, [dispatch]);

  const filteredData = data.filter((card) =>
    card.nickname.toLowerCase().includes(query.trim().toLowerCase())
  );
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setPage(page);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = query
    ? filteredData
    : filteredData.slice(startIndex, endIndex);
  return (
    <>
      <SearchField query={query} setQuery={setQuery} />
      {isLoading && <Loader />}
      {isError && <ErrorPage />}
      <CardsList data={currentItems} />
      {filteredData.length > 5 && (
        <AppPagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={page}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};
