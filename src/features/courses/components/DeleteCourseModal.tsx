import type { Course } from "@/types/ICourse";
import { CourseService } from "../services/coursesAPI";

const { DELETE_COURSE } = CourseService();

interface DeleteCourseModalProps {
  opened: boolean;
  close: () => void;
  course: Course | null;
}

const DeleteCourseModal = ({
  opened,
  close,
  course,
}: DeleteCourseModalProps) => {
  return <div>DeleteCourseModal</div>;
};

export default DeleteCourseModal;
