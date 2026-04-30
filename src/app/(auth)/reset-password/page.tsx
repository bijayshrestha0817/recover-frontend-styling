"use client";
import { Button, Container, Paper, PasswordInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "../../../styles/ResetPassword.module.css";

export default function ResetPassword() {
  const form = useForm({
    initialValues: {
      new_password: "",
    },
  });
  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Reset your password?
      </Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <PasswordInput
            label="Password"
            placeholder="Your New password"
            required
            mt="md"
            radius="md"
            {...form.getInputProps("new_password")}
          />

          <Button type="submit" fullWidth mt="xl" radius="md">
            Confirm Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
