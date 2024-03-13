export default {
  mounted(el, binding) {
    const clickOutsideHandler = (event) => {
      if (el && !el.contains(event.target)) {
        binding.value(event); // Call the provided function
      }
    };

    document.addEventListener('click', clickOutsideHandler);

    el.__clickOutsideHandler = clickOutsideHandler; // Store for cleanup
  },
  unmounted(el) {
    if (el.__clickOutsideHandler) {
      document.removeEventListener('click', el.__clickOutsideHandler);
      delete el.__clickOutsideHandler;
    }
  },
};