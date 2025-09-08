// Example: A button component that uses the primary color
const Button = ({ children }) => {
  return (
    <button className="bg-[var(--color-primary)] text-[var(--color-primary-foreground)] px-4 py-2 rounded-lg font-medium">
      {children}
    </button>
  );
};
export default Button;
