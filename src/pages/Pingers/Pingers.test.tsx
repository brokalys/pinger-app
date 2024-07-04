import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { MemoryRouter as Router, Route } from "react-router-dom";
import * as React from "react";
import {
  getByTestId,
  getByText,
  fireEvent,
  render,
  screen,
  waitFor,
  getByRole,
} from "@testing-library/react";
import { loader } from "graphql.macro";
import Pingers from "./index";

const GET_PINGERS = loader("../../graphql/get-pingers.graphql");
const UNSUBSCRIBE_PINGER = loader("../../graphql/unsubscribe-pinger.graphql");
const CREATE_PINGER = loader("../../graphql/create-pinger.graphql");

const stubRegion =
  "56.703912 23.719139, 56.687889 23.578310, 56.636001 23.587856, 56.587256 23.699227, 56.643365 23.874455, 56.708153 23.827696, 56.703912 23.719139, 56.703912 23.719139";

const response1 = {
  __typename: "Pinger",
  id: "id1",
  email: "yolo@master.com",
  category: "APARTMENT",
  type: "SELL",
  price_min: 20000,
  price_max: 40000,
  price_type: "TOTAL",
  region: stubRegion,
  rooms_min: 1,
  rooms_max: 2,
  area_m2_min: null,
  area_m2_max: null,
  frequency: "DAILY",
  comments: null,
  marketing: false,
  created_at: "1685524566000",
  unsubscribed_at: null,
  unsubscribe_key: "u1key",
} as const;

const mocks: MockedResponse<Record<string, any>>[] = [
  {
    // delay: 30,
    request: {
      query: GET_PINGERS,
      variables: { id: "id1", unsubscribe_key: "u1key" },
    },
    result: {
      data: {
        pingers: {
          __typename: "PingerWrapper",
          results: [
            response1,
            {
              __typename: "Pinger",
              id: "id2",
              email: "yolo@master.com",
              category: "LAND",
              type: "SELL",
              price_min: 1,
              price_max: 200000,
              price_type: "TOTAL",
              region: stubRegion,
              rooms_min: null,
              rooms_max: null,
              area_m2_min: null,
              area_m2_max: null,
              frequency: "WEEKLY",
              comments: null,
              marketing: true,
              created_at: "1716892931000",
              unsubscribed_at: null,
              unsubscribe_key: "u2key",
            },
            {
              __typename: "Pinger",
              id: "id3",
              email: "yolo@master.com",
              category: "APARTMENT",
              type: "SELL",
              price_min: 1,
              price_max: 2,
              price_type: "TOTAL",
              region: stubRegion,
              rooms_min: null,
              rooms_max: null,
              area_m2_min: null,
              area_m2_max: null,
              frequency: "WEEKLY",
              comments: null,
              marketing: false,
              created_at: "1719253913000",
              unsubscribed_at: "1719254104000",
              unsubscribe_key: "u3key",
            },
            {
              __typename: "Pinger",
              id: "id4",
              email: "yolo@master.com",
              category: "APARTMENT",
              type: "SELL",
              price_min: 1,
              price_max: 2,
              price_type: "TOTAL",
              region: stubRegion,
              rooms_min: null,
              rooms_max: 5,
              area_m2_min: null,
              area_m2_max: null,
              frequency: "WEEKLY",
              comments: null,
              marketing: false,
              created_at: "1719350104000",
              unsubscribed_at: null,
              unsubscribe_key: "u4key",
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_PINGERS,
      variables: { id: "doesntExist", unsubscribe_key: "u1key" },
    },
    result: {
      data: { pingers: { __typename: "PingerWrapper", results: [] } },
    },
  },
];

const provider = (route: string[], m: MockedResponse<Record<string, any>>[]) =>
  function Providers({ children }: React.PropsWithChildren<{}>) {
    return (
      <MockedProvider mocks={m} addTypename={false}>
        <Router initialEntries={route}>{children}</Router>
      </MockedProvider>
    );
  };

const TestRoute = (
  <Route path="/pingers/:id,:unsubscribe_key">
    <Pingers />
  </Route>
);

describe("Pingers", () => {
  it("shows loading when graphqa loading", async () => {
    render(TestRoute, {
      wrapper: provider(["/pingers/id1,u1key"], mocks),
    });
    expect(await screen.getByText("Ielādējas...")).toBeInTheDocument();
  });

  it("shows no data when loaded empty", async () => {
    render(TestRoute, {
      wrapper: provider(["/pingers/doesntExist,u1key"], mocks),
    });
    expect(await screen.findByText("Nav atrasti pingeri.")).toBeInTheDocument();
  });

  describe("with data loaded", () => {
    it("shows loading", async () => {
      render(TestRoute, { wrapper: provider(["/pingers/id1,u1key"], mocks) });
      expect(
        await screen.findAllByTestId("pinger-", { exact: false }),
      ).toHaveLength(3);
    });

    it("shows edit pinger modal when click on edit", async () => {
      render(TestRoute, { wrapper: provider(["/pingers/id1,u1key"], mocks) });
      const pinger1 = await screen.findByTestId("pinger-id1");

      getByText(pinger1, "Labot").click();

      expect(screen.getByText("Labot Pingeri")).toBeInTheDocument();
    });

    it("shows edit pinger modal when click on map", async () => {
      render(TestRoute, { wrapper: provider(["/pingers/id1,u1key"], mocks) });
      const pinger1 = await screen.findByTestId("pinger-id1");

      getByTestId(pinger1, "region-selector-container").click();

      expect(screen.getByText("Labot Pingeri")).toBeInTheDocument();
    });

    it("closes modal when clicked outside modal", async () => {
      render(TestRoute, { wrapper: provider(["/pingers/id1,u1key"], mocks) });
      const pinger1 = await screen.findByTestId("pinger-id1");
      getByText(pinger1, "Labot").click();

      fireEvent.click(document.querySelector(".dimmer")!);

      expect(screen.queryByText("Labot Pingeri")).not.toBeInTheDocument();
    });

    it("closes modal when esc button press", async () => {
      render(TestRoute, { wrapper: provider(["/pingers/id1,u1key"], mocks) });
      const pinger1 = await screen.findByTestId("pinger-id1");
      getByText(pinger1, "Labot").click();

      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

      expect(screen.queryByText("Labot Pingeri")).not.toBeInTheDocument();
    });

    it("sends unsubscribe when click on unsubscribe and update list", async () => {
      let unsubscribed = false;
      render(TestRoute, {
        wrapper: provider(
          ["/pingers/id1,u1key"],
          [
            {
              request: {
                query: GET_PINGERS,
                variables: { id: "id1", unsubscribe_key: "u1key" },
              },
              maxUsageCount: 2,
              result: {
                data: {
                  pingers: {
                    __typename: "PingerWrapper",
                    results: [response1],
                  },
                },
              },
            },
            {
              request: {
                query: UNSUBSCRIBE_PINGER,
                variables: { id: "id1", unsubscribe_key: "u1key", all: false },
              },
              result: () => {
                unsubscribed = true;
                return {
                  data: { unsubscribePinger: true },
                };
              },
            },
          ],
        ),
      });
      const pinger1 = await screen.findByTestId("pinger-id1");

      getByText(pinger1, "Atrakstīties").click();

      await waitFor(() => expect(unsubscribed).toBeTruthy());
    });

    it("should update list after unsubscribe", async () => {
      let unsubscribed = false;
      render(TestRoute, {
        wrapper: provider(
          ["/pingers/id1,u1key"],
          [
            {
              request: {
                query: GET_PINGERS,
                variables: { id: "id1", unsubscribe_key: "u1key" },
              },
              maxUsageCount: 2,
              result: () => {
                return unsubscribed
                  ? { data: { pingers: { results: [] } } }
                  : {
                      data: {
                        pingers: {
                          __typename: "PingerWrapper",
                          results: [response1],
                        },
                      },
                    };
              },
            },
            {
              request: {
                query: UNSUBSCRIBE_PINGER,
                variables: { id: "id1", unsubscribe_key: "u1key", all: false },
              },
              result: () => {
                unsubscribed = true;
                return {
                  data: { unsubscribePinger: true },
                };
              },
            },
          ],
        ),
      });
      const pinger1 = await screen.findByTestId("pinger-id1");

      getByText(pinger1, "Atrakstīties").click();

      expect(
        await screen.findByText("Nav atrasti pingeri."),
      ).toBeInTheDocument();
    });

    it("sends unsubscribe + subscribe + refetch when confirmed edit", async () => {
      let unsubscribed = false;

      render(TestRoute, {
        wrapper: provider(
          ["/pingers/id1,u1key"],
          [
            {
              request: {
                query: GET_PINGERS,
                variables: { id: "id1", unsubscribe_key: "u1key" },
              },
              maxUsageCount: 2,
              result: {
                data: {
                  pingers: {
                    __typename: "PingerWrapper",
                    results: [response1],
                  },
                },
              },
            },
            {
              request: {
                query: UNSUBSCRIBE_PINGER,
                variables: { id: "id1", unsubscribe_key: "u1key", all: false },
              },
              result: () => {
                unsubscribed = true;
                return {
                  data: { unsubscribePinger: true },
                };
              },
            },
            {
              request: {
                query: CREATE_PINGER,
                variables: {
                  privacy_policy: true,
                  frequency: "DAILY",
                  region: stubRegion,
                  category: "APARTMENT",
                  rooms_min: 1,
                  rooms_max: 2,
                  price_type: "TOTAL",
                  price_min: 20000,
                  price_max: 40000,
                  type: "SELL",
                  email: "yolo@master.com",
                },
              },
              result: {
                data: {
                  createPinger: true,
                },
              },
            },
          ],
        ),
      });
      const pinger1 = await screen.findByTestId("pinger-id1");

      getByText(pinger1, "Labot").click();

      const pingerForm = await screen.getByTestId("pinger-form");
      clickCheckbox(
        pingerForm,
        "Piekrītu lietošanas noteikumiem un privātuma politikai",
      );
      fireEvent.click(getByText(pingerForm, "Apstiprināt izmaiņas"));

      await waitFor(() =>
        expect(
          getByText(pingerForm, "Apstiprināt izmaiņas"),
        ).not.toBeInTheDocument(),
      );
    });
  });
});

const clickCheckbox = (element: HTMLElement, label: string) =>
  fireEvent.click(getByRole(element, "checkbox", { name: label }));
