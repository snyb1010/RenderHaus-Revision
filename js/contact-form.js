document.addEventListener('DOMContentLoaded', () => {
  // ✅ Initialize EmailJS
  emailjs.init('sdpDDccxCa63DYaf2'); // Replace with your own public key

  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = this;
    const requiredFields = form.querySelectorAll("[required]");
    let isValid = true;

    // Reset previous error styles
    requiredFields.forEach((field) => {
      field.classList.remove("border-red-500");
    });

    // Regex validations
    const nameRegex = /^[A-Za-z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9\-\s]{6,20}$/;
    const countryCodeRegex = /^\+\d{1,4}$/;

    // Validate individual fields
    const firstName = form.querySelector('input[name="first_name"]');
    if (!firstName.value.trim() || !nameRegex.test(firstName.value.trim())) {
      isValid = false;
      firstName.classList.add("border-red-500");
    }

    const lastName = form.querySelector('input[name="last_name"]');
    if (!lastName.value.trim() || !nameRegex.test(lastName.value.trim())) {
      isValid = false;
      lastName.classList.add("border-red-500");
    }

    const email = form.querySelector('input[name="email"]');
    if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
      isValid = false;
      email.classList.add("border-red-500");
    }

    const countryCode = form.querySelector('input[name="countryCode"]');
    if (!countryCode.value.trim() || !countryCodeRegex.test(countryCode.value.trim())) {
      isValid = false;
      countryCode.classList.add("border-red-500");
    }

    const phone = form.querySelector('input[name="phone"]');
    if (!phone.value.trim() || !phoneRegex.test(phone.value.trim())) {
      isValid = false;
      phone.classList.add("border-red-500");
    }

    // ✅ Validate required <select> fields
    const selects = form.querySelectorAll("select[required]");
    selects.forEach(select => {
      if (!select.value.trim()) {
        isValid = false;
        select.classList.add("border-red-500");
      } else {
        select.classList.remove("border-red-500");
      }
    });

    // ✅ Validate <textarea> (message)
    const message = form.querySelector('textarea[name="message"]');
    if (!message.value.trim()) {
      isValid = false;
      message.classList.add("border-red-500");
    } else {
      message.classList.remove("border-red-500");
    }

    // ✅ Validate radio groups
    const radioGroups = ["editor"];
    radioGroups.forEach((name) => {
      const radios = form.querySelectorAll(`input[name="${name}"]`);
      const oneChecked = [...radios].some(r => r.checked);
      if (!oneChecked) {
        isValid = false;
        radios.forEach(radio => {
          const label = radio.closest("label");
          if (label) label.classList.add("text-red-500");
        });
      } else {
        radios.forEach(radio => {
          const label = radio.closest("label");
          if (label) label.classList.remove("text-red-500");
        });
      }
    });

    // ❌ Show error toast if invalid
    if (!isValid) {
      const errorBox = document.getElementById("error-message");
      errorBox.innerText = "❌ Please enter valid details in all required fields.";
      errorBox.classList.remove("hidden", "opacity-0");
      errorBox.classList.add("opacity-100");

      setTimeout(() => {
        errorBox.classList.remove("opacity-100");
        errorBox.classList.add("opacity-0");
        setTimeout(() => errorBox.classList.add("hidden"), 500);
      }, 1500);
      return;
    }

    // ✅ Send Email using EmailJS
    emailjs.sendForm('service_n0s2v1u', 'template_fsz5wvi', form)
      .then(() => {
        const successBox = document.getElementById("success-message");
        successBox.innerText = "✅ Message sent successfully!";
        successBox.classList.remove("hidden", "opacity-0");
        successBox.classList.add("opacity-100");

        setTimeout(() => {
          successBox.classList.remove("opacity-100");
          successBox.classList.add("opacity-0");
          setTimeout(() => successBox.classList.add("hidden"), 500);
        }, 2000);

        form.reset();
      }, (error) => {
        console.error("EmailJS Error:", error);

        const errorBox = document.getElementById("error-message");
        errorBox.innerText = "❌ Failed to send. Please try again later.";
        errorBox.classList.remove("hidden", "opacity-0");
        errorBox.classList.add("opacity-100");

        setTimeout(() => {
          errorBox.classList.remove("opacity-100");
          errorBox.classList.add("opacity-0");
          setTimeout(() => errorBox.classList.add("hidden"), 500);
        }, 5000);
      });
  });
});
