"use client";
import {
  Burger,
  Center,
  Collapse,
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
import type { LinkItem } from "@/types/IHeader";
import classes from "../../styles/Header.module.css";

const links: LinkItem[] = [
  { link: "/students", label: "Students" },
  { link: "/courses", label: "Courses" },
  { link: "/login", label: "Auth" },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const items = links.map((link) => {
    const menuItems = link?.links?.map((item) => (
      <Menu.Item key={item.link}>
        <Link href={item.link} className={classes.link}>
          {item.label}
        </Link>
      </Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu
          key={link.label}
          trigger="hover"
          transitionProps={{ exitDuration: 0 }}
          withinPortal
        >
          <Menu.Target>
            <Link href={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size={14} stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <Link key={link.label} href={link.link} className={classes.link}>
        {link.label}
      </Link>
    );
  });

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
          {links.map((link) => {
            if (link.links) {
              return <DrawerLinksGroup key={link.label} link={link} />;
            }

            return (
              <Link key={link.label} href={link.link} className={classes.link}>
                {link.label}
              </Link>
            );
          })}
        </ScrollArea>
      </Drawer>
    </header>
  );
}

function DrawerLinksGroup({
  link,
}: {
  link: {
    link: string;
    label: string;
    links?: { link: string; label: string }[];
  };
}) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      <UnstyledButton className={classes.link} onClick={toggle}>
        <Center inline>
          <span className={classes.linkLabel}>{link.label}</span>
          <IconChevronDown size={14} stroke={1.5} />
        </Center>
      </UnstyledButton>
      <Collapse expanded={opened}>
        {link.links?.map((subLink) => (
          <Link
            key={subLink.link}
            href={subLink.link}
            className={classes.subLink}
          >
            {subLink.label}
          </Link>
        ))}
      </Collapse>
    </>
  );
}
