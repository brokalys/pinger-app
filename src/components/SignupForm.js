import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Grid,
} from "@chakra-ui/core";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  test: Yup.string()
    .email('Invalid email')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export default function SignupForm() {
  const [isLoading] = React.useState(false);
  const initialValues = {

  };

  function handleSubmit() {
    console.log('Submit 1');
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {props => (
        <Form>
          <Field name="email">
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email}>
                <FormLabel htmlFor="email">E-pasta adrese</FormLabel>
                <Input {...field} id="email" />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Grid templateColumns="repeat(2, 1fr)" gap="6">
            <Field name="price_min">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.price_min}>
                  <Input {...field} id="price_min" />
                  <FormErrorMessage>{form.errors.price_min}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="price_max">
              {({ field, form }) => (
                <FormControl isInvalid={form.errors.price_max}>
                  <Input {...field} id="price_max" />
                  <FormErrorMessage>{form.errors.price_max}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Grid>

          <Button
            mt={4}
            variantColor="teal"
            isLoading={isLoading}
            type="submit"
          >
            Saņemt nek.īp. paziņojumus
          </Button>
        </Form>
      )}
    </Formik>
  );
}

        // <FormControl>
        //   <FormLabel htmlFor="email">Email address</FormLabel>
        //   <Input type="email" id="email" aria-describedby="email-helper-text" />
        //   <FormHelperText id="email-helper-text">
        //     We'll never share your email.
        //   </FormHelperText>
        // </FormControl>
