import { TextInput } from "@mantine/core";
import { useStudentFormContext } from "../hooks/FormContext";

export function EmailInput() {
  const form = useStudentFormContext();
  return (
    <TextInput
      //   label="email"
      placeholder="Email"
      key={form.key("email")}
      {...form.getInputProps("email")}
      type="email"
    />
  );
}
