import { useEffect, useState } from "react";

export default function TestDrivePopup({ close }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    model: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Enter a valid email";
    if (form.phone.length < 10) newErrors.phone = "Enter a valid phone number";
    if (!form.model.trim()) newErrors.model = "Preferred car model required";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    alert("Test Drive Request Submitted!");
    close();
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      role="dialog"
      style={{ background: "rgba(0,0,0,0.65)" }}
      onClick={close}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="modal-content border-0 shadow-lg p-3"
          style={{
            background: "#0f1a33",
            color: "white",
            borderRadius: "15px",
          }}
        >
          
          <div className="d-flex justify-content-between align-items-center px-2">
            <h4 className="fw-bold mx-auto">Schedule Test Drive</h4>
            <button className="btn text-white fs-4" onClick={close}>
              ✖
            </button>
          </div>

         
          <form onSubmit={handleSubmit} className="px-3 pb-3">

           
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Name"
                  className="form-control"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />
                {errors.name && (
                  <span className="text-danger small">{errors.name}</span>
                )}
              </div>

              <div className="col-md-6">
                <input
                  type="email"
                  placeholder="E-Mail"
                  className="form-control"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                />
                {errors.email && (
                  <span className="text-danger small">{errors.email}</span>
                )}
              </div>

             
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="form-control"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <span className="text-danger small">{errors.phone}</span>
                )}
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Preferred Car Model"
                  className="form-control"
                  value={form.model}
                  onChange={(e) =>
                    setForm({ ...form, model: e.target.value })
                  }
                />
                {errors.model && (
                  <span className="text-danger small">{errors.model}</span>
                )}
              </div>

              {/* Message */}
              <div className="col-12">
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Message (Preferred date, time, etc.)"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                ></textarea>
                {errors.message && (
                  <span className="text-danger small">{errors.message}</span>
                )}
              </div>
            </div>

           
            <button
              type="submit"
              className="btn btn-primary w-100 mt-4"
              style={{ padding: "10px", borderRadius: "10px" }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
