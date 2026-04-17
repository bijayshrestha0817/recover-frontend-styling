import { createFormContext } from "@mantine/form";

interface UserFormValues {
  age: number;
  name: string;
}

export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();
