export const singleStyle = {
  control: (styles, { data, isDisabled, isFocused, isSelected, isBlur }) => ({
    ...styles,
    // borderColor: "#DAA520",
    backgroundColor: "white",
  }),

  option: (styles, { data, isDisabled, isFocused, isSelected, isBlur }) => {
    return {
      ...styles,
      display: "block",
      padding: "10px 15px",
      fontSize: "1.2rem",
      textDecoration: "none",
      color: "#607d7d",
      transition:
        "color 0.3s ease 0s, padding-left 0.3s ease 0s, background-color 0.3s ease 0s",
      borderBottom: "1px solid rgba(96, 125, 125, 0.8)",
      backgroundColor: isSelected ? "#DAA520" : "transparent", // Set red background for selected option
    };
  },
};
