export type WordType = {
    id: number;
    word: string;
    definition: string;
  };
  
  export type StateType = {
    data: Array<WordType>;
    isLoading: boolean;
    isError: boolean;
  };
  
  interface IAddWords {
    type: "ADD_WORDS";
    payload: { data: Array<WordType> };
  }
  
  interface IInitFetch {
    type: "INIT_FETCH";
  }

  interface ISuccessfulSearch {
    type: "SUCCESSFUL_SEARCH";
  }
  
  interface IFetchFailure {
    type: "INVALID_INPUT";
  }
  
  

  
  export type ActionType =
    | IAddWords
    | IInitFetch
    | ISuccessfulSearch  
    | IFetchFailure;