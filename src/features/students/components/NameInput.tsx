import { TextInput } from "@mantine/core";
import { useStudentFormContext } from "../hooks/FormContext";

export function NameInput() {
  const form = useStudentFormContext();
  return (
    <TextInput
      // label="Name"
      placeholder="Name"
      key={form.key("name")}
      {...form.getInputProps("name")}
    />
  );
}
