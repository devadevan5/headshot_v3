// components/ui/Select.jsx - Shadcn style Select
import React, { useState } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "../../utils/cn";
import Button from "./Button";
import Input from "./Input";

/**
 * @typedef {object} SelectOption
 * @property {string | number} value - The value of the option.
 * @property {string} label - The label of the option.
 * @property {boolean} [disabled] - Whether the option is disabled.
 * @property {string} [description] - A description for the option.
 */

/**
 * A customizable select component that supports single and multiple selections, searching, clearing, and loading states.
 * @param {object} props - The properties for the component.
 * @param {string} [props.className] - Additional CSS classes for the select component.
 * @param {SelectOption[]} [props.options=[]] - The options for the select component.
 * @param {string | number | string[] | number[]} props.value - The value of the select component.
 * @param {string | number} [props.defaultValue] - The default value of the select component.
 * @param {string} [props.placeholder="Select an option"] - The placeholder text for the select component.
 * @param {boolean} [props.multiple=false] - Whether to allow multiple selections.
 * @param {boolean} [props.disabled=false] - Whether the select component is disabled.
 * @param {boolean} [props.required=false] - Whether the select component is required.
 * @param {string} [props.label] - The label for the select component.
 * @param {string} [props.description] - The description for the select component.
 * @param {string} [props.error] - An error message to display.
 * @param {boolean} [props.searchable=false] - Whether to allow searching through the options.
 * @param {boolean} [props.clearable=false] - Whether to show a clear button.
 * @param {boolean} [props.loading=false] - Whether the select component is in a loading state.
 * @param {string} [props.id] - The ID of the select component.
 * @param {string} [props.name] - The name of the select component.
 * @param {function} props.onChange - A function to be called when the value changes.
 * @param {function} [props.onOpenChange] - A function to be called when the dropdown is opened or closed.
 * @param {React.Ref} ref - The ref for the select component.
 * @returns {JSX.Element} The rendered select component.
 */
const Select = React.forwardRef(({
    className,
    options = [],
    value,
    defaultValue,
    placeholder = "Select an option",
    multiple = false,
    disabled = false,
    required = false,
    label,
    description,
    error,
    searchable = false,
    clearable = false,
    loading = false,
    id,
    name,
    onChange,
    onOpenChange,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectId = id || `select-${Math.random()?.toString(36)?.substr(2, 9)}`;

    const filteredOptions = searchable && searchTerm
        ? options?.filter(option =>
            option?.label?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            (option?.value && option?.value?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase()))
        )
        : options;

    /**
     * Returns the display text for the selected option(s).
     * @returns {string} The display text.
     */
    const getSelectedDisplay = () => {
        if (!value) return placeholder;

        if (multiple) {
            const selectedOptions = options?.filter(opt => value?.includes(opt?.value));
            if (selectedOptions?.length === 0) return placeholder;
            if (selectedOptions?.length === 1) return selectedOptions?.[0]?.label;
            return `${selectedOptions?.length} items selected`;
        }

        const selectedOption = options?.find(opt => opt?.value === value);
        return selectedOption ? selectedOption?.label : placeholder;
    };

    /**
     * Toggles the dropdown open or closed.
     */
    const handleToggle = () => {
        if (!disabled) {
            const newIsOpen = !isOpen;
            setIsOpen(newIsOpen);
            onOpenChange?.(newIsOpen);
            if (!newIsOpen) {
                setSearchTerm("");
            }
        }
    };

    /**
     * Handles the selection of an option.
     * @param {SelectOption} option - The selected option.
     */
    const handleOptionSelect = (option) => {
        if (multiple) {
            const newValue = value || [];
            const updatedValue = newValue?.includes(option?.value)
                ? newValue?.filter(v => v !== option?.value)
                : [...newValue, option?.value];
            onChange?.(updatedValue);
        } else {
            onChange?.(option?.value);
            setIsOpen(false);
            onOpenChange?.(false);
        }
    };

    /**
     * Clears the selected value.
     * @param {React.MouseEvent} e - The mouse event.
     */
    const handleClear = (e) => {
        e?.stopPropagation();
        onChange?.(multiple ? [] : '');
    };

    /**
     * Handles the change event for the search input.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
     */
    const handleSearchChange = (e) => {
        setSearchTerm(e?.target?.value);
    };

    /**
     * Checks if an option is selected.
     * @param {string | number} optionValue - The value of the option to check.
     * @returns {boolean} Whether the option is selected.
     */
    const isSelected = (optionValue) => {
        if (multiple) {
            return value?.includes(optionValue) || false;
        }
        return value === optionValue;
    };

    const hasValue = multiple ? value?.length > 0 : value !== undefined && value !== '';

    return (
        <div className={cn("relative", className)}>
            {label && (
                <label
                    htmlFor={selectId}
                    className={cn(
                        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block",
                        error ? "text-destructive" : "text-foreground"
                    )}
                >
                    {label}
                    {required && <span className="text-destructive ml-1">*</span>}
                </label>
            )}
            <div className="relative">
                <button
                    ref={ref}
                    id={selectId}
                    type="button"
                    className={cn(
                        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-white text-black px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                        error && "border-destructive focus:ring-destructive",
                        !hasValue && "text-muted-foreground"
                    )}
                    onClick={handleToggle}
                    disabled={disabled}
                    aria-expanded={isOpen}
                    aria-haspopup="listbox"
                    {...props}
                >
                    <span className="truncate">{getSelectedDisplay()}</span>

                    <div className="flex items-center gap-1">
                        {loading && (
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        )}

                        {clearable && hasValue && !loading && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4"
                                onClick={handleClear}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        )}

                        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                    </div>
                </button>

                <select
                    name={name}
                    value={value || ''}
                    onChange={() => { }}
                    className="sr-only"
                    tabIndex={-1}
                    multiple={multiple}
                    required={required}
                >
                    <option value="">Select...</option>
                    {options?.map(option => (
                        <option key={option?.value} value={option?.value}>
                            {option?.label}
                        </option>
                    ))}
                </select>

                {isOpen && (
                    <div className="absolute z-50 w-full mt-1 bg-white text-black border border-border rounded-md shadow-md">
                        {searchable && (
                            <div className="p-2 border-b">
                                <div className="relative">
                                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search options..."
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        className="pl-8"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="py-1 max-h-60 overflow-auto">
                            {filteredOptions?.length === 0 ? (
                                <div className="px-3 py-2 text-sm text-muted-foreground">
                                    {searchTerm ? 'No options found' : 'No options available'}
                                </div>
                            ) : (
                                filteredOptions?.map((option) => (
                                    <div
                                        key={option?.value}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                            isSelected(option?.value) && "bg-primary text-primary-foreground",
                                            option?.disabled && "pointer-events-none opacity-50"
                                        )}
                                        onClick={() => !option?.disabled && handleOptionSelect(option)}
                                    >
                                        <span className="flex-1">{option?.label}</span>
                                        {multiple && isSelected(option?.value) && (
                                            <Check className="h-4 w-4" />
                                        )}
                                        {option?.description && (
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {option?.description}
                                            </span>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}
            </div>
            {description && !error && (
                <p className="text-sm text-muted-foreground mt-1">
                    {description}
                </p>
            )}
            {error && (
                <p className="text-sm text-destructive mt-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;