import { useQuery, useMutation, gql } from "@apollo/client";
import { loader } from "graphql.macro";
import React from "react";
/// <reference types="googlemaps" />
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
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
  Grid,
  GridColumn,
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
const UNSUBSCRIBE_PINGER = gql(`
  mutation UnsubscribePinger($id: String!, $unsubscribe_key: String!, $all: Boolean!) {
    unsubscribePinger(
      id: $id,
      unsubscribe_key: $unsubscribe_key,
      all: $all,
    )
  }`);

export default function Pingers() {
  const { id, unsubscribe_key } =
    useParams<{ id: string; unsubscribe_key: string }>();

  const { loading, error, data } = useQuery<{
    pingers: { results: ReadonlyArray<PingerSchema> };
  }>(GET_PINGERS, { variables: { id, unsubscribe_key }, errorPolicy: "all" });

  const [selectedPinger, setSelectedPinger] =
    React.useState<PingerSchema | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
  });

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error || loadError) {
    return <h1>Error: {JSON.stringify(error || loadError)}</h1>;
  }

  if (!data?.pingers?.results) {
    return <h1>No pingers found</h1>;
  }

  return (
    <>
      <h1>Reģistrētie Pingeri:</h1>
      <List>
        {data.pingers.results.map((pinger) => {
          return (
            <ListItem key={pinger.id}>
              <Segment>
                <Grid>
                  <GridColumn floated={"left"} width={8}>
                    <h2>{pinger.email}</h2>
                  </GridColumn>
                  <GridColumn floated={"right"} width={7}>
                    <Controls
                      pinger={pinger}
                      onEditClick={() => setSelectedPinger(pinger)}
                    />
                  </GridColumn>
                </Grid>
                <div
                  style={{ padding: ".5em 0" }}
                  onClick={() => setSelectedPinger(pinger)}
                >
                  <RegionSelector
                    value={pinger.region || ""}
                    onChange={(region) => console.log(region)}
                  />
                </div>
                <Details pinger={pinger} />
              </Segment>
            </ListItem>
          );
        })}
      </List>
      <Modal
        open={!!selectedPinger}
        onClose={() => setSelectedPinger(null)}
        onUnmount={() => setSelectedPinger(null)}
        closeOnDimmerClick={true}
        closeOnEscape={true}
      >
        {selectedPinger && <EditPingerForm pinger={selectedPinger} />}
      </Modal>
    </>
  );
}

const EditPingerForm: React.FC<{ pinger: PingerSchema }> = ({ pinger }) => {
  return (
    <>
      <ModalHeader>Labot Pingeri</ModalHeader>
      <ModalContent>
        <Form onSubmit={() => void 0} pinger={pinger} />
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

const Controls: React.FC<{ pinger: PingerSchema; onEditClick: () => void }> = ({
  pinger,
  onEditClick,
}) => {
  const [unsubscribePinger, { loading: unsubscribing }] =
    useMutation(UNSUBSCRIBE_PINGER);

  return (
    <ButtonGroup floated={"right"}>
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
          });
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
