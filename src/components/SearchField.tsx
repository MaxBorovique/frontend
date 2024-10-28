import { TextField } from "@mui/material";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchField: React.FC<Props> = ({query, setQuery}) => {


  return (
    <section className="flex items-center justify-center w-full">
      <div className="xl:w-[530px] md:w-[490px] sm:w-[288px] mb-6 xl:mb-10 text-white font-body">
        <TextField
          fullWidth
          id="fullWidth"
          placeholder="Search for hero"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter" || e.key === "Escape") {
              setQuery('');
            }
          }}
          
          sx={{
            "& .MuiInputBase-root": {
              backgroundColor: "#FCFCFC",
              color: "#1E1E1F",
              borderRadius: "4px",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#585558",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#E1DFE1",
            },
            ".dark & .MuiInputBase-root": {
              backgroundColor: "#2E2D2F",
              color: "#CCCBCD",
              borderRadius: "4px",
            },
            ".dark & .MuiInputBase-input::placeholder": {
              color: "#A3A1A5",
            },

            ".dark &.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#232324",
            },
          }}
        />
      </div>
    </section>
  );
};
