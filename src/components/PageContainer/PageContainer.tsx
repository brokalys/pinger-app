import React from "react";
import { Link } from "react-router-dom";
import { Container, List } from "semantic-ui-react";
import styles from "./PageContainer.module.css";

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer(props: PageContainerProps) {
  return (
    <>
      <Container text className={styles.container}>
        {props.children}
      </Container>

      <Container textAlign="center" className={styles.footer}>
        <List divided horizontal inverted>
          <List.Item as={Link} to="/terms-and-conditions">
            Lietošanas noteikumi
          </List.Item>
          <List.Item as={Link} to="/privacy-policy">
            Privātuma politika
          </List.Item>
        </List>
      </Container>
    </>
  );
}
