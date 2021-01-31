import { mixed, number, object, string, NumberSchema, SchemaOf } from "yup";

export interface FormSchema {
  email: string;
  category: "APARTMENT" | "HOUSE" | "LAND";
  type: "SELL" | "RENT";
  price_min: number;
  price_max: number;
  rooms_min?: number;
  rooms_max?: number;
  area_m2_min?: number;
  area_m2_max?: number;
  region: string;
  comments?: string;
}

const positiveFormNumber = (): NumberSchema =>
  number()
    .positive()
    .integer()
    .transform((value?: string | number, originalValue?: string | number) =>
      String(originalValue).trim() === "" ? undefined : value,
    );

const moreThanEqualMin = (min: number | undefined, schema: NumberSchema) => {
  if (!min) {
    return schema;
  }
  return schema.min(min);
};

const schema: SchemaOf<FormSchema> = object().shape({
  email: string().email().required(),
  category: mixed().oneOf(["APARTMENT", "HOUSE", "LAND"]).required(),
  type: mixed().oneOf(["SELL", "RENT"]).required(),
  price_min: positiveFormNumber().required(),
  price_max: positiveFormNumber()
    .required()
    .when("price_min", moreThanEqualMin)
    .lessThan(10000000),
  rooms_min: positiveFormNumber(),
  rooms_max: positiveFormNumber()
    .when("rooms_min", moreThanEqualMin)
    .lessThan(20),
  area_m2_min: positiveFormNumber(),
  area_m2_max: positiveFormNumber()
    .when("area_m2_min", moreThanEqualMin)
    .when("category", (category: string, schema: NumberSchema) =>
      schema.lessThan(category === "LAND" ? 1000000 : 1000),
    ),
  region: string()
    .required()
    .matches(/^(-?[0-9]{1,3}\.[0-9]+ -?[0-9]{1,3}\.[0-9]+(, )?)+$/, {
      message: "Lūdzu izvēlies reģionu",
    }),
  comments: string().max(255),
});

export default schema;
