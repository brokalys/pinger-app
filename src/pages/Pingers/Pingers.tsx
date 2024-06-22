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
  List,
  ListItem,
  Segment,
} from "semantic-ui-react";

const GET_PINGERS = loader("../../graphql/get-pingers.graphql");
const UNSUBSCRIBE_PINGER = gql(`
  mutation UnsubscribePinger($id: String!, $unsubscribe_key: String!, $all: Boolean!) {
    unsubscribePinger(
      id: $id,
      unsubscribe_key: $unsubscribe_key,
      all: $all,
    )
  }`);

type Pinger = {
  id: string;
  email: string;
  category: keyof typeof TRANSLATION_MAP["category"];
  type: keyof typeof TRANSLATION_MAP["type"];
  price_min: number;
  price_max: number;
  price_type: keyof typeof TRANSLATION_MAP["price"];
  region: string | null;
  rooms_min: number | null;
  rooms_max: number | null;
  area_m2_min: number | null;
  area_m2_max: number | null;
  frequency: keyof typeof TRANSLATION_MAP["frequency"];
  comments: string | null;
  marketing: boolean | null;
  created_at: string;
  unsubscribed_at: string;
  unsubscribe_key: string;
};

export default function Pingers() {
  const { id, unsubscribe_key } =
    useParams<{ id: string; unsubscribe_key: string }>();

  const { loading, error, data } = useQuery<{
    pingers: { results: ReadonlyArray<Pinger> };
  }>(GET_PINGERS, { variables: { id, unsubscribe_key }, errorPolicy: "all" });

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
                <h2>{pinger.email}</h2>
                <RegionSelector
                  value={pinger.region || ""}
                  onChange={(region) => console.log(region)}
                />
                <Grid>
                  <GridColumn floated={"left"} width={8}>
                    <Details pinger={pinger} />
                  </GridColumn>
                  <GridColumn floated={"right"} width={7}>
                    <Controls pinger={pinger} />
                  </GridColumn>
                </Grid>
              </Segment>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

const Details: React.FC<{ pinger: Pinger }> = ({ pinger }) => {
  return (
    <div>
      <Label color={"blue"}>
        <Icon name={"info circle"} />
        {TRANSLATION_MAP.category[pinger.category]}
      </Label>
      <Label color={"blue"}>
        <Icon name={"handshake outline"} />
        {TRANSLATION_MAP.type[pinger.type]}
      </Label>
      <Label color={"blue"}>
        <Icon name={"calendar outline"} />
        {TRANSLATION_MAP.frequency[pinger.frequency]}
      </Label>
    </div>
  );
};

const Controls: React.FC<{ pinger: Pinger }> = ({ pinger }) => {
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
      <Button>
        <Icon name={"edit"} />
        Labot
      </Button>
    </ButtonGroup>
  );
};
