import { useEffect, useState } from "react";
import {
  DropdownItemProps,
  DropdownProps,
  Form,
  Select,
} from "semantic-ui-react";

/**
 * Lazy-load the large region option JSON
 */
export default function useRegionOptions() {
  const [options, setOptions] = useState<DropdownItemProps[]>([]);

  useEffect(() => {
    const loadRegionData = async () => {
      const { riga } = await import("@brokalys/location-json-schemas");

      setOptions(
        riga.features.map((data) => ({
          data,
          value: data.geometry.coordinates[0]
            .map((coords) => `${coords[1]} ${coords[0]}`)
            .join(", "),
          text: data.properties.name,
        })),
      );
    };

    loadRegionData();
  }, []);

  return options;
}
