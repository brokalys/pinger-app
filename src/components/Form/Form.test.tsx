import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Form from "./Form";

jest.mock("components/RegionSelector");

describe("Form", () => {
  const setFieldValue = (label: string, value: string) => {
    userEvent.clear(screen.getByLabelText(label));
    userEvent.type(screen.getByLabelText(label), value);
  };

  const selectDropdownValue = (label: string, valueLabel: string) =>
    userEvent.click(screen.getByText(valueLabel));

  const findErrorMessageForField = async (
    label: string,
    errorMessage: string,
  ) =>
    screen.findByText((content, element) => {
      return (
        element.id ===
          screen.getByText(label).getAttribute("for") + "-error-message" &&
        content === errorMessage
      );
    });

  const submit = () => userEvent.click(screen.getByRole("button"));

  describe("form validation", () => {
    let onSubmit;

    beforeEach(() => {
      onSubmit = jest.fn();
      render(<Form onSubmit={onSubmit} />);
    });

    describe("individual field validation", () => {
      describe("email", () => {
        it("is required", async () => {
          setFieldValue("E-pasta adrese", "");
          submit();

          expect(
            await findErrorMessageForField(
              "E-pasta adrese",
              "Šis lauciņš ir obligāti jāaizpilda",
            ),
          ).toBeVisible();
        });

        it("is valid email", async () => {
          setFieldValue("E-pasta adrese", "john");
          submit();

          expect(
            await findErrorMessageForField(
              "E-pasta adrese",
              "Šajā lauciņā jābūt ievadītai e-pasta adresei",
            ),
          ).toBeVisible();
        });
      });

      describe("price", () => {
        describe("price_min", () => {
          it("is required", async () => {
            setFieldValue("Cena (min)", "");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (min)",
                "Šis lauciņš ir obligāti jāaizpilda",
              ),
            ).toBeVisible();
          });

          it("is not a string", async () => {
            setFieldValue("Cena (min)", "john");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (min)",
                "Šis lauciņš ir obligāti jāaizpilda",
              ),
            ).toBeVisible();
          });

          it("is not negative", async () => {
            setFieldValue("Cena (min)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Cena (min)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });
        });

        describe("price_max", () => {
          it("is required", async () => {
            setFieldValue("Cena (max)", "");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (max)",
                "Šis lauciņš ir obligāti jāaizpilda",
              ),
            ).toBeVisible();
          });

          it("is not a string", async () => {
            setFieldValue("Cena (max)", "john");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (max)",
                "Šis lauciņš ir obligāti jāaizpilda",
              ),
            ).toBeVisible();
          });

          it("is not negative", async () => {
            setFieldValue("Cena (max)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Cena (max)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not above 10000000", async () => {
            setFieldValue("Cena (max)", "10000001");
            submit();

            expect(
              await findErrorMessageForField(
                "Cena (max)",
                "Šī lauciņa vērtībai ir jābūt mazākai par 10000000",
              ),
            ).toBeVisible();
          });
        });

        it("price_max must be bigger than price_min", async () => {
          setFieldValue("Cena (min)", "20");
          setFieldValue("Cena (max)", "10");
          submit();

          expect(
            await findErrorMessageForField(
              "Cena (max)",
              "Šī lauciņa vērtībai ir jābūt lielākai vai vienādai ar 20",
            ),
          ).toBeVisible();
        });
      });

      describe("rooms", () => {
        describe("rooms_min", () => {
          it("is not negative", async () => {
            setFieldValue("Istabas (min)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Istabas (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Istabas (min)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Istabas (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });
        });

        describe("rooms_max", () => {
          it("is not negative", async () => {
            setFieldValue("Istabas (max)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Istabas (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Istabas (max)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Istabas (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not above 20", async () => {
            setFieldValue("Istabas (max)", "21");
            submit();

            expect(
              await findErrorMessageForField(
                "Istabas (max)",
                "Šī lauciņa vērtībai ir jābūt mazākai par 20",
              ),
            ).toBeVisible();
          });
        });

        it("rooms_max must be bigger than rooms_min", async () => {
          setFieldValue("Istabas (min)", "10");
          setFieldValue("Istabas (max)", "5");
          submit();

          expect(
            await findErrorMessageForField(
              "Istabas (max)",
              "Šī lauciņa vērtībai ir jābūt lielākai vai vienādai ar 10",
            ),
          ).toBeVisible();
        });
      });

      describe("area_m2", () => {
        describe("area_m2_min", () => {
          it("is not negative", async () => {
            setFieldValue("Platība (min)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Platība (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Platība (min)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Platība (min)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });
        });

        describe("area_m2_max", () => {
          it("is not negative", async () => {
            setFieldValue("Platība (max)", "-5");
            submit();

            expect(
              await findErrorMessageForField(
                "Platība (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not zero", async () => {
            setFieldValue("Platība (max)", "0");
            submit();

            expect(
              await findErrorMessageForField(
                "Platība (max)",
                "Šajā lauciņā var ievadīt tikai pozitīvus skaitļus",
              ),
            ).toBeVisible();
          });

          it("is not above 1000 by default", async () => {
            setFieldValue("Platība (max)", "1001");
            submit();

            expect(
              await findErrorMessageForField(
                "Platība (max)",
                "Šī lauciņa vērtībai ir jābūt mazākai par 1000",
              ),
            ).toBeVisible();
          });

          it("is not above 1000000 if category = LAND is selected", async () => {
            setFieldValue("Platība (max)", "1000001");
            selectDropdownValue("Nekustamā īpašuma tips", "Zeme");

            submit();

            expect(
              await findErrorMessageForField(
                "Platība (max)",
                "Šī lauciņa vērtībai ir jābūt mazākai par 1000000",
              ),
            ).toBeVisible();
          });
        });

        it("area_m2_max must be bigger than area_m2_min", async () => {
          setFieldValue("Platība (min)", "10");
          setFieldValue("Platība (max)", "5");
          submit();

          expect(
            await findErrorMessageForField(
              "Platība (max)",
              "Šī lauciņa vērtībai ir jābūt lielākai vai vienādai ar 10",
            ),
          ).toBeVisible();
        });
      });

      describe("region", () => {
        it("is required", async () => {
          setFieldValue("Reģions", "");
          submit();

          expect(
            await findErrorMessageForField(
              "Reģions",
              "Šis lauciņš ir obligāti jāaizpilda",
            ),
          ).toBeVisible();
        });

        it("must be a valid region", async () => {
          setFieldValue("Reģions", "abc");
          submit();

          expect(
            await findErrorMessageForField("Reģions", "Lūdzu izvēlies reģionu"),
          ).toBeVisible();
        });
      });

      describe("comments", () => {
        it("must not be longer than 255 characters", async () => {
          setFieldValue("Komentāri", "c".repeat(256));
          submit();

          expect(
            await findErrorMessageForField(
              "Komentāri",
              "Šajā lauciņā drīkst ievadīt tikai 255 simbolus",
            ),
          ).toBeVisible();
        });
      });
    });

    it("triggers the callback on submit if the form is valid with minimal data filled", async () => {
      setFieldValue("E-pasta adrese", "test@brokalys.com");
      setFieldValue("Cena (min)", "10000");
      setFieldValue("Cena (max)", "70000");
      setFieldValue(
        "Reģions",
        "56.992294 -24.136619, 56.996502 24.245176, 56.992294 -24.136619",
      );

      submit();

      await waitFor(() => expect(onSubmit).toBeCalled());
    });

    it("triggers the callback on submit if the form is valid with all data filled", async () => {
      setFieldValue("E-pasta adrese", "test@brokalys.com");
      selectDropdownValue("Nekustamā īpašuma tips", "Māja");
      selectDropdownValue("Darījuma veids", "Īrē");
      setFieldValue("Cena (min)", "10000");
      setFieldValue("Cena (max)", "70000");
      setFieldValue("Istabas (min)", "2");
      setFieldValue("Istabas (max)", "3");
      setFieldValue("Platība (min)", "40");
      setFieldValue("Platība (max)", "80");
      setFieldValue(
        "Reģions",
        "56.992294 24.136619, 56.976394 23.995790, 56.924904 24.005336, 56.889288 24.108467, 56.932211 24.291935, 56.996502 24.245176, 56.992294 24.136619",
      );
      setFieldValue("Komentāri", "Test");

      submit();

      await waitFor(() => expect(onSubmit).toBeCalled());
    });
  });

  it("shows success message", async () => {
    render(<Form success={<p>PINGERis veiksmīgi izveidots</p>} />);

    expect(
      await screen.findByText("PINGERis veiksmīgi izveidots"),
    ).toBeTruthy();
  });

  it("shows warning message", async () => {
    render(<Form warning={<p>Mēģini vēlreiz</p>} />);

    expect(await screen.findByText("Mēģini vēlreiz")).toBeTruthy();
  });

  it("shows error message", async () => {
    render(<Form error={<p>Kaut kas nogāja greizi</p>} />);

    expect(await screen.findByText("Kaut kas nogāja greizi")).toBeTruthy();
  });
});
