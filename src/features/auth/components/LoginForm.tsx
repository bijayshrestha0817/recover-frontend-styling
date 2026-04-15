"use client";

import { AuthService } from "@/features/auth/services/authAPI";
import {
  Anchor,
  Button,
  Checkbox,
  Container,
  Group,
  Notification,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import classes from "../../../styles/AuthenticationTitle.module.css";

const { login } = AuthService();

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      const data = await login(values.username, values.password).json<{
        access: string;
        refresh: string;
      }>();

      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center">Welcome back!</Title>

      <Text className={classes.subtitle}>
        Do not have an account yet?{" "}
        <Anchor component={Link} href="/register">
          Create account
        </Anchor>
      </Text>

      {error && (
        <Notification color="red" mt="md">
          {error}
        </Notification>
      )}

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="username"
            required
            radius="md"
            {...form.getInputProps("username")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            required
            mt="md"
            radius="md"
            {...form.getInputProps("password")}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>

          <Button type="submit" fullWidth mt="xl" radius="md" loading={loading}>
            Sign in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;
