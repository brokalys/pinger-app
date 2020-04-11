import React from 'react';
import { Button, Form, Input, InputNumber, Layout, Select } from 'element-react';

export default function SignupForm() {
  const [values, setValues] = React.useState({
    email: '',
    category: 'apartment',
    type: 'sell',
  });

  const rules = {
    email: [
      {
        required: true,
        message: "Šis lauciņš ir obligāti aizpildāms.",
        trigger: "blur"
      },
    ],
    // @todo
  };

  function onSubmit(event) {
    event.preventDefault();
    console.log('Submit', this);
  }

  function onChange(field, value) {
    setValues((state) => ({
      ...state,
      [field]: value,
    }));
  }

  function handleSubmit(event, ok) {
    event.preventDefault();
    console.log(event, ok);
  }

  return (
    <Form model={values} rules={rules} onSubmit={onSubmit}>
      <Form.Item label="E-pasta adrese" prop="email">
        <Input value={values.email} onChange={(value) => onChange('email', value)} />
      </Form.Item>

      <Layout.Row>
        <Layout.Col span="11">
          <Form.Item label="Nekustamā īpašuma tips" prop="category">
            <Select value={values.category} onChange={(value) => onChange('category', value)}>
              <Select.Option label="Dzīvoklis" value="apartment" />
              <Select.Option label="Māja" value="house" />
              <Select.Option label="Zeme" value="land" />
            </Select>
          </Form.Item>
        </Layout.Col>

        <Layout.Col span="11" offset="2">
          <Form.Item label="Darījuma veids" prop="type">
            <Select value={values.type} onChange={(value) => onChange('type', value)}>
              <Select.Option label="Pārdod" value="sell" />
              <Select.Option label="Īrē" value="rent" />
            </Select>
          </Form.Item>
        </Layout.Col>
      </Layout.Row>

      <Form.Item label="Cena (no, līdz)" />
      <Layout.Row>
        <Layout.Col span="11">
          <Form.Item prop="price_min">
            <InputNumber value={values.price_min} onChange={(value) => onChange('price_min', value)} />
          </Form.Item>
        </Layout.Col>

        <Layout.Col span="11" offset="2">
          <Form.Item prop="price_max">
            <InputNumber value={values.price_max} onChange={(value) => onChange('price_max', value)} />
          </Form.Item>
        </Layout.Col>
      </Layout.Row>

      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Saņemt nek.īp. paziņojumus</Button>
      </Form.Item>
    </Form>
  );
}
