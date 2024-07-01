import { useQuery, useMutation, gql } from "@apollo/client";
import { loader } from "graphql.macro";
import React, { useCallback } from "react";

/**
 * TODO: should we move conversion to some common place?
 * seems odd to pull from component
 */
import RegionSelector from "../../components/RegionSelector";
import { TRANSLATION_MAP } from "../../components/Form/Form";
import { useParams } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Icon,
  Label,
  LabelGroup,
  List,
  ListItem,
  Modal,
  ModalContent,
  ModalHeader,
  Segment,
} from "semantic-ui-react";
import Form, { PingerSchema } from "components/Form";

const GET_PINGERS = loader("../../graphql/get-pingers.graphql");
const CREATE_PINGER = loader("../../graphql/create-pinger.graphql");
const UNSUBSCRIBE_PINGER = loader("../../graphql/unsubscribe-pinger.graphql");

export default function Pingers() {
  const { id, unsubscribe_key } =
    useParams<{ id: string; unsubscribe_key: string }>();

  const [selectedPinger, setSelectedPinger] =
    React.useState<PingerSchema | null>(null);

  const unselectPinger = React.useCallback(() => setSelectedPinger(null), []);

  const pingers = useQuery<{
    pingers: { results: ReadonlyArray<PingerSchema> };
  }>(GET_PINGERS, {
    variables: { id, unsubscribe_key },
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
  });

  if (pingers.loading) {
    return <h1>Loading...</h1>;
  }

  if (pingers.error) {
    return <h1>Error: {JSON.stringify(pingers.error)}</h1>;
  }

  const results = pingers.data?.pingers?.results;

  if (!results || results.length === 0) {
    return <h1>Nav atrasti pingeri.</h1>;
  }

  return (
    <>
      <h1>Reģistrētie Pingeri:</h1>
      <List>
        {results
          .filter((_) => !_.unsubscribed_at!)
          .map((pinger) => {
            const setPinger = () => setSelectedPinger(pinger);
            return (
              <ListItem key={pinger.id}>
                <Segment data-testid={`pinger-${pinger.id}`}>
                  <Controls
                    pinger={pinger}
                    onEditClick={setPinger}
                    onUnsubscribe={() => pingers.refetch()}
                  />

                  <div
                    style={{ padding: ".5em 0" }}
                    onClick={setPinger}
                    data-testid={"region-selector-container"}
                  >
                    <RegionSelector value={pinger.region} readonly />
                  </div>
                  <Details pinger={pinger} />
                </Segment>
              </ListItem>
            );
          })}
      </List>
      <Modal
        open={!!selectedPinger}
        onClose={unselectPinger}
        onUnmount={unselectPinger}
        closeOnDimmerClick={true}
        closeOnEscape={true}
      >
        {selectedPinger && (
          <EditPingerForm
            pinger={selectedPinger}
            onEditComplete={() => {
              unselectPinger();
              pingers.refetch();
            }}
          />
        )}
      </Modal>
    </>
  );
}

const EditPingerForm: React.FC<{
  pinger: PingerSchema;
  onEditComplete: () => void;
}> = ({ pinger, onEditComplete }) => {
  const [
    createPinger,
    { loading: creatingPinger, error: pingerCreationError },
  ] = useMutation(CREATE_PINGER, { errorPolicy: "all" });

  const [
    unsubscribePinger,
    { loading: unsubscribing, error: ubsubscribeError },
  ] = useMutation(UNSUBSCRIBE_PINGER);

  const onSubmit = useCallback(
    (form: PingerSchema) => {
      return unsubscribePinger({
        variables: {
          id: pinger.id,
          unsubscribe_key: pinger.unsubscribe_key,
          all: false,
        },
      })
        .then(() => {
          return createPinger({ variables: form });
        })
        .then(onEditComplete);
    },
    [createPinger, unsubscribePinger, onEditComplete],
  );

  return (
    <>
      <ModalHeader>Labot Pingeri</ModalHeader>
      <ModalContent>
        <Form
          onSubmit={onSubmit}
          pinger={pinger}
          error={ubsubscribeError || pingerCreationError}
          loading={unsubscribing || creatingPinger}
        />
      </ModalContent>
    </>
  );
};

const Details: React.FC<{ pinger: PingerSchema }> = ({ pinger }) => {
  return (
    <LabelGroup color={"blue"}>
      <Label>
        <Icon name={"info circle"} />
        {TRANSLATION_MAP.category[pinger.category]}
      </Label>
      <Label>
        <Icon name={"handshake outline"} />
        {TRANSLATION_MAP.type[pinger.type]}
      </Label>
      <Label>
        <Icon name={"calendar outline"} />
        {TRANSLATION_MAP.frequency[pinger.frequency]}
      </Label>
      <Label>
        <Icon name={"euro sign"} />
        {pinger.price_min} - {pinger.price_max}
      </Label>
    </LabelGroup>
  );
};

const Controls: React.FC<{
  pinger: PingerSchema;
  onEditClick: () => void;
  onUnsubscribe: () => void;
}> = ({ pinger, onEditClick, onUnsubscribe }) => {
  const [unsubscribePinger, { loading: unsubscribing }] =
    useMutation(UNSUBSCRIBE_PINGER);

  return (
    <ButtonGroup>
      <Button
        loading={unsubscribing}
        disabled={unsubscribing}
        onClick={React.useCallback(() => {
          unsubscribePinger({
            variables: {
              id: pinger.id,
              unsubscribe_key: pinger.unsubscribe_key,
              all: false,
            },
          }).then(onUnsubscribe);
        }, [pinger])}
      >
        <Icon name={"calendar minus outline"} />
        Atrakstīties
      </Button>
      <Button onClick={onEditClick}>
        <Icon name={"edit"} />
        Labot
      </Button>
    </ButtonGroup>
  );
};
