import type { Metadata } from "next";
import Link from "next/link";

import { UiSeparator } from "@/components/ui";
import { routes } from "@/routes";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the WiredWorld terms and conditions governing your use of our website and services.",
};

const sections = [
  {
    title: "Conditions of Use",
    content: [
      "Welcome to the WiredWorld online website. By using the WiredWorld online website YOU AGREE TO BE BOUND BY ITS CONDITIONS OF USE (explained below), LEGAL NOTICES, PRIVACY POLICY and all disclaimers and terms and conditions that appear elsewhere on the WiredWorld online website. The policies of WiredWorld showrooms may differ substantially from those applicable to your use of the WiredWorld online website.",
      "WiredWorld reserves the right to make changes to the WiredWorld online website and its Conditions of Use and Legal Notices at any time. Each time you use the WiredWorld online website, you should visit and review the then current Conditions of Use, Legal Notices and Privacy Policy that apply to your transactions and use of this site. If you are dissatisfied with the WiredWorld online website, its content or Conditions of Use and Legal Notices, you agree that your sole and exclusive remedy is to discontinue using the WiredWorld online website.",
      "Tampering with the site, misrepresenting the identity of a user, using buying agents and conducting fraudulent activities on the site are prohibited.",
    ],
  },
  {
    title: "Disclaimers & Limitation of Liability",
    content: [
      "By using the WiredWorld online website, you expressly agree that use of the WiredWorld online website is at your sole risk. Neither WiredWorld nor its parent company, affiliates, subsidiaries or designees nor each of their respective officers, directors, employees, agents, third-party content providers, designers, contractors, distributors, merchants, sponsors, licensors or the like (collectively, \"Associates\") warrant that use of the WiredWorld online website will be uninterrupted or error-free. Neither WiredWorld nor its Associates warrant the accuracy, integrity or completeness of the content provided on the WiredWorld online website or the products or services offered for sale on the WiredWorld online website. No oral advice or written information given by WiredWorld or its Associates shall create a warranty.",
      "Under no circumstances shall WiredWorld or its Associates be liable for any direct, indirect, incidental, special or consequential damages that result from your use of or inability to use the WiredWorld online website, including but not limited to reliance by you on any information obtained from the WiredWorld online website that results in mistakes, omissions, interruptions, deletion or corruption of files, viruses, delays in operation or transmission, or any failure of performance. The foregoing Limitation of Liability shall apply in any action, whether in contract or any other claim, even if an authorized representative of WiredWorld has been advised of or should have knowledge of the possibility of such damages.",
    ],
  },
  {
    title: "Product Display & Colours",
    content: [
      "WiredWorld attempts to display product images shown on the site as accurately as possible. However, we cannot guarantee that the colour you see matches the product colour, as the display of the colour depends, in part, upon the monitor you are using.",
    ],
  },
  {
    title: "Errors on Our Site",
    content: [
      "Prices and availability of products and services are subject to change without notice. Errors will be corrected where discovered, and WiredWorld reserves the right to revoke any stated offer and to correct any errors, descriptions, specifications, inaccuracies or omissions including after an order has been submitted and whether or not the order has been confirmed and your credit card charged. If your credit card has already been charged for the purchase and your order is cancelled, WiredWorld will issue a credit to your credit card account in the amount of the charge. Individual bank policies will dictate when this amount is credited to your account. If you are not fully satisfied with your purchase, you may return it in accordance with WiredWorld's online Return Policy.",
    ],
  },
  {
    title: "Paying for Your Order",
    content: [
      "You may pay for your orders with major credit cards.",
      "Generally, credit and debit cards are not charged until we either ship the item(s) to you or confirm store availability (at which time you will be charged only for the goods we have actually shipped along with any appropriate taxes or shipping charges). However, we may pre-authorize your order amount with your credit or debit card issuer at the time you place the order, which may have an effect on your available credit line. When paying for a pre-order with a debit card you will be charged at the time you place your pre-order. Please contact your credit card issuer for more information.",
    ],
  },
  {
    title: "Validating Your Order",
    content: [
      "After you place an order using our shopping cart, we will check the information you give us for validity, by verifying your method of payment or shipping address. We reserve the right to reject any order you place with us, and/or to limit quantities on any order, without giving any reason. If we reject your order, we will attempt to notify you using the e-mail address you have given us with the order.",
      "Your credit or debit card will normally not be charged if we reject an order, but we will process a refund if the charge has been made against your card.",
    ],
  },
  {
    title: "Order Acceptance & Confirmation",
    content: [
      "Your receipt of an electronic or other form of order confirmation does not signify our acceptance of your order, nor does it constitute confirmation of our offer to sell. WiredWorld reserves the right at any time after receipt of your order to accept or decline your order for any reason.",
    ],
  },
  {
    title: "Retail Limited Warranty",
    content: [
      "WiredWorld provides this limited warranty to the person who has purchased an item. This limited warranty is only valid and enforceable at the location where you have purchased the item.",
    ],
  },
  {
    title: "Warranty Period",
    content: [
      "The warranty period starts at the time of the product's purchase by the first end-user. The warranty period is twelve (12) months unless otherwise specified.",
      "The warranty period will not be extended or renewed or otherwise affected due to subsequent resale, repair or replacement of the item.",
    ],
  },
  {
    title: "How to Get Warranty Services",
    content: [
      "If you wish to make a claim under the limited warranty, you may call the WiredWorld customer service line. When making a limited warranty claim, you must present:",
    ],
    list: [
      "The legible and unmodified original proof of purchase, which clearly indicates the date and place of purchase, the item type and the IMEI or Serial number.",
      "Undamaged packaging.",
    ],
    footer:
      "This limited warranty extends only to the original first end-user of the product and is not assignable or transferable to any subsequent purchaser or end-user.",
  },
  {
    title: "Important Notes",
    list: [
      "In the case of mobile phones, customers are advised to back up their data before presenting their phone for servicing.",
      "WiredWorld will not be responsible for any missing data during or after repair if it is a software problem.",
    ],
  },
  {
    title: "What Our Warranty Does Not Cover",
    list: [
      "User manuals, accessories or any third-party software downloaded into the device or appliance.",
      "Normal wear and tear, including without limitation, wear and tear of camera lenses.",
      "Transport costs.",
      "Defects caused by rough handling including without limitation defects caused by sharp items or dropping.",
      "Exposure to moisture, dampness, extreme thermal or environmental conditions, rapid changes in such conditions, spillage of food or liquid, or influence from chemical products.",
      "External or internal breakage, exposure to high voltage or connections to wrong power supply.",
      "Devices opened, modified or repaired by anyone other than an authorised WiredWorld service centre, or repaired using unauthorised spare parts.",
      "Products with removed, erased, defaced or altered serial or IMEI numbers.",
    ],
    footer:
      "The normal repair process varies depending on the issue. Customers can estimate between 2 to 3 working days, but in the event the device has to be sent for higher-level repairs it may take 7 to 10 working days. On completion, the customer will be notified. The warranty does not entitle the purchaser to a complete replacement of the item — replacement decisions are made on a case-by-case basis.",
  },
  {
    title: "Dead on Arrival",
    content: [
      "If the product is not functioning on reception from the courier, the customer must contact WiredWorld customer service immediately (within 24 hours) and take the unit to the nearest WiredWorld service centre. A replacement unit will be provided within 24 to 48 hours by courier based on the analysis by the technical team.",
      "If a product is found to be misused, mishandled, tampered with or has undergone any form of unauthorised repair, the unit will be considered out of warranty and the customer will be charged for repairs. The same applies if a product is found to be liquid damaged.",
      "In the event a customer is not satisfied with the product (e.g. colour, model, appearance), the product will not be eligible for exchange.",
    ],
  },
  {
    title: "Order Limitations & Limited Quantities",
    content: [
      "WiredWorld may, at its own discretion, limit or cancel quantities purchased per person, per household or per order. WiredWorld also reserves the right to reject any order you place with us. These restrictions may include orders placed by the same WiredWorld account, the same credit card, and orders that use the same billing and/or shipping address. In the event we make a change to an order, we will attempt to notify you by contacting the e-mail and/or billing address provided at the time the order was made. WiredWorld reserves the right to limit or prohibit sales to dealers.",
    ],
  },
  {
    title: "Delivery Fees",
    list: [
      "Delivery costs are fixed at GHS 150 nationwide.",
      "We offer free delivery for orders of GHS 10,000 and above.",
      "You can also collect your order from any of our stores free of charge. Our customer service agents will let you know when and where to pick up your order.",
    ],
  },
  {
    title: "Delivery Time Frame",
    content: [
      "All orders will be processed for delivery up to 48 hours after order confirmation.",
    ],
  },
  {
    title: "Cancellation Policy",
    content: [
      "If we receive a cancellation notice and the order has not been shipped, we shall cancel the order and refund the entire amount. The refund process takes 10 to 30 days and would be reimbursed to your credit card. We will not be able to cancel orders that have already been shipped. The customer agrees not to dispute the decision made by WiredWorld and accepts the cancellation policies. For bank transfer orders, if payment is not received in 3 days the order will be cancelled automatically.",
    ],
  },
  {
    title: "Termination of Use",
    content: [
      "WiredWorld may, in its sole discretion, terminate your account or your use of the WiredWorld online website at any time. You are personally liable for any orders that you place or charges that you incur prior to termination. WiredWorld reserves the right to change, suspend or discontinue all or any aspects of the WiredWorld online website at any time without prior notice.",
    ],
  },
  {
    title: "Limited Warranty Terms & Conditions",
    list: [
      "WiredWorld warrants products against any manufacturing defects for the period and type of warranty mentioned on the warranty card.",
      "The limited warranty is valid only in the country of purchase.",
      "The limited warranty covers devices and appliances only. Please refer to the manufacturer's terms and conditions available in the box or on their websites.",
      "For all accessories, the warranty terms and conditions shall be applicable as warranted by the manufacturer. External and supplied accessories, as well as those purchased separately, are not subject to the scope of this limited warranty.",
      "To avail the warranty service, please bring the product and official receipt or warranty card to the nearest authorised WiredWorld service centre. Service, repair or alterations by any personnel other than WiredWorld's authorised service centres will invalidate this warranty.",
      "The limited warranty does not cover any damage due to accident, transportation, misuse, negligence, natural disaster, humidity, rust, gradual deterioration due to wear and tear, cosmetic modification, drop damage, liquid damage and use with voltages other than designated or operation in a manner not in accordance with the manufacturer's instruction manual.",
      "All personal data, third-party or trial applications shall not be warranted under this limited warranty.",
      "This limited warranty is not transferable and will not be honoured if the Serial or IMEI number of a product is removed, altered or obliterated or there is misrepresentation in any other form.",
      "Repaired products will be warranted for the balance of the original warranty period.",
    ],
  },
  {
    title: "Customer Rights",
    content: [
      "The Consumer Code of Rights was issued under the Consumer Protection Agency (CPA) under the Ministry of Trade and Industry, which has been charged with the responsibility to ensure that consumers and retailers alike comply with the Consumer Code of Rights, understand their responsibilities and, where resolution is sought, facilitate this process between retailers and consumers.",
    ],
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        {/* Header */}
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            Legal
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Terms & Conditions
          </h1>
          <p className="mt-3 text-muted-foreground">
            Please read these terms and conditions carefully before using the
            WiredWorld website. By accessing or using our services, you agree to
            be bound by these terms.
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
            If you have any questions about these terms, please{" "}
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
