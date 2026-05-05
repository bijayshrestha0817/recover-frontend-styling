"use client";

import { AuthService } from "@/features/auth/services/authAPI";
import type { NormalizedApiError } from "@/lib/error";
import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import classes from "../../../styles/ResetPassword.module.css";

const { forgotPasswordConfirm } = AuthService();

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const uid = searchParams.get("uid");
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      new_password: "",
    },
  });

  const onSubmit = async (values: typeof form.values) => {
    setLoading(true);

    try {
      if (!uid || !token) {
        toast.error("Invalid or reset link");
        return;
      }

      const res = await forgotPasswordConfirm(uid, token, values.new_password);

      toast.success(res.message);

      router.push("/login");
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
        Reset your password?
      </Title>


      <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
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
};
export default ResetPassword;
