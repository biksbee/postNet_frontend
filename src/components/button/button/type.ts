export type ButtonType = "default" | "disabled" | "hover" | "pressed";

export const buttonStyle: Record<ButtonType, string> = {
    default: "opacity-80",
    disabled: "opacity-50",
    hover: "hover:opacity-1",
    pressed: "active:opacity-70"
}