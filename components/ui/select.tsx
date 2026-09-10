'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Public types ─────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id?: string;
  name?: string;
  placeholder: string;
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string | null) => void;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Select({
  id,
  name,
  placeholder,
  options,
  value,
  onValueChange,
  className,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      value={value ?? null}
      onValueChange={onValueChange}
      name={name}
    >
      <SelectPrimitive.Trigger
        id={id}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        className={cn(
          'flex h-12 w-full items-center justify-between rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground shadow-none transition-colors',
          'placeholder:text-muted-foreground',
          'hover:border-gold/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-1',
          'data-[open]:border-gold data-[open]:ring-2 data-[open]:ring-gold/30',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
      >
        <SelectPrimitive.Value
          placeholder={
            <span className="text-muted-foreground">{placeholder}</span>
          }
        />
        <SelectPrimitive.Icon className="shrink-0 text-muted-foreground transition-transform duration-200 data-[open]:rotate-180">
          <ChevronDown className="size-4" aria-hidden="true" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={4} className="z-50">
          <SelectPrimitive.Popup
            className={cn(
              'min-w-[var(--anchor-width)] overflow-hidden rounded-xl border border-border bg-white shadow-lg',
              'origin-[var(--transform-origin)]',
              'data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95',
              'data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95',
            )}
          >
            <SelectPrimitive.List className="p-1">
              {options.map((opt) => (
                <SelectPrimitive.Item
                  key={opt.value}
                  value={opt.value}
                  className={cn(
                    'relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 pr-9 text-sm text-foreground outline-none',
                    'data-[highlighted]:bg-secondary/30 data-[highlighted]:text-foreground',
                    'data-[selected]:font-medium data-[selected]:text-gold',
                    'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                  )}
                >
                  <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-3">
                    <Check className="size-4 text-gold" aria-hidden="true" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
