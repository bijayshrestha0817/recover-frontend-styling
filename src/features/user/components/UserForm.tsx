// // UserForm.tsx
// "use client";
// import { Button, Group, NumberInput } from "@mantine/core";
// import { UserFormProvider, useUserForm } from "@/hooks/FormContext";
// import { NameInput } from "./NameInput";

// export default function UserForm() {
//   const form = useUserForm({
//     mode: "uncontrolled",
//     initialValues: {
//       age: 0,
//       name: "",
//     },
//   });

//   return (
//     <UserFormProvider form={form}>
//       <form
//         onSubmit={form.onSubmit(() => {
//           console.log(form.values);
//         })}
//       >
//         <NumberInput
//           label="Age"
//           key={form.key("age")}
//           {...form.getInputProps("age")}
//         />
//         <NameInput />

//         <Group justify="flex-end" mt="md">
//           <Button type="submit">Submit</Button>
//         </Group>
//       </form>
//     </UserFormProvider>
//   );
// }
