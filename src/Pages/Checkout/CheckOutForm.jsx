import { useEffect, useState } from "react";
import { CardElement } from "@stripe/react-stripe-js";
import Swal from "sweetalert2";

const CheckOutForm = () => {
  const [selectedPlan, setSelectedPlan] = useState("");
  const [duration, setDuration] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0); // in percentage
  const [couponApplied, setCouponApplied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlan || !duration) {
      Swal.fire({
        icon: "warning",
        title: "Please select a plan and duration",
        background: "rgba(30, 30, 60, 0.85)",
        color: "#fff",
        backdrop: `rgba(0, 0, 0, 0.4)`,
        customClass: {
          popup: "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
          title: "text-blue-400 text-lg font-semibold",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
          htmlContainer: "text-sm text-gray-300",
        },
      });
      return;
    }
    Swal.fire("Payment feature coming soon!");
  };

  // Get Price Code
  const getPrice = () => {
    let basePrice = 0;
    switch (selectedPlan) {
      case "free":
        basePrice = 0;
        break;
      case "pro":
        basePrice = 9.99 * duration;
        break;
      case "elite":
        basePrice = 14.99 * duration;
        break;
      default:
        return 0;
    }

    const discounted = basePrice - (basePrice * discount) / 100;
    return discounted;
  };

  // Coupon Discount
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();

    if (couponApplied) {
      return Swal.fire({
        icon: "info",
        title: "Coupon Already Applied",
        text: `You've already applied a ${discount}% discount.`,
        background: "rgba(30, 30, 60, 0.85)",
        color: "#fff",
        backdrop: `rgba(0, 0, 0, 0.4)`,
        customClass: {
          popup: "rounded-xl shadow-lg border border-blue-500 backdrop-blur-lg",
          title: "text-blue-400 text-lg font-semibold",
          confirmButton:
            "bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded mt-4",
          htmlContainer: "text-sm text-gray-300",
        },
        confirmButtonText: "Okay",
      });
    }

    // Coupon Codes
    if (code === "brainzap10") {
      setDiscount(10);
      setCouponApplied(true);
      Swal.fire({
        icon: "success",
        title: "Coupon Applied!",
        text: "10% discount has been applied.",
        background: "rgba(30, 30, 60, 0.85)",
        color: "#fff",
        backdrop: `rgba(0, 0, 0, 0.4)`,
        customClass: {
          popup:
            "rounded-xl shadow-lg border border-violet-500 backdrop-blur-lg",
          title: "text-purple-400 text-lg font-semibold",
          confirmButton:
            "bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded mt-4",
          htmlContainer: "text-sm text-gray-300",
        },
        confirmButtonText: "Okay",
      });
    } else {
      setDiscount(0);
      setCouponApplied(false);
      Swal.fire({
        icon: "error",
        title: "Invalid Coupon",
        text: "Please enter a valid coupon code.",
        background: "rgba(30, 30, 60, 0.85)",
        color: "#fff",
        backdrop: `rgba(0, 0, 0, 0.4)`,
        customClass: {
          popup: "rounded-xl shadow-lg border border-red-500 backdrop-blur-lg",
          title: "text-red-400 text-lg font-semibold",
          confirmButton:
            "bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2 rounded mt-4",
          htmlContainer: "text-sm text-gray-300",
        },
        confirmButtonText: "Got it",
      });
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
                <option value="free"> Free Zap ($0/month)</option>
                <option value="pro">Zap Pro ($9.99/month)</option>
                <option value="elite">Zap Elite ($14.99/month)</option>
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

            {/* Coupon Code */}
            <div>
              <label className="block mb-2 text-sm text-indigo-400 font-semibold">
                Coupon Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow p-3 rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all"
                >
                  Apply
                </button>
              </div>
              {couponApplied && discount > 0 && (
                <p className="text-green-400 text-sm mt-1">
                  🎉 {discount}% discount applied!
                </p>
              )}
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

          <p>
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
