import { TextInput } from "@mantine/core";
import { useCourseFormContext } from "../hooks/FormContext";

export function NameInput() {
  const form = useCourseFormContext();
  return (
    <TextInput
      // label="Name"
      placeholder="Name"
      key={form.key("name")}
      {...form.getInputProps("name")}
    />
  );
}
