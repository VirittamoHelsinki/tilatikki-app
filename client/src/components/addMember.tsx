import React, { useRef, useState } from 'react'
import { Command as CommandPrimitive } from "cmdk";
import { Badge } from "~/@/components/ui/badge";
import { X } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandItem,
} from "~/@/components/ui/command";
import { FilterOption, filterOptions } from '~/utils/filterOptions';

const AddMember: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedValues, setSelectedValues] = useState<FilterOption[]>([]);
  return (
    <Command className="overflow-visible bg-transparent">
      <div className="group rounded-md border border-dashed border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedValues.map((option) => (
            <Badge key={option.value}>
              {option.label}
              <button
                className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onClick={() =>
                  setSelectedValues((prev) =>
                    prev.filter((s) => s.value !== option.value),
                  )
                }
              >
                <X className="ml-1 size-[10px]" />
              </button>
            </Badge>
          ))}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder="Lisaa jasen..."
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open &&
          filterOptions.filter((option) => !selectedValues?.includes(option)).length >
          0 ? (
          <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {filterOptions
                .filter((option) => !selectedValues?.includes(option))
                .map((member) => (
                  <CommandItem
                    key={member.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelectedValues((prev) => [...prev, member]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {member.label}
                  </CommandItem>
                ))}
            </CommandGroup>
          </div>
        ) : null}
      </div>
    </Command>
  );
}

export default AddMember
