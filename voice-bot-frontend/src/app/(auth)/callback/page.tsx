"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useHandleLoginSuccess from "../../../hooks/auth/usehandleLoginSuccess";
import { parseError } from "../../../utils/errors";
import { useVerifySocialCodeMutation } from "../../../queries/auth/login/useVerifySocialCodeMutation";
import { useVerifyMagicLinkCode } from "@/queries/auth/login/useVerifyMagicLinkCode";
import { useLoadingModalContext } from "@/contexts/ModalProvider";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { handleLoginSuccess } = useHandleLoginSuccess();
  const [hasAttemptedValidation, setHasAttemptedValidation] = useState(false);

  const { openLoadingModal, closeLoadingModal } = useLoadingModalContext();
  const {
    mutate: validateToken,
    isLoading: isLoadingCheckoutSession,
    error: checkoutError,
  } = useVerifySocialCodeMutation({
    onError: (error: any) => {
      closeLoadingModal();
      router.push("/login");
    },
    onSuccess: async (token: string) => {
      await handleLoginSuccess(token);
      closeLoadingModal();
    },
  });

  const { mutate: verifyMagicLink, isLoading: isLoadingMagicLink } =
    useVerifyMagicLinkCode({
      onError: (error: any) => {
        closeLoadingModal();
        toast.error(parseError(error));
        router.push("/login");
      },
      onSuccess: async (token: string) => {
        await handleLoginSuccess(token);
        closeLoadingModal();
      },
    });

  useEffect(() => {
    if (hasAttemptedValidation) return;

    const validateAuth = async () => {
      openLoadingModal();
      const googleToken = searchParams.get("code");
      const emailVerifyCode = searchParams.get("emailVerifyCode");

      if (googleToken) {
        validateToken({code: googleToken});
      } else if (emailVerifyCode) {
        verifyMagicLink(emailVerifyCode);
      } else {
        closeLoadingModal();
        toast.error("Invalid or missing authentication code.");
        router.push("/login");
      }
      setHasAttemptedValidation(true);
    };

    validateAuth();
  }, [searchParams, validateToken, verifyMagicLink, openLoadingModal, hasAttemptedValidation, router]);

  if (isLoadingCheckoutSession || isLoadingMagicLink) {
    return <div>Loading...</div>;
  }

  return null;
}