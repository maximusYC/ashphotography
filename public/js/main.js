document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    formStatus.textContent = "Sending...";
    formStatus.style.color = "#999";

    try {
      const resp = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await resp.json();

      if (!resp.ok) throw new Error(data.error || "Network error");

      formStatus.textContent = data.message;
      formStatus.style.color = "#4CAF50";
      contactForm.reset();

      setTimeout(() => {
        formStatus.textContent = "";
      }, 3000);
    } catch (error) {
      console.error(error);
      formStatus.textContent = error.message || "Failed to send message. Try again.";
      formStatus.style.color = "#f44336";
    }
  });

   // Optional: keep your fade-in animations
  const photoItems = document.querySelectorAll('.photo-item');
  photoItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    setTimeout(() => {
      item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, 100 * index);
  });


  const albumCards = document.querySelectorAll('.album-card');
  albumCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 150 * index);
  });


});