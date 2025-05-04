import { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import useAxiosPublic from '@/hooks/useAxiosPublic';
import { CustomToast } from '@/components/ui/CustomToast';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useUserInfo from '@/hooks/useUserInfo';

const CheckOutForm = () => {
  const { user, setUserType } = useAuth();
  const { refetch } = useUserInfo();
  const [selectedPlan, setSelectedPlan] = useState('');
  const [duration, setDuration] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0); // in percentage
  const [error, setError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [transectionId, setTransectionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [couponApplied, setCouponApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-apply coupon and select plan from navigation state
  useEffect(() => {
    window.scrollTo(0, 0);
    const { couponCode: navCouponCode, plan } = location.state || {};
    if (navCouponCode && navCouponCode.toLowerCase() === 'brainzap10') {
      setCouponCode(navCouponCode);
      setDiscount(10);
      setCouponApplied(true);
    }
    if (plan && ['Pro', 'Elite'].includes(plan)) {
      setSelectedPlan(plan);
    }
  }, [location.state]);

  // Client Secret
  useEffect(() => {
    if (totalPrice > 0) {
      axiosPublic
        .post('/create-payment-intent', { price: totalPrice })
        .then(res => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice]);

  const handleSubmit = async e => {
    e.preventDefault();
    // If plan and duration not selected
    if (!selectedPlan || !duration) {
      CustomToast({
        title: 'Select Plan & Duration',
        description: 'Please select a plan and duration before proceeding.',
        type: 'error',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
      return;
    }

    // If stripe and elements empty
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    setLoading(true);

    // Stripe payment method set
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    // If transaction gets any error
    if (error) {
      setError(error.message);
      CustomToast({
        title: 'Payment Error',
        description: error.message,
        type: 'error',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
      setLoading(false);
    } else {
      setError('');
    }

    // Payment confirm
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || 'Anonymous',
            name: user?.displayName || 'Anonymous',
          },
        },
      });

    if (confirmError) {
      console.log('confirm error:', confirmError);
    } else {
      if (paymentIntent.status === 'succeeded') {
        setTransectionId(paymentIntent.id);
        // Save the paymentInfo in the database
        const paymentInfo = {
          TotalPrice: totalPrice,
          subscription: selectedPlan,
          PaymentDate: new Date(),
          subscriptionLastTime: new Date(
            new Date().getTime() + 30 * 24 * 60 * 60 * 1000 * duration
          ),
          transectionId: paymentIntent.id,
          usedCoupon: couponCode,
        };
        const res = await axiosSecure.patch('/payment', paymentInfo);
        if (res.data?.message) {
          CustomToast({
            title: 'Payment Successful',
            description: 'Thank you for your payment.',
            photoURL: user?.photoURL,
            displayName: user?.displayName,
          });

          refetch().then(({ data }) => setUserType(data?.subscription || null));
          setLoading(false);
          navigate('/profile');
        }
      }
    }
  };

  // Get Price Code
  const getPrice = () => {
    let basePrice = 0;
    switch (selectedPlan) {
      case 'Pro':
        basePrice = 9.99 * duration;
        break;
      case 'Elite':
        basePrice = 14.99 * duration;
        break;
      default:
        return 0;
    }

    return basePrice - (basePrice * discount) / 100;
  };

  useEffect(() => {
    const price = getPrice();
    setTotalPrice(price);
  }, [selectedPlan, duration, discount]);

  // Coupon Discount
  const handleApplyCoupon = () => {
    const code = couponCode.trim().toLowerCase();

    if (!code) {
      return CustomToast({
        title: 'No Coupon Entered',
        description: 'Please enter a coupon code before applying.',
        type: 'error',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
    }

    if (couponApplied) {
      return CustomToast({
        title: 'Coupon Already Applied',
        description: `You've already applied a ${discount}% discount.`,
        type: 'info',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
    }
    // Coupon Codes
    if (code === 'brainzap10') {
      setDiscount(10);
      setCouponApplied(true);
      CustomToast({
        title: 'Coupon Applied',
        description: '10% discount has been applied.',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
    } else {
      setDiscount(0);
      setCouponApplied(false);
      CustomToast({
        title: 'Invalid Coupon',
        description: 'The coupon code you entered is not valid.',
        type: 'error',
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#0e0e1c] px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="w-full lg:mt-10 md:mt-12 mt-20 max-w-6xl mx-4 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-[#151528] rounded-3xl p-6 sm:p-8 border border-violet-700 shadow-[0_0_30px_rgba(128,0,255,0.2)]">
        {/* 🔮 Left: Category & Duration */}
        <div className="bg-gradient-to-b from-[#1f1f3a] to-[#1b1b33] p-5 sm:p-6 rounded-xl text-white border border-[#2e2e5e] shadow-inner">
          <h3 className="mb-4 sm:mb-6">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Choose Your Plan
            </span>
          </h3>

          <div className="space-y-4 sm:space-y-6">
            {/* Plan Selector */}
            <div>
              <label className="block mb-1 sm:mb-2 text-xs sm:text-sm text-indigo-400 font-semibold">
                Plan Category
              </label>
              <select
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={selectedPlan}
                onChange={e => setSelectedPlan(e.target.value)}
              >
                <option value="">-- Select Plan --</option>
                <option value="Pro">Zap Pro ($9.99/month)</option>
                <option value="Elite">Zap Elite ($14.99/month)</option>
              </select>
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block mb-1 sm:mb-2 text-xs sm:text-sm text-indigo-400 font-semibold">
                Subscription Duration
              </label>
              <select
                className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                value={duration}
                onChange={e => setDuration(Number(e.target.value))}
              >
                <option>1</option>
                <option>3</option>
                <option>6</option>
                <option>12</option>
              </select>
            </div>

            {/* Coupon Code */}
            <div>
              <label className="block mb-1 sm:mb-2 text-xs sm:text-sm text-indigo-400 font-semibold">
                Coupon Code
              </label>
              <div className="md:flex gap-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="w-full p-2 sm:p-3 text-sm sm:text-base rounded-lg bg-[#2d2d4d] text-white border border-[#3c3c5f] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={couponCode}
                  onChange={e => setCouponCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 md:mt-0 mt-2 sm:px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold hover:from-purple-600 hover:to-blue-600 transition-all text-sm sm:text-base"
                >
                  Apply
                </button>
              </div>
              {couponApplied && discount > 0 && (
                <p className="text-green-400 text-xs sm:text-sm mt-1">
                  🎉 {discount}% discount applied!
                </p>
              )}
            </div>
          </div>

          {/* 💡 Info */}
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-[#252542] border border-[#3f3f70] rounded-lg text-xs sm:text-sm text-gray-300">
            <p className="mb-1">
              <span className="text-yellow-400 font-semibold">💳 Tip:</span>{' '}
              Your subscription is billed once, securely.
            </p>
            <p>
              <span className="text-yellow-400 font-semibold">🔐 Note:</span>{' '}
              You can cancel or upgrade anytime.
            </p>
          </div>
        </div>

        {/* 💳 Right: Payment Summary */}
        <form
          onSubmit={handleSubmit}
          className="bg-[#1f1f3a] p-5 sm:p-6 rounded-xl text-white border border-[#2e2e5e] flex flex-col justify-between"
        >
          <div>
            <h3 className="mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Order Summary
              </span>
            </h3>
            <div>
              <p className="font-semibold text-sm sm:text-base">
                Selected Plan:{' '}
                {selectedPlan ? selectedPlan.toUpperCase() : 'No Plan Selected'}
              </p>
              <p className="text-indigo-400 capitalize mb-3 sm:mb-4 text-sm sm:text-base">
                For {duration} month{duration > 1 ? 's' : ''}
              </p>
            </div>
            {error && (
              <p className="text-red-500 text-sm sm:text-base mb-3">
                {' '}
                {error}{' '}
              </p>
            )}
            <div className="bg-[#2c2c4d] p-3 sm:p-4 rounded-lg border border-[#3f3f70] mb-4 sm:mb-6">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: '14px',
                      color: '#f3f4f6',
                      iconColor: '#a78bfa',
                      '::placeholder': {
                        color: '#6b7280',
                      },
                    },
                    invalid: {
                      color: '#ef4444',
                    },
                  },
                }}
              />
            </div>
            <div className="border-t border-[#3c3c5f] pt-3 sm:pt-4 mb-4 sm:mb-6">
              <p className="flex justify-between font-bold text-base sm:text-lg">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  TOTAL
                </span>
                <span>$ {totalPrice.toFixed(2)}</span>
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full h-10 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl text-sm sm:text-base"
              disabled={!stripe || !clientSecret || loading}
            >
              {loading ? (
                <div className="p-2 bg-gradient-to-tr animate-spin from-green-500 to-blue-600 via-purple-500 rounded-full">
                  <div className="rounded-full">
                    <div className="rounded-full"></div>
                  </div>
                </div>
              ) : (
                'Subscribe'
              )}
            </button>

            <p className="mt-3 sm:mt-4">
              <span className="text-xs sm:text-sm text-gray-400">
                By continuing, you agree to our{' '}
                <span className="underline text-indigo-400 cursor-pointer">
                  Terms
                </span>{' '}
                and{' '}
                <span className="underline text-indigo-400 cursor-pointer">
                  Privacy Policy
                </span>
                .
              </span>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckOutForm;
