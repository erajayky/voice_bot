"use client";
import { useEffect } from "react";
import Link from "next/link";
import React from "react";
import { useGeneralModalContext } from "../../contexts/ModalProvider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const GeneralModal: React.FC = () => {
  const { isGeneralOpen, closeGeneralModal, modalContent } =
    useGeneralModalContext();

  useEffect(() => {
    const handlePopstate = () => {
      if (isGeneralOpen) {
        closeGeneralModal();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isGeneralOpen, closeGeneralModal]);

  return (
    <Dialog open={isGeneralOpen} onOpenChange={closeGeneralModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {modalContent?.icon && (
            <div className="flex justify-center mb-4">{modalContent.icon}</div>
          )}
          {modalContent?.heading && (
            <DialogTitle className="text-lg font-bold">
              {modalContent.heading}
            </DialogTitle>
          )}
          {modalContent?.description && (
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              {modalContent.description}
            </DialogDescription>
          )}
        </DialogHeader>
        {modalContent?.buttonName && (
          <DialogFooter className="sm:justify-center mt-4">
            <Link
              onClick={closeGeneralModal}
              href={modalContent.buttonHref || "/"}
              className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-pink-700 bg-pink-700 px-4 py-2 font-semibold leading-6 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
            >
              {modalContent.buttonName}
            </Link>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GeneralModal;