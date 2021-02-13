import { ApolloError, useMutation } from "@apollo/client";
import { loader } from "graphql.macro";
import { useCallback } from "react";
import { Message } from "semantic-ui-react";
import Form, { FormSchema } from "components/Form";

const CREATE_PINGER = loader("../../graphql/create-pinger.graphql");

function getMaxPingerLimitFromError(error?: ApolloError): number {
  return error?.graphQLErrors[0]?.extensions?.maxPingers || 0;
}

export default function Home() {
  const [createPinger, { loading, error, data }] = useMutation(CREATE_PINGER, {
    errorPolicy: "all",
  });

  const onSubmit = useCallback(
    (form: FormSchema) => {
      createPinger({ variables: form });
    },
    [createPinger],
  );

  return (
    <>
      <h1>Brokalys pingeris</h1>
      <p>
        Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā
        īpašuma sludinājumiem.
      </p>
      <hr />
      <Form
        onSubmit={onSubmit}
        loading={loading}
        error={
          error &&
          getMaxPingerLimitFromError(error) <= 0 && (
            <Message
              error
              header="Kaut kas nogāja greizi"
              content="Centīsimies atrisināt problēmu tuvākajā laikā."
            />
          )
        }
        warning={
          error &&
          getMaxPingerLimitFromError(error) > 0 && (
            <Message warning>
              <Message.Header>PINGERis nav izveidots</Message.Header>
              <Message.Content>
                Diemžēl, vienai e-pasta adresei var pievienot tikai{" "}
                {getMaxPingerLimitFromError(error)} NĪ paziņojumus
              </Message.Content>
            </Message>
          )
        }
        success={
          data && (
            <Message
              success
              header="PINGERis veiksmīgi izveidots"
              content="Turpmāk saņemsi e-pastus par jauniem nekustamo īpašumu sludinājumiem, kas atbilst tevis izvēlētajiem kritērijiem."
            />
          )
        }
      />
    </>
  );
}
