"use client";

import {
  Avatar,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function Page() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }

  if (!user) return null;

  return (
    <Container size="xs" py="xl">
      <Card shadow="lg" radius="xl" p="lg">
        <Stack align="center" gap="sm">
          <Avatar size={80} radius="xl" color="blue">
            {user.username?.charAt(0).toUpperCase()}
          </Avatar>

          <Title order={3}>{user.username}</Title>

          <Text c="dimmed" size="sm">
            {user.email}
          </Text>
        </Stack>

        <Divider my="lg" />

        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Username
            </Text>
            <Text size="sm" fw={500}>
              {user.username}
            </Text>
          </Group>

          <Group justify="space-between">
            <Text size="sm" c="dimmed">
              Email
            </Text>
            <Text size="sm" fw={500}>
              {user.email ? user.email : `N/A`}
            </Text>
          </Group>
        </Stack>

        <Divider my="lg" />

        <Button color="red" fullWidth radius="md" onClick={logout}>
          Logout
        </Button>
      </Card>
    </Container>
  );
}
