import React, { useState } from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  DropdownItemProps,
  DropdownProps,
  Form,
  Grid,
  Icon,
  Label,
  LabelProps,
  SemanticShorthandItem,
  StrictDropdownItemProps,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import "shared/l10n";
import SupportButton from "components/SupportButton";
import RegionField from "./Fields/RegionField";
import PriceTypeLabel from "./PriceTypeLabel";
import schema, { PingerSchema, PRICE_TYPE } from "./schema";

export const TRANSLATION_MAP = {
  category: {
    APARTMENT: "Dzīvoklis",
    HOUSE: "Māja",
    LAND: "Zeme",
  },
  type: {
    SELL: "Pārdod",
    RENT: "Īrē",
    AUCTION: "Izsole",
  },
  price: {
    TOTAL: "Kopējā cena",
    SQM: "Par kvadrātmetru",
  },
  frequency: {
    IMMEDIATE: "Nekavējoties",
    DAILY: "Reizi dienā",
    WEEKLY: "Reizi nedēļā",
    MONTHLY: "Reizi mēnesī",
  },
} as const;

const frequencyDescription: Record<
  keyof typeof TRANSLATION_MAP["frequency"],
  string
> = {
  IMMEDIATE: "(viens e-pasts par katru jauno sludinājumu)",
  DAILY: "(viens e-pasts ar visiem dienas sludinājumiem)",
  WEEKLY: "(viens e-pasts ar visiem nedēļas sludinājumiem)",
  MONTHLY: "(viens e-pasts ar visiem mēneša sludinājumiem)",
};

const toDropDownItemProps = (
  obj: Record<string, string>,
): StrictDropdownItemProps[] => {
  return Object.entries(obj).map(([key, value]) => ({
    value: key,
    text: value,
  }));
};

const categoryOptions = toDropDownItemProps(TRANSLATION_MAP.category);
const typeOptions = toDropDownItemProps(TRANSLATION_MAP.type);
const priceTypeOptions = toDropDownItemProps(TRANSLATION_MAP.price);
const frequencyOptions = toDropDownItemProps(TRANSLATION_MAP.frequency).map(
  (v) => {
    return {
      ...v,
      description:
        frequencyDescription[
          // TODO: I suspect with TS 5.5 casting might be fixed
          v.value as keyof typeof TRANSLATION_MAP["frequency"]
        ],
    };
  },
);

const DEFAULT_PRICE_TYPE: keyof typeof TRANSLATION_MAP["price"] = "TOTAL";

function getError(
  field?: FieldError,
  pointing?: string,
): boolean | SemanticShorthandItem<LabelProps> {
  if (field) {
    return { content: field?.message, pointing: pointing || "below" };
  }
  return false;
}

interface PingerFormProps {
  pinger?: PingerSchema;
  onSubmit: (data: PingerSchema) => void;
  loading?: boolean;
  error?: React.ReactNode;
  warning?: React.ReactNode;
  success?: React.ReactNode;
}

export default function PingerForm(props: PingerFormProps) {
  const { control, handleSubmit, errors } = useForm<PingerSchema>({
    resolver: yupResolver(schema),
    defaultValues: props.pinger,
  });
  const [priceType, setPriceType] = useState<PRICE_TYPE>(DEFAULT_PRICE_TYPE);

  return (
    <Form
      loading={props.loading}
      error={!!props.error}
      warning={!!props.warning}
      success={!!props.success}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={(props) => (
          <Form.Field
            required
            id="form-email-field"
            control={Form.Input}
            label="E-pasta adrese"
            placeholder="john@doe.com"
            error={getError(errors.email)}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />

      <Form.Group widths="equal">
        <Controller
          name="category"
          control={control}
          defaultValue="APARTMENT"
          render={(props) => (
            <Form.Field
              required
              id="form-category-field"
              control={Form.Select}
              label="Nekustamā īpašuma tips"
              options={categoryOptions}
              error={getError(errors.category)}
              value={props.value}
              onChange={(
                e: React.SyntheticEvent<HTMLElement>,
                { value }: DropdownProps,
              ) => props.onChange(value)}
            />
          )}
        />

        <Controller
          name="type"
          control={control}
          defaultValue="SELL"
          render={(props) => (
            <Form.Field
              required
              id="form-type-field"
              control={Form.Select}
              label="Darījuma veids"
              options={typeOptions}
              error={getError(errors.type)}
              value={props.value}
              onChange={(
                e: React.SyntheticEvent<HTMLElement>,
                { value }: DropdownProps,
              ) => props.onChange(value)}
            />
          )}
        />
      </Form.Group>

      <Form.Group widths="3">
        <Controller
          name="price_type"
          control={control}
          defaultValue={DEFAULT_PRICE_TYPE}
          render={(props) => (
            <Form.Field
              required
              id="form-price-type-field"
              control={Form.Select}
              label="Cenas veids"
              options={priceTypeOptions}
              error={getError(errors.price_type)}
              value={props.value}
              onChange={(
                e: React.SyntheticEvent<HTMLElement>,
                { value }: DropdownProps,
              ) => {
                setPriceType(value as PRICE_TYPE);
                props.onChange(value);
              }}
            />
          )}
        />

        <Controller
          name="price_min"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field required error={!!errors.price_min}>
              <label htmlFor="form-price-min-field">Cena (min)</label>
              <Form.Input
                id="form-price-min-field"
                labelPosition="right"
                type="number"
                placeholder="0"
              >
                <input value={props.value} onChange={props.onChange} />
                <Label basic prompt={!!errors.price_min}>
                  <PriceTypeLabel type={priceType} />
                </Label>
              </Form.Input>
              {errors.price_min && (
                <Label
                  prompt
                  pointing="above"
                  id="form-price-min-field-error-message"
                >
                  {errors.price_min.message}
                </Label>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="price_max"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field required error={!!errors.price_max}>
              <label htmlFor="form-price-max-field">Cena (max)</label>
              <Form.Input
                id="form-price-max-field"
                labelPosition="right"
                type="number"
                placeholder="1000"
              >
                <input value={props.value} onChange={props.onChange} />
                <Label basic prompt={!!errors.price_max}>
                  <PriceTypeLabel type={priceType} />
                </Label>
              </Form.Input>
              {errors.price_max && (
                <Label
                  prompt
                  pointing="above"
                  id="form-price-max-field-error-message"
                >
                  {errors.price_max.message}
                </Label>
              )}
            </Form.Field>
          )}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Controller
          name="rooms_min"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field
              control={Form.Input}
              type="number"
              id="form-rooms-min-field"
              label="Istabas (min)"
              placeholder="1"
              error={getError(errors.rooms_min)}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
        <Controller
          name="rooms_max"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field
              control={Form.Input}
              type="number"
              id="form-rooms-max-field"
              label="Istabas (max)"
              placeholder="3"
              error={getError(errors.rooms_max)}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
      </Form.Group>

      <Form.Group widths="equal">
        <Controller
          name="area_m2_min"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field error={!!errors.area_m2_min}>
              <label htmlFor="form-area-m2-min-field">Platība (min)</label>
              <Form.Input
                id="form-area-m2-min-field"
                labelPosition="right"
                type="number"
                placeholder="30"
              >
                <input value={props.value} onChange={props.onChange} />
                <Label basic prompt={!!errors.area_m2_min}>
                  m<sup>2</sup>
                </Label>
              </Form.Input>
              {errors.area_m2_min && (
                <Label
                  prompt
                  pointing="above"
                  id="form-area-m2-min-field-error-message"
                >
                  {errors.area_m2_min.message}
                </Label>
              )}
            </Form.Field>
          )}
        />
        <Controller
          name="area_m2_max"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field error={!!errors.area_m2_max}>
              <label htmlFor="form-area-m2-max-field">Platība (max)</label>
              <Form.Input
                id="form-area-m2-max-field"
                labelPosition="right"
                type="number"
                placeholder="70"
              >
                <input value={props.value} onChange={props.onChange} />
                <Label basic prompt={!!errors.area_m2_max}>
                  m<sup>2</sup>
                </Label>
              </Form.Input>
              {errors.area_m2_max && (
                <Label
                  prompt
                  pointing="above"
                  id="form-area-m2-max-field-error-message"
                >
                  {errors.area_m2_max.message}
                </Label>
              )}
            </Form.Field>
          )}
        />
      </Form.Group>

      <Controller
        name="frequency"
        control={control}
        defaultValue="WEEKLY"
        render={(props) => (
          <Form.Field
            required
            id="form-frequency-field"
            control={Form.Select}
            label="Cik bieži vēlies saņemt PINGER e-pastus?"
            options={frequencyOptions}
            error={getError(errors.frequency)}
            value={props.value}
            onChange={(
              e: React.SyntheticEvent<HTMLElement>,
              { value }: DropdownProps,
            ) => props.onChange(value)}
          />
        )}
      />

      <Controller
        name="region"
        control={control}
        defaultValue="56.992294 24.136619, 56.976394 23.995790, 56.924904 24.005336, 56.889288 24.108467, 56.932211 24.291935, 56.996502 24.245176, 56.992294 24.136619"
        render={RegionField}
      />

      <Controller
        name="privacy_policy"
        control={control}
        defaultValue={false}
        render={(props) => (
          <Form.Checkbox
            required
            inline
            id="form-privacy-policy-field"
            label={
              <label>
                Piekrītu{" "}
                <Link to="/terms-and-conditions" target="_blank">
                  lietošanas noteikumiem <Icon name="external" />
                </Link>{" "}
                un{" "}
                <Link to="/privacy-policy" target="_blank">
                  privātuma politikai <Icon name="external" />
                </Link>
              </label>
            }
            error={getError(errors.privacy_policy, "left")}
            value="agree"
            checked={!!props.value}
            onChange={() => props.onChange(!props.value)}
          />
        )}
      />

      <Controller
        name="marketing"
        control={control}
        defaultValue={false}
        render={(props) => (
          <Form.Checkbox
            inline
            id="form-marketing-field"
            label={
              <label>
                Vēlos saņemt mārketinga komunikāciju{" "}
                <Label pointing="left">
                  uzzini pirmais par Brokalys uzlabojumiem!
                </Label>
              </label>
            }
            value="agree"
            checked={!!props.value}
            onChange={() => props.onChange(!props.value)}
          />
        )}
      />

      {props.error}
      {props.warning}
      {props.success}

      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Form.Field
              control={Form.Button}
              primary
              type="submit"
              role="button"
              content="Saņemt nek.īp. paziņojumus"
              formNoValidate
            />
          </Grid.Column>
          <Grid.Column textAlign="right">
            <SupportButton />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}

PingerForm.defaultProps = {
  loading: false,
  error: false,
  success: false,
};
