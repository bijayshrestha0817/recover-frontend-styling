import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Course } from "@/types/ICourse";
import { CourseService } from "../services/coursesAPI";

interface EditCourseModalProps {
  opened: boolean;
  close: () => void;
  course: Course | null;
  color?: string;
}

const { UPDATE_COURSE } = CourseService();

export function EditCourseModal({
  opened,
  close,
  course,
  color,
}: EditCourseModalProps) {
  const [name, setName] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (opened && course) {
      setName(course.name);
    }
  }, [opened, course]);

  const mutation = useMutation({
    mutationFn: UPDATE_COURSE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      handleClose();
    },
  });

  const handleClose = () => {
    setName("");
    close();
  };

  const handleUpdate = () => {
    if (!course) return;
    if (!name.trim()) return;

    mutation.mutate({
      id: course.id,
      name: name.trim(),
    });
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Edit Course" centered>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdate();
        }}
      >
        <TextInput
          label="Course Name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit" loading={mutation.isPending} color={color}>
            Update
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
