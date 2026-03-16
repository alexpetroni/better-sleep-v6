const handleError = ({ error, event }) => {
  console.error("Server error:", error);
  console.error("URL:", event.url.pathname);
  return {
    message: String(error)
  };
};
export {
  handleError
};
