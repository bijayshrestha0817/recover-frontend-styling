"use client";
import {
  Button,
  Container,
  Notification,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { AuthService } from "@/features/auth/services/authAPI";
import classes from "../../../styles/ResetPassword.module.css";

const { changePassword } = AuthService();
export default function ChangePassword() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm({
    initialValues: {
      current_password: "",
      new_password: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);
    try {
      await changePassword(values.current_password, values.new_password);
      toast.success("Password changed successfully!");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Invalid password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} ta="center">
        Change your password?
      </Title>

      {error && (
        <Notification color="red" mt="md">
          {error}
        </Notification>
      )}
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
