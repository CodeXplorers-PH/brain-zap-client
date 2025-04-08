import { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan || !duration) {
      Swal.fire({
        icon: "warning",
        title: "Please select a plan and duration",
      });
      return;
    }
    Swal.fire("Payment feature coming soon!");
  };

  const getPrice = () => {
    switch (selectedPlan) {
      case "basic":
        return 10 * duration;
      case "standard":
        return 25 * duration;
      case "premium":
        return 45 * duration;
      default:
        return 0;
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0e0e1c] px-4 py-32">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 bg-[#151528] rounded-3xl p-8 border border-violet-700 shadow-[0_0_30px_rgba(128,0,255,0.2)]">
        {/* 🔮 Left: Category & Duration */}

        <div className="bg-gradient-to-b from-[#1f1f3a] to-[#1b1b33] p-6 rounded-xl text-white border border-[#2e2e5e] shadow-inner">
          <h3>
            <span className="text-2xl md:text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Choose Your Plan
            </span>
          </h3>

          <div className="space-y-6">
            {/* Plan Selector */}

            <div>
              <label className="block mb-2 text-sm text-indigo-400 font-semibold">
                Plan Category
              </label>
              <select
                className="w-full p-3 rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
              >
                <option value="">-- Select Plan --</option>
                <option value="basic">🔥 Basic ($10/month)</option>
                <option value="standard">⚡ Standard ($25/month)</option>
                <option value="premium">🚀 Premium ($45/month)</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block mb-2 text-sm text-indigo-400 font-semibold">
                Subscription Duration
              </label>
              <select
                className="w-full p-3 rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
              >
                <option>1</option>
                <option>3</option>
                <option>6</option>
                <option>12</option>
              </select>
            </div>
          </div>

          {/* 💡 Info */}

          <div className="mt-8 p-4 bg-[#252542] border border-[#3f3f70] rounded-lg text-sm text-gray-300">
            <p className="mb-1">
              <span className="text-yellow-400 font-semibold">💳 Tip:</span>{" "}
              Your subscription is billed once, securely.
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">🔐 Note:</span>{" "}
              You can cancel or upgrade anytime.
            </p>
          </div>
        </div>

        {/* 💳 Right: Payment Summary */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f1f3a] p-6 rounded-xl text-white border border-[#2e2e5e] flex flex-col justify-between"
        >
          <div>
            <h3>
              <span className="text-lg md:text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Order Summary
              </span>
            </h3>
            <div>
              <p className="font-semibold">
                Selected Plan:{" "}
                {selectedPlan ? selectedPlan.toUpperCase() : "No Plan Selected"}
              </p>
              <p className="text-indigo-400 capitalize mb-4">
                For {duration} month{duration > 1 ? "s" : ""}
              </p>
            </div>
            <div className="bg-[#2c2c4d] p-4 rounded-lg border border-[#3f3f70] mb-6">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#f3f4f6",
                      iconColor: "#a78bfa",
                      "::placeholder": {
                        color: "#6b7280",
                      },
                    },
                    invalid: {
                      color: "#ef4444",
                    },
                  },
                }}
              />
            </div>
            <div className="border-t border-[#3c3c5f] pt-4 mb-6">
              <p className="flex justify-between font-bold text-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  TOTAL
                </span>
                <span>$ {getPrice().toFixed(2)}</span>
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>

          <p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="text-sm text-gray-400 mt-4">
              By continuing, you agree to our{" "}
              <span className="underline text-indigo-400 cursor-pointer">
                Terms
              </span>{" "}
              and{" "}
              <span className="underline text-indigo-400 cursor-pointer">
                Privacy Policy
              </span>
              .
            </span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default CheckOutForm;
