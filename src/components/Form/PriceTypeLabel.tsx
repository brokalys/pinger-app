import { PRICE_TYPE } from "./schema";

interface PriceTypeLabelProps {
  type: PRICE_TYPE;
}

export default function PriceTypeLabel(props: PriceTypeLabelProps) {
  if (props.type === "SQM") {
    return (
      <>
        EUR/m<sup>2</sup>
      </>
    );
  }

  return <>EUR</>;
}
