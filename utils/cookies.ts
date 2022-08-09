export function parseCookies(rawCookie: string) {
  const cookies: any = {}
  rawCookie
    ?.split(";")
    .map(c => {
      const [key, value] = c.split("=")
      cookies[key.trim()] = value?.trim()
    })
  
  return cookies
}

export function clearCookies() {
  document.cookie
    .split(";")
    .forEach((c) => {
      document.cookie = c.replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date()
        .toUTCString() + ";path=/")
    })
}
