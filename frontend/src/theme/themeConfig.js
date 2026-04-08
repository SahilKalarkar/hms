// frontend/src/themeConfig.js
export const hospitalTheme = {
    token: {
        // Primary color (main teal like your image)
        colorPrimary: "#14b8a6", // teal-500
        colorPrimaryHover: "#0d9488", // teal-600
        colorPrimaryActive: "#0f766e", // teal-700

        // Secondary colors (lighter for borders/ghost)
        colorBgContainer: "#f8fdff", // light cyan bg
        colorBorder: "#a7f3d0", // emerald-200 border

        // Button shadows
        boxShadow: "0 4px 12px rgba(20, 184, 166, 0.15)",
        boxShadowSecondary: "0 2px 8px rgba(20, 184, 166, 0.08)",
    },
    components: {
        Button: {
            defaultShadow: "0 2px 8px rgba(20, 184, 166, 0.12)",
            primaryShadow: "0 4px 12px rgba(20, 184, 166, 0.25)",
            borderRadiusLG: "8px",
        },
    },
};