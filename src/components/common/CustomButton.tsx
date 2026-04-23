type CustomButtonProps = {
  label?: string;
  variant?: "primary" | "secondary";
  styling?: string;
};

export function CustomButton({
  label = "Click me",
  variant = "primary",
  styling,
}: CustomButtonProps) {
  return (
    <div>
      <button
        type="button"
        className={`px-4 py-2  rounded ${
          variant === "primary"
            ? "bg-primary text-white"
            : "bg-gray-300 text-black"
        } ${styling}`}
      >
        {label}
      </button>
    </div>
  );
}
