import { title, storiesReducer } from "./App";
import { render, screen, fireEvent, act } from "@testing-library/react";
import App, { AppContext } from "./App";
import { BrowserRouter } from "react-router-dom";
import InputWithLabel from "./components/InputWithLabel";
import axios from "axios";

describe("unit testing basics", () => {
  test("assert if title is React", () => {
    expect(true).toBe(true);
  });

  test("assert if title is React", () => {
    expect(title).toBe("ReactJS");
  });
});

const word = [ {
  "word": "hello",
      "phonetic": "həˈləʊ",
      "phonetics": [
        {
          "text": "həˈləʊ",
          "audio": "//ssl.gstatic.com/dictionary/static/sounds/20200429/hello--_gb_1.mp3"
        },
        {
          "text": "hɛˈləʊ"
        }
      ],
      "origin": "early 19th century: variant of earlier hollo ; related to holla.",
      "meanings": [
        {
          "partOfSpeech": "exclamation",
          "definitions": [
            {
              "definition": "used as a greeting or to begin a phone conversation.",
              "example": "hello there, Katie!",
              "synonyms": [],
              "antonyms": []
            }
          ]
        },
        {
          "partOfSpeech": "noun",
          "definitions": [
            {
              "definition": "an utterance of ‘hello’; a greeting.",
              "example": "she was getting polite nods and hellos from people",
              "synonyms": [],
              "antonyms": []
            }
          ]
        },
        {
          "partOfSpeech": "verb",
          "definitions": [
            {
              "definition": "say or shout ‘hello’.",
              "example": "I pressed the phone button and helloed",
              "synonyms": [],
              "antonyms": []
            }
          ]
        }
      ]
    }
  ]

const stories = [word]


describe("testing the word", () => {
  test("test remove word from reducer", () => {
    const currentState = { data: stories, isLoading: false, isError: false };
    const action = { type: "DELETE_WORD", payload: { id: 3 } };
    const newState = wordsReducer(currentState, action);
    const expectedState = {
      data: [word],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });

  test("test remove word from reducer", () => {
    const currentState = { data: words, isLoading: false, isError: false };
    const action = {
      type: "ADD_WORDS",
      payload: { data: [words] },
    };
    const newState = wordsReducer(currentState, action);
    const expectedState = {
      data: [words],
      isLoading: false,
      isError: false,
    };
    expect(newState).toStrictEqual(expectedState);
  });
});


describe("test Input with label component", () => {
  test("render Input with label component", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    render(<InputWithLabel {...inputWithLabelProps} />);
    screen.debug();
  });

  test("snapshot testing", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    const { container } = render(<InputWithLabel {...inputWithLabelProps} />);
    expect(container.firstChild).toMatchSnapshot();
  });
  test("check if on change is called", () => {
    const inputWithLabelProps = {
      children: "Search Label",
      onChange: jest.fn(),
      searchText: "React",
    };
    render(<InputWithLabel {...inputWithLabelProps} />);
    const inputElement = screen.getByDisplayValue("React");
    screen.debug();
    fireEvent.change(inputElement, { target: { value: "Redux" } });
    expect(inputWithLabelProps.onChange).toHaveBeenCalledTimes(1);
  });
});

//integration testing
jest.mock("axios");

describe("render the app component", () => {
  test("check if render works", async () => {
    const resolvedPromise = Promise.resolve({ data: { hits: stories } });
    axios.get.mockImplementationOnce(() => resolvedPromise);
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    screen.debug();
    expect(screen.queryByText("Loading")).toBeInTheDocument();
    await act(() => resolvedPromise);
    expect(screen.queryByText("Loading")).toBeNull();
    screen.debug();
  });
});