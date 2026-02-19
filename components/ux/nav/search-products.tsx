"use client";

import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useState } from "react";

import { UiButton, UiCommand } from "@/components/ui";

export function SearchProducts() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <UiButton.Button
        variant="outline"
        size="icon"
        className="rounded-full border border-primary/10"
        onClick={() => setOpen(true)}
      >
        <MagnifyingGlassIcon />
      </UiButton.Button>
      <UiCommand.CommandDialog open={open} onOpenChange={setOpen}>
        <UiCommand.Command>
          <UiCommand.CommandInput placeholder="Type a command or search..." />
          <UiCommand.CommandList>
            <UiCommand.CommandEmpty>No results found.</UiCommand.CommandEmpty>
            <UiCommand.CommandGroup heading="Suggestions">
              <UiCommand.CommandItem>Television</UiCommand.CommandItem>
              <UiCommand.CommandItem>Washing Machine</UiCommand.CommandItem>
              <UiCommand.CommandItem>Refrigerator</UiCommand.CommandItem>
            </UiCommand.CommandGroup>
          </UiCommand.CommandList>
        </UiCommand.Command>
      </UiCommand.CommandDialog>
    </div>
  );
}
