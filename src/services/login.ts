import { useRouter } from "next/navigation";

  export async function handleSubmit(e: React.FormEvent, setError: React.Dispatch<React.SetStateAction<string | null>>, router: ReturnType<typeof useRouter>, username: string, password: string) {
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
        return;
      }
      router.push('/');
    } catch (err: any) {
      setError(err?.message ?? String(err));
    }
  }