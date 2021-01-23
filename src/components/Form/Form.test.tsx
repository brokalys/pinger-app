import { render, fireEvent, screen } from '@testing-library/react'
// import { act } from "react-dom/test-utils";
import Form from './Form'

describe('Form', () => {
  describe('validation', () => {
    describe('individual fields', () => {
      describe('email', () => {
        it('is required', async () => {
          const utils = render(<Form onSubmit={jest.fn()} />)
          const input = utils.getByLabelText(
            'E-pasta adrese',
          ) as HTMLInputElement

          fireEvent.change(input, { target: { value: 'john' } })
          fireEvent.click(utils.getByRole('button'))
          // fireEvent.submit(utils.getByRole("button"));

          expect(input.value).toBe('john')
          expect(await utils.findAllByRole('alert')).toHaveLength(1)
        })

        it.todo('is valid email')
      })
    })
  })
})
