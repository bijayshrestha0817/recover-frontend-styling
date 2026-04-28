import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { StudentService } from "../services/studentAPI"
import StudentsPageClient from "./StudentsPageClient"

const {GET_STUDENTS} = StudentService()
export default async function StudentsPage() {
  const queryClient = new QueryClient()

  const page =1

  await queryClient.prefetchQuery({
    queryKey:["students", page],
    queryFn:()=>GET_STUDENTS(page)
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StudentsPageClient/>
    </HydrationBoundary>
  )
}
