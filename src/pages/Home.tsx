import { Container, Segment } from 'semantic-ui-react'
import Form, { FormSchema } from 'components/Form'
import styles from './Home.module.css'

export default function Home() {
  const onSubmit = (data: FormSchema) => console.log(data)

  return (
    <Container text className={styles.container}>
      <Segment padded>
        <h1>Brokalys pingeris</h1>
        <p>
          Aizpildi formu un saņem paziņojumus e-pastā par jauniem nekustamā
          īpašuma sludinājumiem.
        </p>
        <hr />
        <Form onSubmit={onSubmit} />
      </Segment>
    </Container>
  )
}
