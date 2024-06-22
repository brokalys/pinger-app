import { useQuery } from "@apollo/client";
import { loader } from "graphql.macro";
/// <reference types="googlemaps" />
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
/**
 * TODO: should we move conversion to some common place?
 * seems odd to pull from component
 */
import convert from "../../components/RegionSelector/conversion";
import RegionSelector from "../../components/RegionSelector";
import { TRANSLATION_MAP } from "../../components/Form/Form";
import { useParams } from "react-router-dom";

const GET_PINGERS = loader("../../graphql/get-pingers.graphql");

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
      <ul>
        {data.pingers.results.map((pinger) => {
          return (
            <li key={pinger.id}>
              <h2>{pinger.email}</h2>
              <RegionSelector
                value={pinger.region || ""}
                onChange={(region) => console.log(region)}
              />
              <p>
                {TRANSLATION_MAP.category[pinger.category]} |{" "}
                {TRANSLATION_MAP.type[pinger.type]} |{" "}
                {TRANSLATION_MAP.frequency[pinger.frequency]}
              </p>
            </li>
          );
        })}
      </ul>
    </>
  );
}
