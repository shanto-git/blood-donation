import React, { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { AuthContext } from "../../auth/AuthProvider";
import { useNavigate } from "react-router";

const Donate = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();

    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };

    axiosSecure
      .post("/create-payment-checkout", formData)
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.url;
        document.getElementById("donate_modal").close();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex justify-center my-10">
      <button
        className="btn btn-secondary btn-lg"
        onClick={() => document.getElementById("donate_modal").showModal()}
      >
        Give Fund Now
      </button>
      <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-center mb-4">
            Support Our Cause
          </h3>
          <p className="py-2 text-center text-gray-600">
            Enter the amount you wish to donate to the organization.
          </p>

          <form onSubmit={handleCheckout} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Donation Amount (USD)</span>
              </label>
              <input
                name="donateAmount"
                type="number"
                placeholder="e.g. 50"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="modal-action flex justify-between">
              {/* ক্যানসেল বাটন */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("donate_modal").close()}
              >
                Cancel
              </button>

              {/* সাবমিট বাটন */}
              <button className="btn btn-success text-white px-8" type="submit">
                Proceed to Pay
              </button>
            </div>
          </form>
        </div>

        {/* মোডালের বাইরে ক্লিক করলে বন্ধ হওয়ার জন্য */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Donate;
