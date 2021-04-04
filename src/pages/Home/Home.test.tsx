import { MockedProvider } from "@apollo/client/testing";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter as Router } from "react-router-dom";
import { loader } from "graphql.macro";
import Home from "./Home";

const CREATE_PINGER = loader("../../graphql/create-pinger.graphql");

const mockRegion =
  "56.95149160944264 24.07167677454094, 56.95054266636084 24.073704227150024, 56.94962024147617 24.076387146812706, 56.94907988528139 24.07855445331492, 56.94864777624648 24.079971395582344, 56.94871283146574 24.080317987539235, 56.94735862865447 24.082550817518467, 56.945305907992555 24.086873825354214, 56.946313821082754 24.088607233244964, 56.94788905145168 24.090746038898892, 56.94892831723303 24.09265286940516, 56.94983804983625 24.095038056421053, 56.9484539299444 24.096033348088998, 56.94584949231609 24.098834694171636, 56.94457353271982 24.100984230456362, 56.94452656960908 24.100890323621968, 56.93764356202236 24.087473790338223, 56.933723493758514 24.086912993996524, 56.93277847226369 24.082813132924784, 56.93183087818336 24.08249583718676, 56.93217635941357 24.08123580078053, 56.92955022040352 24.07831470074629, 56.928472525801475 24.07933674061458, 56.9273530900092 24.078231307403925, 56.92650643069403 24.079312518425528, 56.92634040158523 24.077823565240326, 56.92631188969713 24.07517859322804, 56.926645617549156 24.071266961803968, 56.92740099156704 24.06746622944543, 56.92889790400162 24.063373697721072, 56.930233158844416 24.06156798893451, 56.93947460352514 24.05339251409374, 56.93947654631444 24.05339756235723, 56.93954415741509 24.053561905502104, 56.94005950043169 24.054953217059214, 56.94055251546538 24.05736222602674, 56.941404335093 24.06060136232709, 56.94414097939139 24.058420733435394, 56.94462600198996 24.057652944984905, 56.94473978974846 24.05611602055354, 56.945095131277576 24.05629391422037, 56.94627359108742 24.058246702710182, 56.947419809309366 24.059992632141007, 56.948953308967795 24.06259663304678, 56.950768825627144 24.06488051611806, 56.950763041127715 24.06510871159173, 56.952286999819734 24.067787597328206, 56.95242261112121 24.06954694526129, 56.952085158566405 24.07056305144195, 56.95195903516063 24.071185488172805, 56.95149160944264 24.07167677454094";
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
        price_type: "TOTAL",
        region: mockRegion,
        privacy_policy: true,
        marketing: true,
        frequency: "WEEKLY",
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
        price_type: "TOTAL",
        region: mockRegion,
        privacy_policy: true,
        marketing: true,
        frequency: "WEEKLY",
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
        price_type: "TOTAL",
        region: mockRegion,
        privacy_policy: true,
        marketing: true,
        frequency: "WEEKLY",
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
        price_type: "TOTAL",
        region: mockRegion,
        privacy_policy: true,
        marketing: true,
        frequency: "WEEKLY",
      },
    },
    error: new Error("An error occurred"),
  },
];

function Providers({ children }) {
  return (
    <MockedProvider mocks={mocks}>
      <Router>{children}</Router>
    </MockedProvider>
  );
}

function submitForm(customData) {
  const data = {
    email: "test@brokalys.com",
    price_min: "10000",
    price_max: "70000",
    region: "Āgenskalns",
    ...customData,
  };

  userEvent.type(screen.getByLabelText("E-pasta adrese"), data.email);
  userEvent.type(screen.getByLabelText("Cena (min)"), data.price_min);
  userEvent.type(screen.getByLabelText("Cena (max)"), data.price_max);
  userEvent.click(screen.getByText(data.region));
  userEvent.click(
    screen.getByRole("checkbox", {
      name: "Piekrītu lietošanas noteikumiem un privātuma politikai",
    }),
  );
  userEvent.click(
    screen.getByRole("checkbox", {
      name:
        "Vēlos saņemt mārketinga komunikāciju uzzini pirmais par Brokalys uzlabojumiem!",
    }),
  );
  userEvent.click(screen.getByText("Saņemt nek.īp. paziņojumus"));
}

describe("Home", () => {
  beforeEach(async () => {
    render(<Home />, { wrapper: Providers });
    await waitFor(() =>
      expect(screen.getByText("Āgenskalns")).toBeInTheDocument(),
    );
  });

  it("shows basic information", () => {
    expect(screen.getByText("Brokalys pingeris")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā īpašuma sludinājumiem.",
      ),
    ).toBeInTheDocument();
  });

  it("shows a success message if successful API call performed", async () => {
    submitForm({ email: "test+success@brokalys.com" });

    expect(
      await screen.findByText("PINGERis veiksmīgi izveidots"),
    ).toBeInTheDocument();
  });

  it("shows a warning message if max limit reached", async () => {
    submitForm({ email: "test+limit@brokalys.com" });

    expect(
      await screen.findByText("PINGERis nav izveidots"),
    ).toBeInTheDocument();
  });

  it("shows an error message if API call failed", async () => {
    submitForm({ email: "test+fail@brokalys.com" });

    expect(
      await screen.findByText("Kaut kas nogāja greizi"),
    ).toBeInTheDocument();
  });

  it.skip("shows an error message if API call failed due to network issues", async () => {
    submitForm({ email: "test+network@brokalys.com" });

    expect(
      await screen.findByText("Kaut kas nogāja greizi"),
    ).toBeInTheDocument();
  });
});
