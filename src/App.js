import { useEffect, useState } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({
    image: "",
    name: "",
    email: "",
    githubusername: "",
  });
  const [ticket, setTicket] = useState({});
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Only JPG and PNG format files can be uploaded.",
      }));
      setPreview(null);
      return;
    }
    // Boyut kontrolü (500 KB = 512000 byte)
    if (file.size > 512000) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "The file size should not exceed 500 KB.",
      }));

      setPreview(null);
      return;
    }
    if (file) {
      setImage(file); // State'i güncelle
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "", // 'image' hatasını temizle
      }));
      setPreview(URL.createObjectURL(file)); // Önizleme için URL oluştur
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    let isValid = true;

    if (!image) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        image: "Please Upload a Photo",
      }));
      isValid = false;
    }
    if (!name) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Please Enter Your Fullname",
      }));
      isValid = false;
    }
    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter your email.",
      }));
      isValid = false;
    } else if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address",
      }));
      isValid = false;
    }
    if (!githubusername) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        githubusername: "Please enter your Github Username",
      }));
      isValid = false;
    }

    if (isValid) {
      const ticketNumber = Math.floor(100000 + Math.random() * 900000);
      const ticket = {
        image,
        name,
        email,
        githubusername,
        ticketNumber,
      };
      setTicket(ticket);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => {
        return (
          word.charAt(0).toLocaleUpperCase("tr-TR") +
          word.slice(1).toLocaleLowerCase("tr-TR")
        );
      })
      .join(" ");
  }

  return (
    <div className="container">
      <div className="left-bottom-svg">
        <img
          src={
            isMobile
              ? "/assets/images/pattern-squiggly-line-bottom-mobile-tablet.svg"
              : "/assets/images/pattern-squiggly-line-bottom-desktop.svg"
          }
          alt="Pattern"
        />
      </div>
      <div className="top-right-svg">
        <img src="/assets/images/pattern-squiggly-line-top.svg" alt="Pattern" />
      </div>
      <div className="center-svg">
        <img src="/assets/images/pattern-circle.svg" alt="Pattern" />
      </div>
      <div className="center-container">
        <div className="header">
          <img src="/assets/images/logo-full.svg" alt="logo"></img>
        </div>
        <h1>
          {Object.keys(ticket).length > 0 ? (
            <div className="gradient-div">
              <span>Congrats, </span>
              <span className="gradient-text">
                {capitalizeWords(ticket.name)}
              </span>
              <span>! Your ticket is ready.</span>
            </div>
          ) : (
            <div className="header-text">
              Your Journey to Coding Conf 2025 Starts Here!
            </div>
          )}
        </h1>
        {Object.keys(ticket).length > 0 || (
          <p> Secure your spot at next year's biggest coding conference.</p>
        )}
        {Object.keys(ticket).length > 0 ? (
          <div className="submit-center-container">
            <div className="submit-info">
              We've emailed your ticket to
              <div>
                <span className="red-text">{ticket.email}</span> and will send
                updates in the run up to the event.
              </div>
            </div>
            <div className="ticket-container">
              {" "}
              <div className="ticket">
                <div className="ticket-head">
                  <div>
                    <img src="/assets/images/logo-mark.svg" alt="Pattern" />
                  </div>
                  <div className="ticket-head-info">
                    <h2>Coding Conf</h2>
                    <p>Jan 31,2025 / Austin, TX</p>
                  </div>
                </div>
                <div className="ticket-footer">
                  <div>
                    <img
                      className="image-avatar"
                      src={URL.createObjectURL(ticket?.image)}
                      alt="Uploaded"
                    ></img>
                  </div>
                  <div className="ticket-footer-right">
                    <div>
                      <p>{capitalizeWords(ticket.name)}</p>
                    </div>
                    <div className="ticket-footer-right-bottom">
                      <div>
                        <img
                          src="/assets/images/icon-github.svg"
                          alt="github icon"
                        ></img>
                      </div>
                      <div className="github-text">
                        @{ticket.githubusername}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ticket-number">
                {ticket.ticketNumber
                  .toString()
                  .split("")
                  .map((digit, index) => (
                    <div key={index}>{digit}</div>
                  ))}
                #
              </div>
            </div>
          </div>
        ) : (
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-row ">
              <div className="form-info "> Upload Avatar</div>
              <div
                className={`form-element upload-element ${
                  errors.image ? "error" : ""
                }`}
              >
                <label htmlFor="file-upload" className="upload-img-container">
                  {preview ? (
                    <img src={preview} alt="Preview" className="preview-img" />
                  ) : (
                    <img
                      src="/assets/images/icon-upload.svg"
                      alt="upload svg"
                    />
                  )}
                </label>

                <input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <p className="upload-text">Drag and drop or click to upload</p>
              </div>
              <div className="footer-info">
                <SVGComponent error={errors.image} />

                {errors.image ? (
                  <div className="error-message">{errors.image}</div>
                ) : (
                  <div> Upload your photo (JPG or PNG, max size: 500KB).</div>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-info">Full Name</div>
              <div className={`form-element ${errors.name ? "error" : ""}`}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </div>
              <div className="footer-info">
                {errors.name && (
                  <>
                    <SVGComponent error={errors.name} />
                    <div className="error-message">{errors.name}</div>
                  </>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-info">Email Address</div>
              <div className={`form-element ${errors.email ? "error" : ""}`}>
                <input
                  type="text"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
              </div>
              <div className="footer-info">
                {errors.email && (
                  <>
                    <SVGComponent error={errors.email} />
                    <div className="error-message">{errors.email}</div>
                  </>
                )}
              </div>
            </div>
            <div className="form-row">
              <div className="form-info">GitHub Username</div>
              <div
                className={`form-element ${
                  errors.githubusername ? "error" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="@yourusername"
                  value={githubusername}
                  onChange={(e) => setGithubusername(e.target.value)}
                ></input>
              </div>
              <div className="footer-info">
                {errors.githubusername && (
                  <>
                    <SVGComponent error={errors.githubusername} />
                    <div className="error-message">{errors.githubusername}</div>
                  </>
                )}
              </div>
            </div>
            <div className="form-row button">
              <div className="form-element form-button" onClick={handleSubmit}>
                Generate My Ticket
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function SVGComponent({ error }) {
  return (
    <svg
      className="info-icon"
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 24 24"
    >
      <path
        fill={error ? "hsl(7, 71%, 60%)" : "hsl(245, 15%, 58%)"}
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z"
      />
    </svg>
  );
}
