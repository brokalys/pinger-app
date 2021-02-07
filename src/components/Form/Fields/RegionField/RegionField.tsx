import { useState } from "react";
import {
  DropdownItemProps,
  DropdownProps,
  Form,
  Select,
} from "semantic-ui-react";
import RegionSelector from "components/RegionSelector";
import styles from "./RegionField.module.css";
import useRegionOptions from "./use-region-options";

function getCenterCoords(arr: Array<[number, number]>) {
  const coords = arr.reduce(
    (x, y) => [x[0] + y[0] / arr.length, x[1] + y[1] / arr.length],
    [0, 0],
  );

  return { lat: coords[1], lng: coords[0] };
}

function getCoordinatesByValue(
  options: DropdownItemProps[] | undefined,
  value: any,
) {
  return options!.find((opt) => opt.value === value)?.data?.geometry
    ?.coordinates[0];
}

interface RegionFieldProps {
  value: string;
  onChange: (value: any) => void;
}

export default function RegionField(props: RegionFieldProps) {
  const regionOptions = useRegionOptions();
  const [center, setCenter] = useState({
    lat: 56.94,
    lng: 24.105,
  });
  const [zoom, setZoom] = useState(11);

  function onSelectChange(
    e: React.SyntheticEvent<HTMLElement>,
    { value, options }: DropdownProps,
  ) {
    setCenter(getCenterCoords(getCoordinatesByValue(options, value)));
    setZoom(13);
    props.onChange(value);
  }

  return (
    <>
      <Form.Field required inline>
        <label className={styles.label}>Reģions</label>
        <div className={styles.dropdown}>
          <Select
            deburr
            search
            loading={!regionOptions.length}
            placeholder="Ātrā reģionu izvēlne"
            options={regionOptions}
            value={props.value}
            onChange={onSelectChange}
          />
        </div>
      </Form.Field>
      <RegionSelector
        center={center}
        zoom={zoom}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}
