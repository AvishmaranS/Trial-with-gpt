'use client';

import { FormEvent, useState } from 'react';

export function ContactForm() {
  const [status, setStatus] = useState('');

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setStatus(res.ok ? 'Message sent successfully.' : 'Unable to send message.');
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={onSubmit} className="surface mx-auto max-w-2xl space-y-4 p-8">
      <input required name="name" placeholder="Name" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
      <input required type="email" name="email" placeholder="Email" className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
      <textarea required name="message" placeholder="Message" rows={5} className="w-full rounded-lg border border-white/15 bg-transparent p-3" />
      <button className="rounded-full bg-white/10 px-6 py-2 transition hover:bg-white/20">Send</button>
      {status && <p className="text-sm text-textSecondary">{status}</p>}
    </form>
  );
}
