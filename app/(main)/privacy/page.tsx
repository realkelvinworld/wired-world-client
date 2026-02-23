import type { Metadata } from "next";
import Link from "next/link";

import { UiSeparator } from "@/components/ui";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how WiredWorld collects, uses, and protects your personal information.",
};

const sections = [
  {
    title: "Who We Are",
    content: [
      "WiredWorld operates the website at wireworldgh.com. This privacy policy outlines how we collect, use, store and protect the personal information you provide when using our website or purchasing our products and services.",
      "We are committed to safeguarding your privacy and ensuring that your personal data is handled responsibly and in compliance with applicable data protection laws in Ghana.",
    ],
  },
  {
    title: "What Information We Collect",
    content: [
      "We collect information you provide directly to us when you create an account, place an order, contact us, or interact with our website. This may include:",
    ],
    list: [
      "Full name, email address and phone number.",
      "Billing and shipping addresses.",
      "Payment information (processed securely through our payment providers — we do not store card details directly).",
      "Account credentials (username and password, stored in encrypted form).",
      "Order history and product preferences.",
      "Communications you send to us (e.g. support requests, feedback).",
    ],
    footer:
      "We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, pages visited, and referring URLs.",
  },
  {
    title: "How We Use Your Information",
    content: [
      "We use the information we collect for the following purposes:",
    ],
    list: [
      "To process and fulfil your orders, including shipping and delivery.",
      "To create and manage your account on our platform.",
      "To communicate with you about orders, promotions, and updates (you may opt out of marketing communications at any time).",
      "To improve our website, products and services based on usage patterns and feedback.",
      "To detect, prevent and address fraud, security issues and technical problems.",
      "To comply with legal obligations and enforce our terms and conditions.",
    ],
  },
  {
    title: "Cookies & Tracking Technologies",
    content: [
      "Our website uses cookies and similar technologies to enhance your browsing experience. Cookies are small text files stored on your device that help us recognise you and remember your preferences.",
    ],
    list: [
      "Essential cookies: Required for the website to function properly, including session management and authentication. These cannot be disabled.",
      "Functional cookies: Remember your preferences such as language, region, and display settings. These persist for up to one year.",
      "Authentication cookies: When you log in, we set cookies to save your login state. Login cookies last for two days unless you select \"Remember Me\", in which case they persist for two weeks. Logging out removes these cookies.",
      "Analytics cookies: Help us understand how visitors interact with our site so we can improve the user experience. These collect anonymised data.",
    ],
    footer:
      "You can control cookie settings through your browser preferences. Disabling certain cookies may affect website functionality.",
  },
  {
    title: "Media & Uploaded Content",
    content: [
      "If you upload images to our website (for example, as part of a product review or support request), you should avoid uploading images with embedded location data (EXIF GPS). Other visitors may be able to download and extract location data from images hosted on the site.",
      "Any content you upload to WiredWorld remains your property, but by uploading it you grant us a non-exclusive licence to display it on our platform in connection with the services we provide.",
    ],
  },
  {
    title: "Embedded Content from Other Websites",
    content: [
      "Pages on our site may include embedded content from third-party websites (e.g. videos, maps, social media feeds). Embedded content from other websites behaves exactly as if you had visited those websites directly.",
      "These third-party services may collect data about you, use their own cookies, embed additional tracking technologies, and monitor your interaction with the embedded content. If you have an account with those services and are logged in, they may associate your activity with your profile on their platform.",
      "We recommend reviewing the privacy policies of any third-party services whose content appears on our site.",
    ],
  },
  {
    title: "Who We Share Your Data With",
    content: [
      "We do not sell your personal information to third parties. We may share your data in the following circumstances:",
    ],
    list: [
      "Payment processors: To securely process your transactions.",
      "Delivery partners: To fulfil and ship your orders.",
      "Service providers: Third-party tools we use for analytics, email communications, and customer support, all bound by data protection agreements.",
      "Legal authorities: When required by law, regulation, or legal proceedings, or to protect the rights, safety and property of WiredWorld and our users.",
      "Password resets: If you request a password reset, your IP address will be included in the reset email for security purposes.",
    ],
  },
  {
    title: "How Long We Retain Your Data",
    content: [
      "We retain your personal information for as long as necessary to provide our services, fulfil the purposes outlined in this policy, and comply with legal obligations.",
    ],
    list: [
      "Account data: Retained for as long as your account is active. You may request deletion at any time.",
      "Order data: Retained for a minimum of six (6) years for tax, legal and accounting purposes.",
      "Support communications: Retained for up to two (2) years after your last interaction to provide consistent customer service.",
      "Analytics data: Aggregated and anonymised data may be retained indefinitely for business analysis.",
    ],
    footer:
      "When data is no longer needed, it is securely deleted or anonymised so that it can no longer be associated with you.",
  },
  {
    title: "Your Rights Over Your Data",
    content: [
      "You have the following rights regarding your personal data:",
    ],
    list: [
      "Access: Request a copy of the personal data we hold about you.",
      "Correction: Request that we correct any inaccurate or incomplete data.",
      "Deletion: Request that we erase your personal data, subject to any legal obligations requiring us to retain it.",
      "Export: Request a machine-readable export of your data.",
      "Objection: Object to the processing of your data for marketing purposes.",
      "Withdrawal of consent: Where processing is based on consent, you may withdraw it at any time without affecting the lawfulness of prior processing.",
    ],
    footer:
      "To exercise any of these rights, please contact us using the details provided at the bottom of this page. We will respond to your request within 30 days.",
  },
  {
    title: "Data Security",
    content: [
      "We take appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure or destruction. These measures include:",
    ],
    list: [
      "Encryption of data in transit (HTTPS/TLS) and at rest.",
      "Regular security audits and vulnerability assessments.",
      "Restricted access to personal data on a need-to-know basis.",
      "Secure password hashing and authentication mechanisms.",
    ],
    footer:
      "While we strive to protect your data, no method of transmission over the internet or electronic storage is 100% secure. We encourage you to use strong, unique passwords and to keep your login credentials confidential.",
  },
  {
    title: "Children's Privacy",
    content: [
      "Our website and services are not directed at individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete that information promptly. If you believe a child has provided us with personal data, please contact us immediately.",
    ],
  },
  {
    title: "Changes to This Policy",
    content: [
      "WiredWorld reserves the right to update this privacy policy at any time to reflect changes in our practices, legal requirements, or operational needs. When we make significant changes, we will notify you by posting a prominent notice on our website or by sending you an email.",
      "We encourage you to review this page periodically to stay informed about how we protect your information. Your continued use of our website after any changes constitutes your acceptance of the updated policy.",
    ],
  },
  {
    title: "Where We Send Your Data",
    content: [
      "Your data is primarily stored and processed within Ghana. In certain cases, your information may be transferred to service providers located in other countries (e.g. cloud hosting, payment processing). When this occurs, we ensure that appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-muted-foreground">
            Your privacy matters to us. This policy explains how WiredWorld
            collects, uses, stores and protects your personal information when
            you use our website and services.
          </p>
        </div>

        <UiSeparator.Separator className="mb-10" />

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-lg font-semibold">{section.title}</h2>

              {section.content && (
                <div className="mt-3 space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}

              {section.list && (
                <ul className="mt-3 list-disc space-y-2 pl-5">
                  {section.list.map((item, lIndex) => (
                    <li
                      key={lIndex}
                      className="text-sm leading-relaxed text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {section.footer}
                </p>
              )}
            </section>
          ))}
        </div>

        <UiSeparator.Separator className="my-10" />

        {/* Footer note */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            If you have any questions about this privacy policy, please{" "}
            <Link
              href={routes.contact}
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              contact us
            </Link>
            .
          </p>
          <p className="mt-2 text-xs text-muted-foreground/60">
            Last updated: February 2026
          </p>
        </div>
      </div>
    </div>
  );
}
