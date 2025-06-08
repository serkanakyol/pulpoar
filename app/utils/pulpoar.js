export function buildPulpoarScriptUrl()
{
  const baseUrl = process.env.PULPOAR_SCRIPT_BASE_URL || "";
  const params = new URLSearchParams();
  return `${baseUrl}?${params.toString()}`;
  //return `${baseUrl}?shop=${encodeURIComponent(shopDomain)}`;
}
