import { useCourseFormContext } from "@/features/courses/hooks/FormContext";
import { TextInput } from "@mantine/core";

export function NameInput() {
  const form = useCourseFormContext();
  return (
    <TextInput
      label="Name"
      key={form.key("name")}
      {...form.getInputProps("name")}
    />
  );
}
