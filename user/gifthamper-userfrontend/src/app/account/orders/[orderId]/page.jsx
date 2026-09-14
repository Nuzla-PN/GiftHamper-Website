"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Star,
  Truck,
  CheckCircle,
  Clock,
  Package,
  MapPin,
  CreditCard,
  X,
  Send,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";

const mockOrders = {
  "ORD-2024-001": {
    id: "ORD-2024-001",
    date: "2024-12-15",
    deliveryDate: "2024-12-18",
    paymentMethod: "UPI (Google Pay)",
    items: [
      {
        id: "p1",
        name: "Luxury Chocolate Hamper",
        price: 1299,
        qty: 1,
        image: "/images/h1.png",
        status: "delivered",
        reviewed: true,
      },
      {
        id: "p2",
        name: "Dry Fruit Delight Box",
        price: 899,
        qty: 1,
        image: "/images/h2.png",
        status: "delivered",
        reviewed: false,
      },
    ],
    total: 2198,
    status: "delivered",
    address: "123 MG Road, Indore, Madhya Pradesh - 452001",
    trackingId: "DTDC9876543210",
  },
  "ORD-2024-002": {
    id: "ORD-2024-002",
    date: "2024-12-10",
    deliveryDate: null,
    paymentMethod: "Credit Card (**** 4521)",
    items: [
      {
        id: "p3",
        name: "Birthday Surprise Hamper",
        price: 1599,
        qty: 1,
        image: "/images/h3.png",
        status: "shipped",
        reviewed: false,
      },
    ],
    total: 1599,
    status: "shipped",
    address: "456 Corporate Tower, Bhopal, Madhya Pradesh - 462001",
    trackingId: "DTDC1234567890",
  },
  "ORD-2024-003": {
    id: "ORD-2024-003",
    date: "2024-11-28",
    deliveryDate: "2024-12-01",
    paymentMethod: "Cash on Delivery",
    items: [
      {
        id: "p4",
        name: "Wellness Self-Care Kit",
        price: 999,
        qty: 2,
        image: "/images/h1.png",
        status: "delivered",
        reviewed: false,
      },
    ],
    total: 1998,
    status: "delivered",
    address: "123 MG Road, Indore, Madhya Pradesh - 452001",
    trackingId: "DTDC5555555555",
  },
};

function StatusBadge({ status }) {
  const config = {
    delivered: {
      color: "bg-green-100 text-green-700",
      icon: CheckCircle,
      label: "Delivered",
    },
    shipped: {
      color: "bg-blue-100 text-blue-700",
      icon: Truck,
      label: "Shipped",
    },
    processing: {
      color: "bg-yellow-100 text-yellow-700",
      icon: Clock,
      label: "Processing",
    },
  };
  const s = config[status] || config.processing;
  return (
    <span
      className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-medium ${s.color}`}
    >
      <s.icon className="w-3 h-3" />
      <span>{s.label}</span>
    </span>
  );
}

function ReviewModal({ productName, onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (rating === 0) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ rating, comment });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Write Review</h3>
            <p className="text-xs text-gray-500 mt-0.5">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Your Rating
            </label>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-2 text-sm text-gray-500">
                  {rating === 1
                    ? "Poor"
                    : rating === 2
                    ? "Fair"
                    : rating === 3
                    ? "Good"
                    : rating === 4
                    ? "Very Good"
                    : "Excellent"}
                </span>
              )}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Your Review
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              placeholder="Tell us about your experience with this product..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A62] focus:border-transparent resize-none bg-[#FFF8F6]"
            />
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 p-5 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0 || submitting}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
              rating === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-[#8B3A62] text-white hover:bg-[#6E2D4D]"
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{submitting ? "Submitting..." : "Submit Review"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ReturnModal({ productName, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const reasons = [
    "Product damaged or defective",
    "Wrong item received",
    "Product not as described",
    "Quality not as expected",
    "Changed my mind",
    "Other",
  ];

  const handleSubmit = () => {
    if (!reason) return;
    setSubmitting(true);
    setTimeout(() => {
      onSubmit({ reason, description });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Return Product</h3>
            <p className="text-xs text-gray-500 mt-0.5">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-5 space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Reason for Return
            </label>
            <div className="space-y-2">
              {reasons.map((r) => (
                <label
                  key={r}
                  className={`flex items-center space-x-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    reason === r
                      ? "border-[#8B3A62] bg-[#FDF5F3]"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="returnReason"
                    value={r}
                    checked={reason === r}
                    onChange={() => setReason(r)}
                    className="w-4 h-4 text-[#8B3A62] focus:ring-[#8B3A62]"
                  />
                  <span className="text-sm text-gray-700">{r}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Additional Details (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Provide more details about your return request..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#8B3A62] focus:border-transparent resize-none bg-[#FFF8F6]"
            />
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
            <p className="text-xs text-yellow-700">
              Returns are accepted within 7 days of delivery. Refund will be
              processed within 5-7 business days after the product is received.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end space-x-3 p-5 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!reason || submitting}
            className={`px-5 py-2.5 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-all ${
              !reason
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>{submitting ? "Submitting..." : "Request Return"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function SuccessToast({ message, onClose }) {
  return (
    <div className="fixed top-6 right-6 z-50">
      <div className="bg-green-600 text-white px-5 py-3 rounded-xl shadow-lg flex items-center space-x-3">
        <CheckCircle className="w-5 h-5" />
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:text-green-200">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function OrderDetailPage({ params }) {
  const { orderId } = use(params);
  const router = useRouter();
  const [order, setOrder] = useState(mockOrders[orderId] || null);
  const [reviewModal, setReviewModal] = useState(null);
  const [returnModal, setReturnModal] = useState(null);
  const [toast, setToast] = useState(null);

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FDF5F3] flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Order Not Found
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            The order you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/account?tab=orders"
            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-[#8B3A62] text-white text-sm font-semibold hover:bg-[#6E2D4D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Orders</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = ({ rating, comment }) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === reviewModal.productId
          ? { ...item, reviewed: true, review: { rating, comment } }
          : item
      ),
    }));
    setReviewModal(null);
    setToast("Review submitted successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  const handleReturnSubmit = ({ reason, description }) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === returnModal.productId
          ? { ...item, returnRequested: true, returnReason: reason }
          : item
      ),
    }));
    setReturnModal(null);
    setToast("Return request submitted successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDF5F3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/account?tab=orders"
          className="inline-flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-[#8B3A62] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Orders</span>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            <p className="text-sm text-gray-500 mt-1">
              Order {order.id} placed on{" "}
              {new Date(order.date).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                Order Items ({order.items.length})
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 bg-[#FDF5F3] rounded-xl"
                  >
                    <div className="w-full sm:w-24 h-24 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-10 h-10 text-[#8B3A62] opacity-40" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">
                            Qty: {item.qty} &middot; ₹
                            {item.price.toLocaleString("en-IN")} each
                          </p>
                        </div>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-sm font-bold text-[#8B3A62] mt-2">
                        ₹{(item.price * item.qty).toLocaleString("en-IN")}
                      </p>

                      {item.reviewed && item.review && (
                        <div className="mt-3 p-3 bg-white rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-1 mb-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3 h-3 ${
                                  s <= item.review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-xs text-gray-600">
                            {item.review.comment}
                          </p>
                        </div>
                      )}

                      {item.returnRequested && (
                        <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-xs font-medium text-red-700 flex items-center space-x-1">
                            <RotateCcw className="w-3 h-3" />
                            <span>Return requested &middot; {item.returnReason}</span>
                          </p>
                        </div>
                      )}

                      <div className="flex items-center space-x-3 mt-3">
                        {item.status === "delivered" && !item.reviewed && !item.returnRequested && (
                          <>
                            <button
                              onClick={() =>
                                setReviewModal({
                                  productId: item.id,
                                  productName: item.name,
                                })
                              }
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#8B3A62] text-white hover:bg-[#6E2D4D] transition-colors"
                            >
                              <Star className="w-3 h-3" />
                              <span>Write Review</span>
                            </button>
                            <button
                              onClick={() =>
                                setReturnModal({
                                  productId: item.id,
                                  productName: item.name,
                                })
                              }
                              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Return</span>
                            </button>
                          </>
                        )}
                        {item.returnRequested && (
                          <span className="text-xs text-red-600 font-medium">
                            Return in progress
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{(order.total * 0.9).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">GST (18%)</span>
                  <span className="font-medium text-gray-900">
                    ₹{(order.total * 0.1).toFixed(0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-100 pt-3 flex justify-between">
                  <span className="text-sm font-bold text-gray-900">Total</span>
                  <span className="text-sm font-bold text-[#8B3A62]">
                    ₹{order.total.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                Delivery Address
              </h2>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-[#8B3A62] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{order.address}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 p-5">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">
                Payment & Tracking
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-4 h-4 text-[#8B3A62] flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    {order.paymentMethod}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="w-4 h-4 text-[#8B3A62] flex-shrink-0" />
                  <p className="text-sm text-gray-600">
                    Tracking: {order.trackingId}
                  </p>
                </div>
                {order.deliveryDate && (
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <p className="text-sm text-gray-600">
                      Delivered on{" "}
                      {new Date(order.deliveryDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {reviewModal && (
        <ReviewModal
          productName={reviewModal.productName}
          onClose={() => setReviewModal(null)}
          onSubmit={handleReviewSubmit}
        />
      )}

      {returnModal && (
        <ReturnModal
          productName={returnModal.productName}
          onClose={() => setReturnModal(null)}
          onSubmit={handleReturnSubmit}
        />
      )}

      {toast && <SuccessToast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
}
