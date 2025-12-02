document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    // Close others
    document.querySelectorAll('.faq-item').forEach(other => {
      if (other !== item) other.classList.remove('active');
    });

    // Toggle current
    item.classList.toggle('active');
  });
});
