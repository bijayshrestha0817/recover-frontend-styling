"use client";

import { AuthService } from "@/features/auth/services/authAPI";
import type { NormalizedApiError } from "@/lib/error";
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
  Title
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconArrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import classes from "../../../styles/ForgotPassword.module.css";

const { forgotPassword } = AuthService();

export default function ForgotPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

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
      const res = await forgotPassword(values.email);
      router.push("/")
      toast.success(res.message);
    } catch (err: unknown) {
      const error = err as Error & NormalizedApiError;
      toast.error(error.message);
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
