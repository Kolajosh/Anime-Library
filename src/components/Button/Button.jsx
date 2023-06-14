import Preloader from "../mics/Preloader";

export const Button = ({
  labelText,
  variant = "font-normal text-xs",
  containerVariant = "w-32 h-10 rounded-md flex justify-center",
  buttonVariant = "primary",
  isDisabled = false,
  isLoading = false,
  icon,
}) => {
  return (
    <button
      type="submit"
      className={`${variant} shadow-md ${
        isDisabled
          ? `${
              buttonVariant === "primary" &&
              `bg-cyan-300 text-cyan-400 cursor-not-allowed py-3`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-cyan-400 text-cyan-400 cursor-not-allowed py-3`
            }`
          : `${
              buttonVariant === "primary" &&
              `bg-cyan-500 hover:bg-cyan-600 text-white py-3 cursor-pointer`
            } ${
              buttonVariant === "secondary" &&
              `border-[1.5px] border-cyan-500 text-cyan-500  py-3 cursor-pointer`
            }`
      } 
      } ${containerVariant}`}
      disabled={isDisabled}
    >
      <div className="flex items-center">
        {icon?.active && (
          <div className={`${icon.variant}`}>{icon.preview}</div>
        )}
        {isLoading ? <Preloader variant="w-6 h-6" /> : labelText}
      </div>
    </button>
  );
};
