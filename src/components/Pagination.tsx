import { Pagination } from "@mui/material";

interface Props {
  count: number,
  page: number,
  onChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

export const AppPagination: React.FC<Props> = ({ count, page, onChange }) => {

  return (
    <div className="flex items-center justify-center mb-10">
      <Pagination
        count={count}
        page={page}
        shape="rounded"
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "#1E1E1F",
            backgroundColor: "#FCFCFC",
            fontSize: "14px",
            width: "40px",
            height: "40px",
            "&:hover": {
              backgroundColor: "#B51717",
            },
          },
          "& .Mui-selected": {
            color: "#FCFCFC",
            backgroundColor: "#E63C3C !important",
          },
          ".dark & .MuiPaginationItem-root": {
            color: "#CCCBCD",
            backgroundColor: "#1E1E1F",
            "&:hover": {
              backgroundColor: "#B51717",
            },
          },
          ".dark & .Mui-selected": {
            color: "#FCFCFC",
            backgroundColor: "#E63C3C !important",
          },
        }}
      />
    </div>
  );
};
