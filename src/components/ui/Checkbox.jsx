import React from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "../../utils/cn";

/**
 * @typedef {"sm" | "default" | "lg"} CheckboxSize
 */

/**
 * A customizable checkbox component with support for labels, descriptions, and error messages.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional CSS classes for the checkbox.
 * @param {string} [props.id] - The ID of the checkbox.
 * @param {boolean} props.checked - Whether the checkbox is checked.
 * @param {boolean} [props.indeterminate=false] - Whether the checkbox is in an indeterminate state.
 * @param {boolean} [props.disabled=false] - Whether the checkbox is disabled.
 * @param {boolean} [props.required=false] - Whether the checkbox is required.
 * @param {string} [props.label] - The label for the checkbox.
 * @param {string} [props.description] - The description for the checkbox.
 * @param {string} [props.error] - An error message to display.
 * @param {CheckboxSize} [props.size="default"] - The size of the checkbox.
 * @param {React.Ref} ref - The ref for the checkbox component.
 * @returns {JSX.Element} The rendered checkbox component.
 */
const Checkbox = React.forwardRef(({
    className,
    id,
    checked,
    indeterminate = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    size = "default",
    ...props
}, ref) => {
    const checkboxId = id || `checkbox-${Math.random()?.toString(36)?.substr(2, 9)}`;

    const sizeClasses = {
        sm: "h-4 w-4",
        default: "h-4 w-4",
        lg: "h-5 w-5"
    };

    return (
        <div className={cn("flex items-start space-x-2", className)}>
            <div className="relative flex items-center">
                <input
                    type="checkbox"
                    ref={ref}
                    id={checkboxId}
                    checked={checked}
                    disabled={disabled}
                    required={required}
                    className="sr-only"
                    {...props}
                />

                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "peer shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground cursor-pointer transition-colors",
                        sizeClasses?.[size],
                        checked && "bg-primary text-primary-foreground border-primary",
                        indeterminate && "bg-primary text-primary-foreground border-primary",
                        error && "border-destructive",
                        disabled && "cursor-not-allowed opacity-50"
                    )}
                >
                    {checked && !indeterminate && (
                        <Check className="h-3 w-3 text-current flex items-center justify-center" />
                    )}
                    {indeterminate && (
                        <Minus className="h-3 w-3 text-current flex items-center justify-center" />
                    )}
                </label>
            </div>
            {(label || description || error) && (
                <div className="flex-1 space-y-1">
                    {label && (
                        <label
                            htmlFor={checkboxId}
                            className={cn(
                                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer",
                                error ? "text-destructive" : "text-foreground"
                            )}
                        >
                            {label}
                            {required && <span className="text-destructive ml-1">*</span>}
                        </label>
                    )}

                    {description && !error && (
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    )}

                    {error && (
                        <p className="text-sm text-destructive">
                            {error}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
});

Checkbox.displayName = "Checkbox";

/**
 * A wrapper component for a group of checkboxes.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional CSS classes for the checkbox group.
 * @param {React.ReactNode} props.children - The checkboxes to be included in the group.
 * @param {string} [props.label] - The label for the checkbox group.
 * @param {string} [props.description] - The description for the checkbox group.
 * @param {string} [props.error] - An error message to display for the checkbox group.
 * @param {boolean} [props.required=false] - Whether the checkbox group is required.
 * @param {boolean} [props.disabled=false] - Whether the checkbox group is disabled.
 * @param {React.Ref} ref - The ref for the checkbox group component.
 * @returns {JSX.Element} The rendered checkbox group component.
 */
const CheckboxGroup = React.forwardRef(({
    className,
    children,
    label,
    description,
    error,
    required = false,
    disabled = false,
    ...props
}, ref) => {
    return (
        <fieldset
            ref={ref}
            disabled={disabled}
            className={cn("space-y-3", className)}
            {...props}
        >
            {label && (
                <legend className={cn(
                    "text-sm font-medium",
                    error ? "text-destructive" : "text-foreground"
                )}>
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </legend>
            )}

            {description && !error && (
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            )}

            <div className="space-y-2">
                {children}
            </div>

            {error && (
                <p className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </fieldset>
    );
});

CheckboxGroup.displayName = "CheckboxGroup";

export { Checkbox, CheckboxGroup };