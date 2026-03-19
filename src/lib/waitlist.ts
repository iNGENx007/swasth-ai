const WAITLIST_ENDPOINT = import.meta.env.VITE_WAITLIST_API_URL ?? "/api/waitlist"

interface WaitlistPayload {
  email: string
  source: string
}

interface WaitlistResponse {
  success?: boolean
  message?: string
}

export async function submitWaitlistSignup({ email, source }: WaitlistPayload) {
  const response = await fetch(WAITLIST_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      source,
      submittedAt: new Date().toISOString(),
      page: typeof window !== "undefined" ? window.location.href : "unknown",
      website: typeof window !== "undefined" ? window.location.hostname : "unknown",
    }),
  })

  const data = (await response.json().catch(() => null)) as WaitlistResponse | null

  if (!response.ok) {
    throw new Error(data?.message ?? "Waitlist submission failed.")
  }

  if (data?.success === false) {
    throw new Error(data.message ?? "Waitlist submission failed.")
  }
}
