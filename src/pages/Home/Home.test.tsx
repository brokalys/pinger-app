import { MockedProvider } from "@apollo/client/testing";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { loader } from "graphql.macro";
import Home from "./Home";

const CREATE_PINGER = loader("../../graphql/create-pinger.graphql");

const mocks = [
  {
    request: {
      query: CREATE_PINGER,
      variables: {
        email: "test+success@brokalys.com",
        category: "APARTMENT",
        type: "SELL",
        price_min: 10000,
        price_max: 70000,
        region:
          "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
        comments: "",
      },
    },
    result: {
      data: {
        createPinger: true,
      },
    },
  },
  {
    request: {
      query: CREATE_PINGER,
      variables: {
        email: "test+limit@brokalys.com",
        category: "APARTMENT",
        type: "SELL",
        price_min: 10000,
        price_max: 70000,
        region:
          "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
        comments: "",
      },
    },
    result: {
      errors: [
        {
          extensions: {
            code: "BAD_USER_INPUT",
            maxPingers: 5,
          },
          message: "Max amount of 5 PINGERS per email exceeded.",
        },
      ],
    },
  },
  {
    request: {
      query: CREATE_PINGER,
      variables: {
        email: "test+fail@brokalys.com",
        category: "APARTMENT",
        type: "SELL",
        price_min: 10000,
        price_max: 70000,
        region:
          "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
        comments: "",
      },
    },
    result: { errors: [new Error("An error occurred")] },
  },
  {
    request: {
      query: CREATE_PINGER,
      variables: {
        email: "test+network@brokalys.com",
        category: "APARTMENT",
        type: "SELL",
        price_min: 10000,
        price_max: 70000,
        region:
          "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
        comments: "",
      },
    },
    error: new Error("An error occurred"),
  },
];

function Providers({ children }) {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>;
}

jest.mock("components/RegionSelector");

function submitForm(customData) {
  const data = {
    email: "test@brokalys.com",
    price_min: "10000",
    price_max: "70000",
    region: "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
    ...customData,
  };

  userEvent.type(screen.getByLabelText("E-pasta adrese"), data.email);
  userEvent.type(screen.getByLabelText("Cena (min)"), data.price_min);
  userEvent.type(screen.getByLabelText("Cena (max)"), data.price_max);
  userEvent.clear(screen.getByLabelText("Reģions"));
  userEvent.type(screen.getByLabelText("Reģions"), data.region);
  userEvent.click(screen.getByRole("button"));
}

describe("Home", () => {
  beforeEach(() => {
    render(<Home />, { wrapper: Providers });
  });

  it("shows basic information", () => {
    expect(screen.getByText("Brokalys pingeris")).toBeTruthy();
    expect(
      screen.getByText(
        "Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā īpašuma sludinājumiem.",
      ),
    ).toBeTruthy();
  });

  it("shows a success message if successful API call performed", async () => {
    submitForm({ email: "test+success@brokalys.com" });

    expect(
      await screen.findByText("PINGERis veiksmīgi izveidots"),
    ).toBeTruthy();
  });

  it("shows a warning message if max limit reached", async () => {
    submitForm({ email: "test+limit@brokalys.com" });

    expect(await screen.findByText("PINGERis nav izveidots")).toBeTruthy();
  });

  it("shows an error message if API call failed", async () => {
    submitForm({ email: "test+fail@brokalys.com" });

    expect(await screen.findByText("Kaut kas nogāja greizi")).toBeTruthy();
  });

  it.skip("shows an error message if API call failed due to network issues", async () => {
    submitForm({ email: "test+network@brokalys.com" });

    expect(await screen.findByText("Kaut kas nogāja greizi")).toBeTruthy();
  });
});
