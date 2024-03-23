const darkTheme = {
  status: "dark",
  colors: {
    main: "#181a1b",
    dark: "#1b1e1f",
    nav: "#1b1e1f",
    primaryText: "rgba(232, 230, 227, 0.95)",
    secondaryText: "rgba(232, 230, 227, 0.55)",
    buttonText: "rgba(232, 230, 227, 0.95)",
    dangerHoverText: "rgba(232, 230, 227, 0.95)",
    warning: "rgba(255, 15, 15, 0.4)",
    warningBorder: "rgb(255, 15, 15)",
    hoverLink: "rgba(232, 230, 227, 0.75)",
    hoverPostLink: "#ed602b",
    shadowColor: "rgba(0, 0, 0, 0.2)",
    inputShadow: "rgba(86, 86, 255, 0.5);",
    primaryButton: "rgb(0, 98, 204)",
    primaryButtonHover: "rgb(0, 82, 171)",
    dangerButton: "#ed4245",
    dangerButtonHover: "#c03537",
    secondaryButton: "rgb(88, 95, 99)",
    successButton: "#5cb85c",
    scrollbarColor: "#444c4c",
    paginationHover: "#27282a",
    greyBorder: "#3b4042",
    tooltip: "#242526",
    textHighlight: "#715b34",
  },
};

export const lightTheme = {
  status: "light",
  colors: {
    ...darkTheme.colors,
    main: "#dedede",
    dark: "#ffffff",
    nav: "#ffffff",
    primaryText: "#313131",
    secondaryText: "#575757",
    buttonText: "rgba(232, 230, 227, 0.95)",
    paginationHover: "#c4c4c4",
    secondaryButton: "rgba(123, 134, 140)",
  },
};

export default darkTheme;
