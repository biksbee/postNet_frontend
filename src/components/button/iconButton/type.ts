export type ButtonType = 'update' | 'delete' | 'favorite'

export const buttonStateType: Record<ButtonType, string> = {
    update: "bg-[#ff0] text-black hover:text-[#f00]",
    favorite: "bg-[#00BF00] text-black hover:text-white",
    delete: "bg-[#f00] text-black hover:text-white"
}