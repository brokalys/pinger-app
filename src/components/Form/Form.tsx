import { Controller, FieldError, useForm } from 'react-hook-form'
import {
  Form,
  Label,
  LabelProps,
  DropdownItemProps,
  SemanticShorthandItem,
} from 'semantic-ui-react'
import { yupResolver } from '@hookform/resolvers/yup'
import schema, { FormSchema } from './schema'

const categoryOptions: DropdownItemProps[] = [
  { value: 'APARTMENT', text: 'Dzīvoklis' },
  { value: 'HOUSE', text: 'Māja' },
  { value: 'LAND', text: 'Zeme' },
]

const typeOptions: DropdownItemProps[] = [
  { value: 'SELL', text: 'Pārdod' },
  { value: 'RENT', text: 'Īrē' },
]

// @todo: do we need this?
function getError(
  field?: FieldError,
): boolean | SemanticShorthandItem<LabelProps> {
  if (field) {
    return { content: field?.message, pointing: 'above' }
  }
  return false
}

interface PingerFormProps {
  onSubmit: (data: FormSchema) => void
}

export default function PingerForm(props: PingerFormProps) {
  const { control, handleSubmit, errors } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  })

  // @todo: remove default email
  return (
    <Form onSubmit={handleSubmit(props.onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue="test@mja.lv"
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
              control={Form.Select}
              label="Nekustamā īpašuma tips"
              options={categoryOptions}
              error={getError(errors.category)}
              value={props.value}
              onChange={(e: any, { value }: any) => props.onChange(value)}
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
              control={Form.Select}
              label="Darījuma veids"
              options={typeOptions}
              error={getError(errors.type)}
              value={props.value}
              onChange={(e: any, { value }: any) => props.onChange(value)}
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
              <label>Cena (min)</label>
              <Form.Input labelPosition="right" type="number" placeholder="0">
                <input value={props.value} onChange={props.onChange} />
                <Label>EUR</Label>
              </Form.Input>
              {errors.price_min && (
                <Label prompt pointing="above">
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
              <label>Cena (max)</label>
              <Form.Input
                labelPosition="right"
                type="number"
                placeholder="1000"
              >
                <input value={props.value} onChange={props.onChange} />
                <Label>EUR</Label>
              </Form.Input>
              {errors.price_max && (
                <Label prompt pointing="above">
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
            <Form.Field
              control={Form.Input}
              type="number"
              label="Platība (min)"
              placeholder="30"
              error={getError(errors.area_m2_min)}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
        <Controller
          name="area_m2_max"
          control={control}
          defaultValue=""
          render={(props) => (
            <Form.Field
              control={Form.Input}
              type="number"
              label="Platība (max)"
              placeholder="70"
              error={getError(errors.area_m2_max)}
              value={props.value}
              onChange={props.onChange}
            />
          )}
        />
      </Form.Group>

      <Controller
        name="region"
        control={control}
        defaultValue=""
        render={(props) => (
          <Form.Field
            control={Form.TextArea}
            label="Reģions"
            placeholder="Ieteikumi, atsauksmes"
            error={getError(errors.region)}
            value={props.value}
            onChange={props.onChange}
          />
        )}
      />

      <Form.Field
        control={Form.Button}
        primary
        type="submit"
        role="button"
        content="Saņemt nek.īp. paziņojumus"
      />
    </Form>
  )
}
