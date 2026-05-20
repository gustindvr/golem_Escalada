export async function handleSubmit(e: React.FormEvent, setError: React.Dispatch<React.SetStateAction<string | null>>, username: string, password: string) {
  e.preventDefault();
  setError(null);

  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data?.error || 'Login failed');
      return false;
    }

    return true;
  } catch (err: any) {
    setError(err?.message ?? String(err));
    return false;
  }
}
