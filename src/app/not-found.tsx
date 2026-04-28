"use client";
import { Button, Container, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <Container style={{ paddingTop: "80px", paddingBottom: "80px" }}>
      <Stack align="center" gap="md">
        <Title order={1} style={{ fontSize: "3rem", fontWeight: 900 }}>
          404
        </Title>

        <Title order={2} ta="center">
          You've found a secret place.
        </Title>

        <Text c="dimmed" size="lg" ta="center" maw={500}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>

        <Group justify="center">
          <Button component={Link} href="/" variant="subtle" size="md">
            Take me back to home page
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
