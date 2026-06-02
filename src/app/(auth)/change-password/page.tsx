"use client";
import { Button, Container, Paper, PasswordInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AuthService } from "@/features/auth/services/authAPI";
import type { NormalizedApiError } from "@/lib/error";
import classes from "../../../styles/ResetPassword.module.css";

const { changePassword } = AuthService();
export default function ChangePassword() {
  const [loading, setLoading] = useState(false);

  const { logout } = useAuth();
  const form = useForm({
    initialValues: {
      current_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);

    try {
      const res = await changePassword(
        values.current_password,
        values.new_password,
      );
      toast.success(res.message);
      logout();
    } catch (err: unknown) {
      const error = err as Error & NormalizedApiError;
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Change your password?
      </Title>

      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            label="Current"
            placeholder="Your Current password"
            required
            mt="md"
            radius="md"
            {...form.getInputProps("current_password")}
          />

          <PasswordInput
            label="Password"
            placeholder="Your New password"
            required
            mt="md"
            radius="md"
            {...form.getInputProps("new_password")}
          />

          <Button type="submit" fullWidth mt="xl" radius="md" loading={loading}>
            Confirm Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
