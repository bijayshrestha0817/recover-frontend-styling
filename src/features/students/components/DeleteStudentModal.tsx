import { Button, Group, Modal, Text } from "@mantine/core";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Student } from "@/types/IStudent";
import { StudentService } from "../services/studentAPI";

const { DELETE_STUDENT } = StudentService();

interface DeleteStudentModalProps {
  opened: boolean;
  close: () => void;
  student: Student | null;
  color?: string;
}

const DeleteStudentModal = ({
  opened,
  close,
  student,
  color,
}: DeleteStudentModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: DELETE_STUDENT,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["students"] });
      close();
    },
  });

  const handleDelete = () => {
    if (!student) return;

    mutation.mutate({
      id: student.id,
    });
  };

  return (
    <Modal opened={opened} onClose={close} title="Delete Student" centered>
      <Text>
        Are you sure you want to delete <strong>{student?.name}</strong>?
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

export default DeleteStudentModal;
