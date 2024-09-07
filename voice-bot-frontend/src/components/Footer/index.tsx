"use client";
import { TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSubscibeToNewsLetterWithMutation } from "@/queries/communication/SubscribeToNewsLetter";
import { parseError } from "../../utils/errors";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
const productsLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing Plans", href: "/pricing" },
  { label: "Faqs", href: "/#faq" },
  { label: "Support Center", href: "/contact" },
];

const legalLinks = [
  { label: "About", href: "/aboutus" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
];
const socials = [
  { icon: TwitterIcon, href: "https://twitter.com/thedevstarter" },
  { icon: InstagramIcon, href: "https://www.instagram.com/thedevstarter/" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/company/100653143/" },
];
export default function Footer() {
  const [email, setEmail] = useState(" ");
  const { toast } = useToast();
  const { mutate: subscribeToNewsLetter } = useSubscibeToNewsLetterWithMutation(
    {
      onSuccess: async (message) => {
        // toast.success(message);
        toast({
          title: "Success",
          description: message,
        });
        setEmail("");
      },
      onError: (error: any) => {
        // toast.error(parseError(error));
        toast({
          variant: "destructive",
          title: "Error",
          description: parseError(error),
        });
        setEmail("");
      },
    }
  );
  const handleNewsLetterSubscribe = () => {
    subscribeToNewsLetter({ email: email });
  };
  return (
    <>
      {/* Footer Section: With Links Info Newsletter Dark */}
      <div className="">
        <footer
          id="page-footer"
          className="border-t border-gray-400 dark:bg-gray-900 dark:text-gray-100"
        >
          <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-32 xl:max-w-7xl">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-6 lg:gap-10">
              {/* Products Section */}
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Products
                </h4>
                <nav className="flex flex-col space-y-3 text-sm">
                  {productsLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Legal Section */}
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Legal
                </h4>
                <nav className="flex flex-col space-y-3 text-sm">
                  {legalLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link.href}
                      className="font-medium text-gray-700 hover:text-gray-950 dark:text-gray-400 dark:hover:text-gray-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Company Info Section */}
              <div className="space-y-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Company Inc
                </h4>
                <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  2829 Street no6 ATI Road <br />
                  Ludhiana, 141003
                </div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-400/75">
                  Join Our Newsletter
                </h4>
                <div className="space-y-3 sm:flex sm:items-center sm:space-x-2 sm:space-y-0">
                  <div className="flex items-center">
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="grow rounded-l-lg border-gray-200 placeholder-gray-500 dark:border-gray-600 dark:bg-gray-900 dark:placeholder-gray-400"
                    />
                    <Button
                      onClick={handleNewsLetterSubscribe}
                      variant="default"
                      className="-ml-px rounded-r-lg bg-pink-700 text-white hover:bg-pink-600"
                    >
                      Subscribe
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-10 border-dashed dark:border-gray-700/75" />
            <div className="flex flex-col space-y-6 text-center text-sm md:flex-row-reverse md:justify-between md:space-y-0 md:text-left">
              <nav className="space-x-4 flex justify-center md:justify-end">
                {socials.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-800 dark:hover:text-white"
                  >
                    <social.icon />
                  </Link>
                ))}
              </nav>
              <div className="text-gray-500 dark:text-gray-400/80">
                <span className="font-medium">
                  {process.env.NEXT_PUBLIC_COMPANY_NAME ?? "Company INC"}
                </span>{" "}
                ©
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* END Footer Section: With Links Info Newsletter Dark */}
    </>
  );
}
