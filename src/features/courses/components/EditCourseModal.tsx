import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Course } from "@/types/ICourse";
import { CourseService } from "../services/coursesAPI";

interface EditCourseModalProps {
  opened: boolean;
  close: () => void;
  course: Course | null;
}

const { UPDATE_COURSE } = CourseService();

export function EditCourseModal({
  opened,
  close,
  course,
}: EditCourseModalProps) {
  const [name, setName] = useState<string>("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (course) {
      setName(course.name);
    }
  }, [course]);

  const mutation = useMutation({
    mutationFn: UPDATE_COURSE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      close();
    },
  });

  const handleUpdate = () => {
    if (!course) return;

    mutation.mutate({
      id: course.id,
      name,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Edit Course" centered>
      <TextInput
        label="Course Name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
      />

      <Group justify="flex-end">
        <Button mt="md" onClick={handleUpdate} loading={mutation.isPending}>
          Update
        </Button>
      </Group>
    </Modal>
  );
}
