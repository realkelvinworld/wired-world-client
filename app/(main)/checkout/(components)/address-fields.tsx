"use client";

import { Control, Controller } from "react-hook-form";

import { UiField, UiInput } from "@/components/ui";

interface AddressFieldsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

export default function AddressFields({ control }: AddressFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Controller
          name="street_address"
          control={control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="street_address">
                Street address <span className="text-destructive">*</span>
              </UiField.FieldLabel>
              <UiInput.Input
                {...field}
                id="street_address"
                placeholder="123 Main Street"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.error && (
                <UiField.FieldError>
                  {fieldState.error.message}
                </UiField.FieldError>
              )}
            </UiField.Field>
          )}
        />
      </div>

      <div className="sm:col-span-2">
        <Controller
          name="apartment"
          control={control}
          render={({ field, fieldState }) => (
            <UiField.Field data-invalid={fieldState.invalid}>
              <UiField.FieldLabel htmlFor="apartment">
                Apartment / Suite{" "}
                <span className="text-muted-foreground text-xs">
                  (optional)
                </span>
              </UiField.FieldLabel>
              <UiInput.Input
                {...field}
                id="apartment"
                placeholder="Apt 4B"
                aria-invalid={fieldState.invalid}
              />
            </UiField.Field>
          )}
        />
      </div>

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <UiField.Field data-invalid={fieldState.invalid}>
            <UiField.FieldLabel htmlFor="city">
              City <span className="text-destructive">*</span>
            </UiField.FieldLabel>
            <UiInput.Input
              {...field}
              id="city"
              placeholder="Accra"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <UiField.FieldError>
                {fieldState.error.message}
              </UiField.FieldError>
            )}
          </UiField.Field>
        )}
      />

      <Controller
        name="region"
        control={control}
        render={({ field, fieldState }) => (
          <UiField.Field data-invalid={fieldState.invalid}>
            <UiField.FieldLabel htmlFor="region">
              Region <span className="text-destructive">*</span>
            </UiField.FieldLabel>
            <UiInput.Input
              {...field}
              id="region"
              placeholder="Greater Accra"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <UiField.FieldError>
                {fieldState.error.message}
              </UiField.FieldError>
            )}
          </UiField.Field>
        )}
      />

      <Controller
        name="zip"
        control={control}
        render={({ field, fieldState }) => (
          <UiField.Field data-invalid={fieldState.invalid}>
            <UiField.FieldLabel htmlFor="zip">
              ZIP / Postal code <span className="text-destructive">*</span>
            </UiField.FieldLabel>
            <UiInput.Input
              {...field}
              id="zip"
              placeholder="GA-123-4567"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.error && (
              <UiField.FieldError>
                {fieldState.error.message}
              </UiField.FieldError>
            )}
          </UiField.Field>
        )}
      />
    </div>
  );
}
