import PaginationComponent from "@/components/common/Pagination";
import { TableSort } from "@/components/common/TableSort";

export default function StudentsPage() {
  return (
    <>
      <TableSort />

      <div className="fixed bottom-8">
        <PaginationComponent />
      </div>
    </>
  );
}
