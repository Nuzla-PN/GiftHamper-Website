import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCustomization,
  toggleAddon,
} from "../features/customization/customizationSlice";

const CustomizeProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.products.items.find((p) => p.id === id)
  );

  const { customizations, selectedAddons } = useSelector(
    (state) => state.customization
  );

  if (!product) return <div>Product not found</div>;

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const total = product.price + addonsTotal;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 p-4 md:p-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 hover:text-black"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold">Customize Your Gift 🎁</h1>
        <div />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">

          {/* PRODUCT CARD */}
          <div className="bg-white rounded-2xl shadow-md p-4 flex gap-4">
            <img
              src={product.image[0]}
              alt={product.title}
              className="w-32 h-32 object-cover rounded-xl"
            />
            <div>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-500 text-sm mb-2">
                Beautifully curated hamper
              </p>
              <p className="font-bold text-lg">₹{product.price}</p>
            </div>
          </div>

          {/* CUSTOMIZATION CARD */}
          {product.customizations?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4">
                ✏️ Personalize Your Gift
              </h3>

              <div className="space-y-4">
                {product.customizations.map((field, index) => (
                  <div key={index}>

                    {/* TEXT */}
                    {field.type === "text" && (
                      <input
                        type="text"
                        placeholder={field.label}
                        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-300 outline-none transition"
                        onChange={(e) =>
                          dispatch(
                            setCustomization({
                              key: field.key,
                              value: e.target.value,
                            })
                          )
                        }
                      />
                    )}

                    {/* DROPDOWN */}
                    {field.type === "dropdown" && (
                      <select
                        className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-pink-300 outline-none"
                        onChange={(e) =>
                          dispatch(
                            setCustomization({
                              key: field.key,
                              value: e.target.value,
                            })
                          )
                        }
                      >
                        <option value="">Select {field.label}</option>
                        {field.options.map((opt, i) => (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ADDONS CARD */}
          {product.addons?.length > 0 && (
            <div className="bg-white rounded-2xl shadow-md p-5">
              <h3 className="text-lg font-semibold mb-4">
                ➕ Make it Special
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {product.addons.map((addon, index) => (
                  <label
                    key={index}
                    className="flex items-center justify-between border rounded-xl p-3 cursor-pointer hover:shadow transition"
                  >
                    <div>
                      <p className="font-medium">{addon.name}</p>
                      <p className="text-sm text-gray-500">
                        +₹{addon.price}
                      </p>
                    </div>

                    <input
                      type="checkbox"
                      className="accent-pink-500 w-5 h-5"
                      onChange={() => dispatch(toggleAddon(addon))}
                    />
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT - STICKY SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-5 h-fit sticky top-6">

          <h3 className="text-lg font-semibold mb-4">🧾 Order Summary</h3>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Base Price</span>
              <span>₹{product.price}</span>
            </div>

            <div className="flex justify-between">
              <span>Add-ons</span>
              <span>₹{addonsTotal}</span>
            </div>

            <hr />

            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="mt-6 space-y-3">
            <button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              Add to Cart
            </button>

            <button className="w-full border py-3 rounded-xl font-medium hover:bg-gray-50">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomizeProduct;