function buildPulpoarScriptUrl()
{
  const baseUrl = process.env.PULPOAR_SCRIPT_BASE_URL;
  const params = new URLSearchParams();

  //if (shop) params.append("shop", shop);
  //if (userId) params.append("user_id", userId);

  return `${baseUrl}?${params.toString()}`;
}
