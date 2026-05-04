"use client";

import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Group,
  Notification,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";
import { AuthService } from "@/features/auth/services/authAPI";
import type { NormalizedApiError } from "@/lib/error";
import classes from "../../../styles/ForgotPassword.module.css";

const { forgotPassword } = AuthService();

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<{
    email: string;
  }>({
    initialValues: {
      email: "",
    },
  });

  const onSubmit = async (values: { email: string }) => {
    setLoading(true);

    try {
      await forgotPassword(values.email);
      toast.success("Reset link sent to your email!");
      form.reset();
    } catch (err: unknown) {
      const error = err as Error & NormalizedApiError;
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Forgot your password?
      </Title>

      <Text c="dimmed" fz="sm" ta="center">
        Enter your email to get a reset link
      </Text>

      {error && (
        <Notification color="red" mt="md">
          {error}
        </Notification>
      )}

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            required
            radius="md"
            {...form.getInputProps("email")}
          />

          <Group justify="space-between" mt="lg">
            <Anchor href="/login" c="dimmed" size="sm">
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>

            <Button type="submit" loading={loading}>
              Reset password
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
