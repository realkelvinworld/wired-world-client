"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import * as z from "zod";

import {
  UiButton,
  UiField,
  UiInput,
  UiSelect,
  UiSpinner,
  UiTextArea,
} from "@/components/ui";
import { PhoneInput } from "@/components/ui/phone-input";
import { guestOrderService } from "@/services/user";
import { useCountry } from "@/hooks/use-countries";
import { useCartStore } from "@/store/cart";

import AddressFields from "./address-fields";

const schema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number.")
    .refine((value) => /^\d+$/.test(value.replace(/\+/g, "")), {
      message: "Phone number must be numeric.",
    }),
  country_id: z.string().min(1, "Select a country"),
  company_name: z.string().optional(),
  notes: z.string().optional(),
  street_address: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zip: z.string().min(1, "ZIP code is required"),
});

type GuestFormValues = z.infer<typeof schema>;

export default function GuestCheckout() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { cart } = useCartStore();
  const { data: countriesData, isPending: isCountriesLoading } = useCountry();

  const countries = countriesData?.info ?? [];

  const form = useForm<GuestFormValues>({
    resolver: zodResolver(schema),
    mode: "all",
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      country_id: "",
      company_name: "",
      notes: "",
      street_address: "",
      apartment: "",
      city: "",
      region: "",
      zip: "",
    },
  });

  function onSubmit(data: GuestFormValues) {
    const cartItems = (cart ?? []).map((c) => ({
      item_id: c.item.id,
      quantity: c.quantity,
    }));

    setLoading(true);
    guestOrderService({
      first_name: data.first_name,
      last_name: data.last_name,
      country_id: Number(data.country_id),
      phone: data.phone,
      email: data.email,
      company_name: data.company_name ?? "",
      notes: data.notes ?? "",
      street_address: data.street_address,
      apartment: data.apartment ?? "",
      city: data.city,
      region: data.region,
      zip: data.zip,
      cart: cartItems,
    })
      .then((res) => {
        router.push(res.info.authorization_url);
      })
      .catch(() => {
        toast.error("Failed to place order. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-6"
    >
      <UiField.FieldGroup>
        {/* Contact Information */}
        <UiField.FieldSet>
          <UiField.FieldLegend>Contact Information</UiField.FieldLegend>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="first_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel htmlFor="first_name">
                    First name
                  </UiField.FieldLabel>
                  <UiInput.Input
                    {...field}
                    id="first_name"
                    placeholder="Eren"
                    aria-invalid={fieldState.invalid}
                    className="shadow-none py-5"
                  />
                  {fieldState.invalid && (
                    <UiField.FieldError errors={[fieldState.error]} />
                  )}
                </UiField.Field>
              )}
            />
            <Controller
              name="last_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel htmlFor="last_name">
                    Last name
                  </UiField.FieldLabel>
                  <UiInput.Input
                    {...field}
                    id="last_name"
                    placeholder="Yeager"
                    aria-invalid={fieldState.invalid}
                    className="shadow-none py-5"
                  />
                  {fieldState.invalid && (
                    <UiField.FieldError errors={[fieldState.error]} />
                  )}
                </UiField.Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="email">
                  Email address
                </UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  aria-invalid={fieldState.invalid}
                  className="shadow-none py-5"
                />
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel htmlFor="phone">
                    Phone number
                  </UiField.FieldLabel>
                  <PhoneInput
                    id="phone"
                    placeholder="Enter phone number"
                    defaultCountry="GH"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    className="rounded"
                  />
                  {fieldState.invalid && (
                    <UiField.FieldError errors={[fieldState.error]} />
                  )}
                </UiField.Field>
              )}
            />

            <Controller
              name="country_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field
                  data-invalid={fieldState.invalid}
                  className="w-full"
                >
                  <UiField.FieldLabel>Country</UiField.FieldLabel>
                  <UiSelect.Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isCountriesLoading}
                  >
                    <UiSelect.SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="py-5"
                    >
                      <UiSelect.SelectValue placeholder="Select a country" />
                    </UiSelect.SelectTrigger>
                    <UiSelect.SelectContent>
                      {countries.map((c) => (
                        <UiSelect.SelectItem key={c.id} value={String(c.id)}>
                          <img
                            src={c.image}
                            alt={c.name}
                            width={20}
                            height={16}
                            loading="lazy"
                            className="inline-block rounded-sm object-cover"
                          />
                          {c.name}
                        </UiSelect.SelectItem>
                      ))}
                    </UiSelect.SelectContent>
                  </UiSelect.Select>
                  {fieldState.invalid && (
                    <UiField.FieldError errors={[fieldState.error]} />
                  )}
                </UiField.Field>
              )}
            />
          </div>

          <Controller
            name="company_name"
            control={form.control}
            render={({ field }) => (
              <UiField.Field>
                <UiField.FieldLabel htmlFor="company_name">
                  Company name
                </UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="company_name"
                  placeholder="Acme Corp (optional)"
                  className="shadow-none py-5"
                />
              </UiField.Field>
            )}
          />
        </UiField.FieldSet>

        {/* Delivery Address */}
        <UiField.FieldSet>
          <UiField.FieldLegend>Delivery Address</UiField.FieldLegend>
          <AddressFields control={form.control} />
        </UiField.FieldSet>

        {/* Notes */}
        <UiField.FieldSet>
          <UiField.FieldLegend>Order Notes</UiField.FieldLegend>
          <Controller
            name="notes"
            control={form.control}
            render={({ field }) => (
              <UiField.Field>
                <UiTextArea.Textarea
                  {...field}
                  placeholder="Any special instructions for your order... (optional)"
                  rows={3}
                />
              </UiField.Field>
            )}
          />
        </UiField.FieldSet>
      </UiField.FieldGroup>

      <UiButton.Button
        type="submit"
        className="w-full"
        disabled={loading || !form.formState.isValid}
      >
        {loading ? (
          <UiSpinner.Spinner className="text-secondary" />
        ) : (
          "Place Order"
        )}
      </UiButton.Button>
    </form>
  );
}
