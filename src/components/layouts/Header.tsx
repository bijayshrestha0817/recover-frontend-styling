"use client";

import {
  Burger,
  Center,
  Container,
  Divider,
  Drawer,
  Group,
  Menu,
  ScrollArea,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { MantineLogo } from "@mantinex/mantine-logo";
import { IconChevronDown } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useAuth } from "@/features/auth/context/AuthContext";
import type { LinkItem } from "@/types/IHeader";
import classes from "../../styles/Header.module.css";

const baseLinks: LinkItem[] = [
  { link: "/students", label: "Students" },
  { link: "/courses", label: "Courses" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
    close();
  };

  const items = (
    <>
      {baseLinks.map((link) => (
        <Link key={link.label} href={link.link} className={classes.link}>
          {link.label}
        </Link>
      ))}

      {!user ? (
        <Link href="/login" className={classes.link}>
          Login
        </Link>
      ) : (
        <Menu shadow="md" width={180} position="bottom-end" withArrow>
          <Link href="/dashboard" className={classes.link}>
            Dashboard
          </Link>

          <Menu.Target>
            <UnstyledButton className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{user.username}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item>
              <Link href="/profile" className={classes.link}>
                Profile
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link href="/change-password" className={classes.link}>
                Change Password
              </Link>
            </Menu.Item>

            <Menu.Item color="red" onClick={handleLogout}>
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      )}
    </>
  );

  return (
    <header className={classes.header}>
      <Container size="md">
        <div className={classes.inner}>
          <Link href="/">
            <MantineLogo size={28} />
          </Link>
          <Group gap={5} visibleFrom="sm">
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            aria-label="Toggle navigation"
          />
        </div>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />

          {baseLinks.map((link) => (
            <Link
              key={link.label}
              href={link.link}
              className={classes.link}
              onClick={close}
            >
              {link.label}
            </Link>
          ))}

          <Divider my="sm" />

          {!user ? (
            <Link href="/login" className={classes.link} onClick={close}>
              Login
            </Link>
          ) : (
            <>
              <Link href="/profile" className={classes.link} onClick={close}>
                Profile
              </Link>

              <UnstyledButton
                onClick={handleLogout}
                className={classes.link}
                style={{ color: "red", width: "100%", textAlign: "left" }}
              >
                Logout
              </UnstyledButton>
            </>
          )}
        </ScrollArea>
      </Drawer>
    </header>
  );
}
