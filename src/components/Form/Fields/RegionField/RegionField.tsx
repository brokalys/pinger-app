import { useState } from "react";
import { DropdownProps, Form, Select } from "semantic-ui-react";
import RegionSelector from "components/RegionSelector";
import styles from "./RegionField.module.css";
import useRegionOptions from "./use-region-options";

interface RegionFieldProps {
  value: string;
  onChange: (value: any) => void;
}

export default function RegionField(props: RegionFieldProps) {
  const regionOptions = useRegionOptions();
  const [initialValue] = useState(() => props.value);

  function onSelectChange(
    e: React.SyntheticEvent<HTMLElement>,
    { value }: DropdownProps,
  ) {
    if (!value) {
      reset();
      return;
    }

    props.onChange(value);
  }

  function reset() {
    props.onChange(initialValue);
  }

  return (
    <>
      <Form.Field required inline>
        <label className={styles.label}>Reģions</label>
        <div className={styles.dropdown}>
          <Select
            deburr
            search
            clearable
            selectOnBlur={false}
            selectOnNavigation={false}
            loading={!regionOptions.length}
            placeholder="Ātrā reģionu izvēlne"
            options={regionOptions}
            onChange={onSelectChange}
          />
        </div>

        <RegionSelector value={props.value} onChange={props.onChange} />
      </Form.Field>
    </>
  );
}
