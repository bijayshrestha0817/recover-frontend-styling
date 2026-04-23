import { Button, Group, Modal, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Course } from "@/types/ICourse";
import { CourseService } from "../services/coursesAPI";

const { DELETE_COURSE } = CourseService();

interface DeleteCourseModalProps {
  opened: boolean;
  close: () => void;
  course: Course | null;
  color?: string;
}

const DeleteCourseModal = ({
  opened,
  close,
  course,
  color,
}: DeleteCourseModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DELETE_COURSE,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      toast.success(`Course "${course?.name}" deleted successfully!`);
      close();
    },
  });

  const handleDelete = () => {
    if (!course) return;

    mutation.mutate({
      id: course.id,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Delete Course" centered>
      <Text>
        Are you sure you want to delete <strong>{course?.name}</strong>?
      </Text>

      <Group justify="flex-end">
        <Button
          type="submit"
          color={color}
          mt="md"
          onClick={handleDelete}
          loading={mutation.isPending}
        >
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteCourseModal;
