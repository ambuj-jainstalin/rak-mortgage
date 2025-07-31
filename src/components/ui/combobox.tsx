import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface ComboboxProps {
  options: { value: string; label: string }[]
  value?: string
  onValueChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = "Type to search...",
  className,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState(value || "")

  React.useEffect(() => {
    setInputValue(value || "")
  }, [value])

  const filteredOptions = React.useMemo(() => {
    if (inputValue.length < 3) return []
    return options.filter(option =>
      option.label.toLowerCase().includes(inputValue.toLowerCase())
    )
  }, [options, inputValue])

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    onValueChange(newValue)
    setOpen(newValue.length >= 3 && filteredOptions.length > 0)
  }

  const handleSelectOption = (optionLabel: string) => {
    setInputValue(optionLabel)
    onValueChange(optionLabel)
    setOpen(false)
  }

  return (
    <div className="relative">
      <Input
        value={inputValue}
        onChange={(e) => handleInputChange(e.target.value)}
        placeholder={placeholder}
        className={className}
        onFocus={() => {
          if (inputValue.length >= 3 && filteredOptions.length > 0) {
            setOpen(true)
          }
        }}
        onBlur={(e) => {
          // Delay closing to allow clicking on options
          setTimeout(() => {
            if (!e.currentTarget.contains(document.activeElement)) {
              setOpen(false)
            }
          }, 150)
        }}
      />
      {open && filteredOptions.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover border border-border rounded-md shadow-md max-h-60 overflow-auto">
          <Command>
            <CommandList>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelectOption(option.label)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        inputValue === option.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  )
}