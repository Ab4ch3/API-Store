const handleHttpErrors = (
  res,
  message = "INTERNAL_SERVER_ERROR",
  code = 500
) => {
  res.status(code);
  res.send({
    status: "ERROR",
    data: {
      message: message,
    },
  });
};

export default handleHttpErrors;
