"use client";
import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";
interface ShareReferralLinkProps {
  refferalLink?: string;
}
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const ShareReferralLink = (share: ShareReferralLinkProps) => {
  
  const { toast } = useToast();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(share.refferalLink ?? "");
    // toast.success("Link copied to clipboard");
    toast({
      title: "Copied",
      description: "Link copied to clipboard",
    });
  };

  const socialMediaShare = [
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        share.refferalLink ?? ""
      )}`,
      icons: <Facebook size={24} />,
    },
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        share.refferalLink ?? ""
      )}`,
      icons: <Twitter size={24} />,
    },
    {
      name: "Instagram",
      url: `https://www.instagram.com/?url=${encodeURIComponent(
        share.refferalLink ?? ""
      )}`,
      icons: <Instagram size={24} />,
    },
  ];

  return (
    <>
      <h1 className="text-5xl font-bold mb-8 text-center">
        Share the Referral Link
      </h1>
      <p className="text-gray-600 mx-6 px-64 w-full text-center">
        Copy the link from below or just click on any of the social media icons
        to share it directly on these platforms.
      </p>
      <div className="rounded-lg max-w-screen-2xl m-10 p-6">
        <Card className="p-4 bg-transparent shadow-none border-none">
          <CardContent className="flex items-center mb-4 space-x-10">
            <Input
              type="text"
              value={share.refferalLink ?? ""}
              readOnly
              className="flex-1 bg-gray-100 dark:bg-gray-500 rounded-l-md px-4 py-2 border-2"
            />
            <Button
              onClick={handleCopyLink}
              className="bg-pink-600 hover:bg-pink-900 text-white rounded-r-md px-4 py-2 focus:outline-none mx-10"
            >
              Copy Link
            </Button>
            <div className="flex justify-center space-x-4">
              {socialMediaShare.map((socialMedia, index) => (
                <a
                  key={index}
                  href={socialMedia.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-pink-400 rounded-full w-10 h-10 flex items-center justify-center text-pink-900 text-3xl font-bold"
                >
                  {socialMedia.icons}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ShareReferralLink;
