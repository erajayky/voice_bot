"use client";

import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import { SendHorizontalIcon } from "lucide-react";
import { useFeedbackModalContext } from "../../contexts/ModalProvider";
import {
  AnnoyedIcon,
  FrownIcon,
  LaughIcon,
  MehIcon,
  SmileIcon,
} from "lucide-react";
import { useSubmitFeedbackFormWithMutation } from "@/queries/communication/SubmitFeedback";
import { parseError } from "../../utils/errors";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function FeedbackModal() {
  const [feedbackScore, setFeedbackScore] = useState(0);
  const [feedbackSuggestion, setFeedbackSuggestion] = useState("");
  const [feedbackOtherSuggestions, setFeedbackOtherSuggestions] = useState("");

  const { toast } = useToast();
  const icons = [FrownIcon, AnnoyedIcon, MehIcon, SmileIcon, LaughIcon];

  const { isFeedbackOpen, closeFeedbackModal } = useFeedbackModalContext();
  const feedbackSuggestions = [
    "Customer Support",
    "Template structure",
    "UI Design",
    "Overall Service",
  ];

  useEffect(() => {
    const handlePopstate = () => {
      if (isFeedbackOpen) {
        closeFeedbackModal();
      }
    };

    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [isFeedbackOpen, closeFeedbackModal]);

  const { mutate: submitFeedbackForm } = useSubmitFeedbackFormWithMutation({
    onSuccess: async (message) => {
      toast({
        title: "Success",
        description: message,
      });
      closeFeedbackModal();
      setFeedbackScore(0);
      setFeedbackOtherSuggestions("");
      setFeedbackSuggestion("");
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: parseError(error),
      });
      closeFeedbackModal();
      setFeedbackScore(0);
      setFeedbackOtherSuggestions("");
      setFeedbackSuggestion("");
    },
  });

  const handleSubmit = () => {
    if (!feedbackScore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please Choose a feedback reaction",
      });
      return;
    }
    submitFeedbackForm({
      feedback_score: feedbackScore,
      feedback_suggestion: feedbackSuggestion,
      feedback_other_suggestions: feedbackOtherSuggestions,
    });
  };

  return (
    <Dialog open={isFeedbackOpen} onOpenChange={closeFeedbackModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>Feedback Form</DialogTitle>
        </DialogHeader>

        <div className="p-5">
          <p className="mb-6 text-md font-medium">
            Tell us what we can improve?
          </p>
          <div className="grid grid-cols-2 gap-4 mb-6 ">
            {feedbackSuggestions?.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => setFeedbackSuggestion(suggestion)}
                className={`text-sm rounded-xl hover:cursor-pointer hover:bg-pink-700 hover:text-white hover:border-none py-2 text-center ${
                  feedbackSuggestions[index] == feedbackSuggestion
                    ? "bg-pink-700 text-white border border-pink-700"
                    : "border-gray-300 border text-black bg-slate-50/80"
                }`}
              >
                {suggestion}
              </div>
            ))}
          </div>
          <p className="mb-6 text-md font-medium">Other Suggestions</p>
          <Textarea
            id="suggestion"
            name="suggestion"
            rows={6}
            value={feedbackOtherSuggestions}
            onChange={(e) => setFeedbackOtherSuggestions(e.target.value)}
            placeholder="Write suggestion"
            className="border border-gray-300 block w-full rounded-lg px-3 py-2 text-sm leading-5 placeholder-gray-400"
          />
        </div>
        <div className="flex justify-center space-x-4 mb-3 border border-gray-200 w-[90%] mx-auto py-2 rounded-xl">
          {icons.map((Icon, index) => (
            <Icon
              onClick={() => setFeedbackScore(index + 1)}
              key={index}
              className={`h-10 w-7 hover:cursor-pointer hover:text-pink-600 font-light ${
                index == feedbackScore - 1 ? "text-pink-600" : "text-pink-200"
              }`}
            />
          ))}
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            onClick={closeFeedbackModal}
            type="button"
            variant="outline"
            className="inline-flex items-center justify-center space-x-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold leading-5 text-gray-800 hover:border-gray-300 hover:text-gray-900 hover:shadow-sm focus:ring focus:ring-gray-300 focus:ring-opacity-25 active:border-gray-200 active:shadow-none dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:text-gray-200 dark:focus:ring-gray-600 dark:focus:ring-opacity-40 dark:active:border-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="button"
            variant="outline"
            className="inline-flex items-center justify-center space-x-2 rounded-xl border border-pink-700 bg-pink-700 px-3 py-2 text-base font-semibold leading-5 text-white hover:border-pink-600 hover:bg-pink-600 hover:text-white focus:ring focus:ring-pink-400 focus:ring-opacity-50 active:border-pink-700 active:bg-pink-700 dark:focus:ring-pink-400 dark:focus:ring-opacity-90"
          >
            Submit <SendHorizontalIcon className="h-5 w-5 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}