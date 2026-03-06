"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PencilSimpleIcon } from "@phosphor-icons/react";
import { Controller, useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

import { profileFormSchema, type ProfileFormValues } from "@/schemas/user";
import { PhoneInput } from "@/components/ui/phone-input";
import { updateProfileService } from "@/services/user";
import { useLanguages } from "@/hooks/use-languages";
import { useCountry } from "@/hooks/use-countries";
import { useUserStore } from "@/store/user";
import { UserModel } from "@/models/user";
import {
  UiButton,
  UiField,
  UiInput,
  UiSelect,
  UiSheet,
  UiSpinner,
} from "@/components/ui";

interface EditProfileFormProps {
  user: UserModel;
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  // state
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // api
  const { data: countryData } = useCountry();
  const { data: languageData } = useLanguages();

  // hooks
  const { setUser } = useUserStore();
  const queryClient = useQueryClient();

  // variables
  const countries = countryData?.info ?? [];
  const languages = languageData?.info ?? [];

  const matchedCountryId =
    countries.find((c) => c.name === user.country)?.id?.toString() ?? "";
  const matchedLanguageId =
    languages.find((l) => l.name === user.language)?.id?.toString() ?? "";

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "all",
    values: {
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      country_id: matchedCountryId,
      language_id: matchedLanguageId,
    },
  });

  // functions
  function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    updateProfileService({
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      image: null,
      country_id: Number(data.country_id),
      language_id: Number(data.language_id),
    })
      .then((res) => {
        setUser(res.info);
        queryClient.invalidateQueries({ queryKey: ["first-paint"] });
        toast.success("Profile updated successfully");
        setOpen(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <UiSheet.Sheet open={open} onOpenChange={setOpen}>
      <UiSheet.SheetTrigger asChild>
        <UiButton.Button variant="outline" size="sm" className="rounded-full">
          <PencilSimpleIcon weight="bold" className="size-4" />
          Edit Profile
        </UiButton.Button>
      </UiSheet.SheetTrigger>
      <UiSheet.SheetContent className="w-full max-w-[440px] sm:max-w-[600px] lg:max-w-[550px] overflow-auto ">
        <UiSheet.SheetHeader>
          <UiSheet.SheetTitle>Edit Profile</UiSheet.SheetTitle>
          <UiSheet.SheetDescription>
            Update your personal information
          </UiSheet.SheetDescription>
        </UiSheet.SheetHeader>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-4"
        >
          <UiField.FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="first_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <UiField.Field data-invalid={fieldState.invalid}>
                    <UiField.FieldLabel htmlFor="edit_first_name">
                      First name
                    </UiField.FieldLabel>
                    <UiInput.Input
                      {...field}
                      id="edit_first_name"
                      aria-invalid={fieldState.invalid}
                      placeholder="First name"
                      autoComplete="given-name"
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
                    <UiField.FieldLabel htmlFor="edit_last_name">
                      Last name
                    </UiField.FieldLabel>
                    <UiInput.Input
                      {...field}
                      id="edit_last_name"
                      aria-invalid={fieldState.invalid}
                      placeholder="Last name"
                      autoComplete="family-name"
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
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel htmlFor="edit_phone">
                    Phone number
                  </UiField.FieldLabel>
                  <PhoneInput
                    id="edit_phone"
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
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel>Country</UiField.FieldLabel>
                  <UiSelect.Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <UiSelect.SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="py-5"
                    >
                      <UiSelect.SelectValue placeholder="Select a country" />
                    </UiSelect.SelectTrigger>
                    <UiSelect.SelectContent>
                      {countries.map((c) => (
                        <UiSelect.SelectItem key={c.id} value={c.id.toString()}>
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

            <Controller
              name="language_id"
              control={form.control}
              render={({ field, fieldState }) => (
                <UiField.Field data-invalid={fieldState.invalid}>
                  <UiField.FieldLabel>Language</UiField.FieldLabel>
                  <UiSelect.Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <UiSelect.SelectTrigger
                      aria-invalid={fieldState.invalid}
                      className="py-5"
                    >
                      <UiSelect.SelectValue placeholder="Select a language" />
                    </UiSelect.SelectTrigger>
                    <UiSelect.SelectContent>
                      {languages.map((l) => (
                        <UiSelect.SelectItem key={l.id} value={l.id.toString()}>
                          {l.name}
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
          </UiField.FieldGroup>

          <UiButton.Button
            type="submit"
            disabled={loading || !form.formState.isValid}
            className="w-full font-medium"
          >
            {loading ? (
              <UiSpinner.Spinner className="text-secondary" />
            ) : (
              "Save Changes"
            )}
          </UiButton.Button>
        </form>
      </UiSheet.SheetContent>
    </UiSheet.Sheet>
  );
}
