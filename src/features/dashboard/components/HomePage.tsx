import { Button, Container, Overlay, Title } from "@mantine/core";
import classes from "../../../styles/Home.module.css";

export function HomePage() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size="md">
        <Title className={classes.title}>
          Student System with Courses and simple JWT authentication{" "}
        </Title>

        <Button
          variant="gradient"
          size="xl"
          radius="xl"
          className={classes.control}
        >
          Get started
        </Button>
      </Container>
    </div>
  );
}
