import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import SectionHeading from "@/components/ui/SectionHeading";
import { MoveDown, MoveDownLeft, MoveRight } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl w-full">
        <Card className="shadow-lg rounded-lg">
          <SectionHeading
            heading="How It Works"
            subHeading="Our process is designed to be straightforward and effective. Follow these simple steps to achieve your desired results."
          />
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Process 1 */}
              <div className="relative">
                <Card className="w-full p-4 text-center">
                  <div className="border border-dashed rounded-md p-4 mb-2">
                    PROCESS 1
                  </div>
                  <p className="text-sm font-semibold">LOGIN TO YOUR ACCOUNT</p>
                  <p className="text-sm">
                    Start by logging in to your account to access all the
                    features.
                  </p>
                </Card>
                {/* Arrow button for mobile */}

                <div className="absolute top-1/2 right-[-32px] transform -translate-y-1/2">
                  <MoveRight size={32} />
                </div>
              </div>

              {/* Process 2 */}
              <div className="relative">
                <Card className="w-full p-4 text-center">
                  <div className="border border-dashed rounded-md p-4 mb-2">
                    PROCESS 2
                  </div>
                  <p className="text-sm font-semibold">
                    TAKE QUIZZES IN YOUR LANGUAGE
                  </p>
                  <p className="text-sm">
                    Choose quizzes based on your language preferences to assess
                    your skills.
                  </p>
                </Card>
                <div className="absolute -left-9 transform">
                  <MoveDownLeft size={42} />
                </div>
              </div>

              {/* Process 3 */}
              <div className="relative">
                <Card className="w-full p-4 text-center">
                  <div className="border border-dashed rounded-md p-4 mb-2">
                    PROCESS 3
                  </div>
                  <p className="text-sm font-semibold">SEE YOUR GROWTH</p>
                  <p className="text-sm">
                    Track your progress and see how much you've improved over
                    time.
                  </p>
                </Card>
                <div className="absolute top-1/2 right-[-32px] transform -translate-y-1/2">
                  <MoveRight size={32} />
                </div>
              </div>

              {/* Process 4 */}
              <div className="relative">
                <Card className="w-full p-4 text-center">
                  <div className="border border-dashed rounded-md p-4 mb-2">
                    PROCESS 4
                  </div>
                  <p className="text-sm font-semibold">
                    ADD QUIZZES TO THE COMMUNITY
                  </p>
                  <p className="text-sm">
                    Add your own quizzes and contribute to the developer
                    community for others.
                  </p>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HowItWorks;
