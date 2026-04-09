import { Button } from "@mantine/core";

export function CustomButton() {
  return (
    <div>
      <button
        type="button"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
      >
        Click me
      </button>
      <Button className=" px-20 bg-amber-500 dark:bg-pink-600">Crazy</Button>
    </div>
  );
}
