import InputWithLabel from "./components/InputWithLabel";
import usePersistence from "./hooks/usePersistence";
import words from "./routes/dutch";
import React, {
  useEffect,
  useReducer,
  useCallback,
  createContext,
} from "react";
import axios from "axios";
import { useDebounce } from "./hooks/useDebounce";
import { StateType, ActionType } from "./types";


export const title: string = "ReactJS";

export function dictionaryReducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case "ADD_WORDS":
      return { data: action.payload.data, isError: false, isLoading: false };
    case "INIT_FETCH":
      return { ...state, isLoading: true, isError: false };
    case "SUCCESSFUL_SEARCH":
      return { ...state, isLoading: false, isError: true };
    case "INVALID_INPUT":
      const filteredState = state.data.filter(
        (story: any) => story.objectID !== action.payload.id
      );
      return { data: filteredState, isError: false, isLoading: false };
    default:
      return state;
  }
}

const API_ENDPOINT = "https://api.dictionaryapi.dev=";

interface AppContextType {
  onClickDelete: (e: number) => void;
}

export const AppContext = createContext<AppContextType | null>(null);

function App(): JSX.Element {
  const [searchText, setSearchText] = usePersistence("searchTerm", "React");
  const debouncedUrl = useDebounce(API_ENDPOINT + searchText);

  const [words, dispatchWords] = useReducer(dictionaryReducer, {
    data: [],
    isError: false,
    isLoading: false,
  });

  const handleFetchWords = useCallback(async () => {
    dispatchWords({ type: "INIT_FETCH" });
    try {
      const response = await axios.get(debouncedUrl);
      dispatchWords({
        type: "SET_WORDS",
        payload: { data: response.data.hits },
      });
    } catch {
      dispatchWords({ type: "FETCH_FAILURE" });
    }
  }, [debouncedUrl]);

  useEffect(() => {
    handleFetchWords();
  }, [handleFetchWords]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value);
  }

  if (words.isError) {
    return (
      <h1 style={{ marginTop: "10rem", color: "blue" }}>
        Something went wrong
      </h1>
    );
  }
}
{
  name : "wotd"
  description : "Word of the Day."
  repository: "https://github.com/mcnaveen/Random-Words-API"
  keywords : ["expressjs", "nodejs", "json"]
}
     
export default App;