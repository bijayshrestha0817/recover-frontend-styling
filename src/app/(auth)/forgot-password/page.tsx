"use client";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import classes from "../../../styles/ForgotPassword.module.css";

export default function ForgotPassword() {
  const form = useForm({
    initialValues: {
      email: "",
    },
  });
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>
      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            label="Email"
            placeholder="mantine@gmail.com"
            required
            radius="md"
            {...form.getInputProps("email")}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor
              href="/login"
              c="dimmed"
              size="sm"
              className={classes.control}
            >
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page </Box>
              </Center>
            </Anchor>

            <Button type="submit" className={classes.control}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
