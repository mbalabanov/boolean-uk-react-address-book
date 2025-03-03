import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";

function ContactsEdit(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [contact, setContact] = useState(null);
  const { setContacts } = props;

  useEffect(() => {
    if (location.state) {
      const { contact } = location.state;
      setContact(contact);
    }
  }, [location]);

  if (!contact) {
    return <p>Loading</p>;
  }
  console.log(contact.type);

  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    if (inputName === "firstName") {
      setContact({ ...contact, firstName: inputValue });
    }
    if (inputName === "lastName") {
      setContact({ ...contact, lastName: inputValue });
    }
    if (inputName === "email") {
      setContact({ ...contact, email: inputValue });
    }
    if (inputName === "linkedin") {
      setContact({ ...contact, linkedin: inputValue });
    }
    if (inputName === "twitter") {
      setContact({ ...contact, twitter: inputValue });
    }
    if (inputName === "street") {
      setContact({ ...contact, street: inputValue });
    }
    if (inputName === "city") {
      setContact({ ...contact, city: inputValue });
    }
    if (inputName === "type") {
      console.log(inputValue);
      setContact({ ...contact, type: inputValue });
    }
  };

  const typeOptions = [
    {
      label: "Work",
      value: "work",
    },
    {
      label: "Personal",
      value: "personal",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const updateContactPostRequest = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };

    try {
      fetch(
        "http://localhost:4000/contacts/" + contact.id,
        updateContactPostRequest
      )
        .then((response) => {
          fetch("http://localhost:4000/contacts")
            .then((res) => res.json())
            .then((data) => {
              setContacts(data);
              navigate("/");
            });
        })
        .then(navigate("/"));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="form-stack contact-form" onSubmit={handleSubmit}>
      <h2>Edit Contact</h2>

      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        required
        value={contact.firstName}
        onChange={handleChange}
      />

      <label htmlFor="lastName">Last Name:</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        required
        value={contact.lastName}
        onChange={handleChange}
      />

      <label htmlFor="type">Work or personal contact:</label>

      <select
        name="type"
        id="type"
        value={contact.type}
        onChange={handleChange}
      >
        {typeOptions.map((typeOption, index) => (
          <option key={index} value={typeOption.value}>
            {typeOption.label}
          </option>
        ))}
      </select>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        value={contact.email}
        onChange={handleChange}
      />

      <label htmlFor="linkedin">Linkedin:</label>
      <input
        id="linkedin"
        name="linkedin"
        type="text"
        required
        value={contact.linkedin}
        onChange={handleChange}
      />

      <label htmlFor="twitter">Twitter:</label>
      <input
        id="twitter"
        name="twitter"
        type="text"
        required
        value={contact.twitter}
        onChange={handleChange}
      />

      <label htmlFor="street">Street:</label>
      <input
        id="street"
        name="street"
        type="text"
        required
        value={contact.street}
        onChange={handleChange}
      />

      <label htmlFor="city">City:</label>
      <input
        id="city"
        name="city"
        type="text"
        required
        value={contact.city}
        onChange={handleChange}
      />

      <div className="actions-section">
        <button className="actionButton" type="submit">
          Update
        </button>
        <span className="actionButton" onClick={(e) => navigate(-1)}>
          Cancel
        </span>
      </div>
    </form>
  );
}

export default ContactsEdit;
