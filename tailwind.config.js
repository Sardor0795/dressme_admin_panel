/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBorderColor: "#f2f2f2",
        borderColor: "#e2e2e2",
        borderGrayColor: "#707070",
        lightBgColor: "#fcfcfc",
        paginationBackground: "#f8f8f8",
        textLightColor: "#a1a1a1",
        textBlackColor: "#000000",
        textBlueColor: "#007dca",
        textRedColor: "#d50000",
        yandexNavbar: " rgba(255, 255, 255, 0.8)",

        //Weather Colors
        weatherSpringColor: "#008f0e",
        weatherSummerColor: "#eaa700",
        weatherAutumnColor: "#e17a02",
        weatherWinterColor: "#007dca",
        //  Wears colors group
        UpperWear: "#FF9500",
        LowerWear: "#00c2ff",
        headWear: "#347ae2",
        ShoesWear: "#77b50a",
        Accessory: "#b50a48",
        MonthTextColor: "#7c8db5",
        // Reviews
        tableTextTitle: "#3f6175",
        tableTextTitle2: "#2c2c2c",
        ProductReplyBg: "#f4f6fb",
        mobileTextColor: "#303030",
        borderColor2: "#c5c5c5",
        bgColor: "#fdfdfd",
        LocationSelectBg: "#f7f7f7",
        // AddLocation
        btnLightBlueColor: "#e6f2f9",
        photoBg: "#fbfdff",
        addLocationTextcolor: "#F4A622",
        addLocBorderRight: "#E8E8E8",
        deleteColor: "#FF2B2B",
        checkboxBorder: "#D2D2D2",
        addWearColorText: "#23B632",
        // magazine Mobile device
        locationBg: "#FBEAD7",
        locationText: "#D89412",
        Editbg: "#E8F5FD",

        redText: "#FF4343",
      },
      fontFamily: {
        // 500
        AeonikProMedium: ["AeonikPro-Medium"], // 400
        // 400
        AeonikProRegular: ["AeonikPro-Regular"], // 500
      },
    },
    screens: {
      ss: "320px",
      ls: "360px",
      ll: "390px",
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
      xxxl: "1750px",
    },
  },
  plugins: [],
};
