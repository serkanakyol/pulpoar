export function buildPulpoarScriptUrl() {
  const baseUrl = process.env.PULPOAR_SCRIPT_BASE_URL || "";
  const params = new URLSearchParams();

  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  //return `${baseUrl}?shop=${encodeURIComponent(shopDomain)}`;
}
