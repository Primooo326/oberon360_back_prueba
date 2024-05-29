interface CustomButton {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success",
    size?: "sm" | "md" | "lg",
    outline?: boolean,
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
    block?: boolean,
    iconPosition?: "left" | "right",
    loader?: boolean,
    icon?: string | null,
    className?: string
}

interface CustomBadge {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success",
    size?: "sm" | "md" | "lg",
    outline?: boolean,
    iconPosition?: "left" | "right",
    icon?: string | null,
    className?: string
}

interface CustomAvatar {
    color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success",
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
    status?: "online" | "offline",
    rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full",
    className?: string,
    label?: {
        text: string,
        color?: "primary" | "secondary" | "accent" | "neutral" | "warning" | "error" | "success",
        size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl",
        className?: string,
    }
}

interface CustomCellButtonProps {
    options: CustomButton,
    disabled: boolean,
    children: string
    [key: string]: any
}

interface CustomCellBadgeProps {
    options: CustomBadge,
    children: string
    [key: string]: any
}

interface CustomCellAvatarProps {
    src: string,
    options: CustomAvatar
    [key: string]: any
}

interface CustomCellProps {
    selector: string,
    sortable: boolean,
    children?: string,
    [key: string]: any
}

export interface IHeaderCustomTable {
    type: "button" | "badge" | "avatar" | "cell",
    name: string,
    props: CustomCellProps | CustomCellButtonProps | CustomCellBadgeProps | CustomCellAvatarProps,
}