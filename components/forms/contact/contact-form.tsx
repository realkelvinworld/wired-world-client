import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";

import { contactFormSchema, type ContactFormValues } from "@/schemas/contact";
import { PhoneInput } from "@/components/ui/phone-input";
import { UiField, UiInput } from "@/components/ui";
import { contactUsService } from "@/services/base";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export default function ContactForm() {
  // state
  const [loading, setLoading] = useState(false);

  // hooks
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone_number: "",
      message: "",
    },
  });

  // functions
  function onSubmit(data: ContactFormValues) {
    setLoading(true);
    contactUsService({
      full_name: data.full_name,
      email: data.email,
      phone: data.phone_number,
      message: data.message,
    })
      .then((res) => {
        toast.success(res.info);
        form.reset();
      })
      .catch(() => {
        toast.error("Something went wrong. Please try again.");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="h-full my-8 max-w-xl">
      <form id="contact-form" onSubmit={form.handleSubmit(onSubmit)}>
        <UiField.FieldGroup>
          <Controller
            name="full_name"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="full_name">
                  Full Name
                </UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="full_name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Kelvin Selassie"
                  autoComplete="off"
                  className="shadow-none py-5"
                />
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="email">Email</UiField.FieldLabel>
                <UiInput.Input
                  {...field}
                  id="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="kelvin@example.com"
                  autoComplete="off"
                  className="shadow-none py-5"
                />
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />
          <Controller
            name="phone_number"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="phone_number">
                  Phone Number
                </UiField.FieldLabel>
                <PhoneInput
                  id="phone_number"
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
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <UiField.Field data-invalid={fieldState.invalid}>
                <UiField.FieldLabel htmlFor="message">
                  Message
                </UiField.FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    id="message"
                    placeholder="I'm having an issue making a purchase."
                    rows={6}
                    className="min-h-24 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                  <InputGroupAddon align="block-end">
                    <InputGroupText className="tabular-nums">
                      {field.value.length}/100 characters
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
                <UiField.FieldDescription>
                  Once you are satisfied with your composition, click the submit
                  button to send us your message otherwise hit reset to start
                  over.
                </UiField.FieldDescription>
                {fieldState.invalid && (
                  <UiField.FieldError errors={[fieldState.error]} />
                )}
              </UiField.Field>
            )}
          />
        </UiField.FieldGroup>
      </form>

      <UiField.Field orientation="horizontal" className="my-4">
        <Button type="button" variant="outline" onClick={() => form.reset()}>
          Reset
        </Button>
        <Button type="submit" form="contact-form" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </UiField.Field>
    </div>
  );
}
