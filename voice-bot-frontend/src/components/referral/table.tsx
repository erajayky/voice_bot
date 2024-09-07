import React from "react";
import { AffiliateDetails } from "./types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface EarningsComponentProps {
  statsData: AffiliateDetails;
}

const EarningsComponent = (Props: EarningsComponentProps) => {
  const { statsData } = Props;

  return (
    <>
      <h1 className="text-5xl text-gray-500-700 m-5 text-center">
        Your Earnings
      </h1>
      <p className="text-gray-600 mx-6 px-64 my-6 w-full text-center">
        Track your referral here, we provide all stats required for tracking.
      </p>
      <div className="flex justify-center">
        <div className="w-1/3 p-4">
          <Card className="bg-white rounded-lg shadow-md h-full dark:bg-gray-600">
            <CardHeader className="flex flex-col h-1/4 border-b p-3">
              <CardTitle className="text-gray-500 dark:text-gray-50">
                Total Referrals
              </CardTitle>
              <CardContent className="float-right text-3xl">
                {statsData.totalReferrals}
              </CardContent>
            </CardHeader>
            <CardHeader className="flex flex-col h-1/4 border-b p-3">
              <CardTitle className="text-gray-500 dark:text-gray-50">
                Earnings
              </CardTitle>
              <CardContent className="float-right text-3xl">
                ${statsData.earnings}
              </CardContent>
            </CardHeader>
            <CardHeader className="flex flex-col h-1/4 border-b p-3">
              <CardTitle className="text-gray-500 dark:text-gray-50">
                Total Clicks
              </CardTitle>
              <CardContent className="float-right text-3xl">
                {statsData.ctr}
              </CardContent>
            </CardHeader>
            <CardHeader className="flex flex-col mb-4 h-1/4 border-b p-3">
              <CardTitle className="text-gray-500 dark:text-gray-50">
                Total Sign-ups
              </CardTitle>
              <CardContent className="float-right text-3xl">
                {statsData.totalSignups}
              </CardContent>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
};

export default EarningsComponent;
