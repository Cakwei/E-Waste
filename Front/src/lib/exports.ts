export const url =
  import.meta.env.VITE_DEPLOYMENT_MODE === "prod"
    ? "https://wms-api.cakwei.com"
    : "http://localhost:3000";
