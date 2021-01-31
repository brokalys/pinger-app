import React from "react";
import { Controller, FieldError, useForm } from "react-hook-form";
import {
  DropdownItemProps,
  DropdownProps,
  Form,
  Label,
  LabelProps,
  SemanticShorthandItem,
} from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import RegionSelector from "components/RegionSelector";
import "shared/l10n";
import schema, { FormSchema } from "./schema";

const categoryOptions: DropdownItemProps[] = [
  { value: "APARTMENT", text: "Dzīvoklis" },
  { value: "HOUSE", text: "Māja" },
  { value: "LAND", text: "Zeme" },
];

const typeOptions: DropdownItemProps[] = [
  { value: "SELL", text: "Pārdod" },
  { value: "RENT", text: "Īrē" },
];

function getError(
  field?: FieldError,
): boolean | SemanticShorthandItem<LabelProps> {
  if (field) {
    return { content: field?.message, pointing: "below" };
  }
  return false;
}

interface PingerFormProps {
  onSubmit: (data: FormSchema) => void;
  loading?: boolean;
  error?: React.ReactNode;
  warning?: React.ReactNode;
  success?: React.ReactNode;
}

export default function PingerForm(props: PingerFormProps) {
  const { control, handleSubmit, errors } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

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

      <Form.Group widths="equal">
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
                  EUR
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
                  EUR
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
            <Form.Field required error={!!errors.area_m2_min}>
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
            <Form.Field required error={!!errors.area_m2_max}>
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
        name="region"
        control={control}
        defaultValue="56.992294 24.136619, 56.976394 23.995790, 56.924904 24.005336, 56.889288 24.108467, 56.932211 24.291935, 56.996502 24.245176, 56.992294 24.136619"
        render={(props) => (
          <Form.Field
            required
            control={RegionSelector}
            id="form-region-field"
            label="Reģions"
            error={getError(errors.region)}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />

      <Controller
        name="comments"
        control={control}
        defaultValue=""
        render={(props) => (
          <Form.Field
            control={Form.TextArea}
            id="form-comments-field"
            label="Komentāri"
            placeholder="Ieteikumi, atsauksmes"
            error={getError(errors.comments)}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />

      {props.error}
      {props.warning}
      {props.success}

      <Form.Field
        control={Form.Button}
        primary
        type="submit"
        role="button"
        content="Saņemt nek.īp. paziņojumus"
        formNoValidate
      />
    </Form>
  );
}

PingerForm.defaultProps = {
  loading: false,
  error: false,
  success: false,
};
