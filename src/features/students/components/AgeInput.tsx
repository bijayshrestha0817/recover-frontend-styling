import { TextInput } from "@mantine/core";
import { useStudentFormContext } from "../hooks/FormContext";

export function AgeInput() {
  const form = useStudentFormContext();
  return (
    <TextInput
      label="Age"
      placeholder="Age"
      key={form.key("age")}
      {...form.getInputProps("age")}
      type="number"
    />
  );
}
