"use client";

import { AuthService } from "@/features/auth/services/authAPI";
import {
  Button,
  Container,
  Group,
  Notification,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const { register } = AuthService();

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 6 ? "Password must have at least 6 characters" : null,
    },
  });

  const router = useRouter();
  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      await register(values.email, values.username, values.password);
      toast.success("Registration successful! Please log in.",);
      router.push("/login");
    } catch (err) {
      console.error(err);

      if (err instanceof Response) {
        const data = await err.json();
        const errorMessages = Object.values(data).flat().join(" ");
        setError(errorMessages);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <Title>Create a new account</Title>

      {error && (
        <Notification color="red" mt="md">
          {error}
        </Notification>
      )}

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            label="Username"
            placeholder="Your username"
            {...form.getInputProps("username")}
            required
          />

          <TextInput
            label="Email"
            placeholder="Your email"
            mt="md"
            {...form.getInputProps("email")}
            required
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
            required
          />

          <Group mt="xl">
            <Button type="submit" fullWidth loading={loading}>
              Register
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
}
