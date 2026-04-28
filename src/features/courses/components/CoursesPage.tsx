import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { CourseService } from "../services/coursesAPI";
import CoursesPageClient from "./CoursesPageClient";

const { GET_COURSES } = CourseService();
export default async function CoursesPage() {
  const queryClient = new QueryClient();

  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: ["courses", page],
    queryFn: () => GET_COURSES(page),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CoursesPageClient />
    </HydrationBoundary>
  );
}
