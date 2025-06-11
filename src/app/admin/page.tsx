"use client";
import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabaseClient';
import { BlogPost } from '@/types/blog';
import styled from 'styled-components';

const AdminWrap = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: 48px 16px 96px 16px;
  color: #fff;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 32px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
  background: #18181c;
  border-radius: 12px;
  padding: 32px;
  margin-bottom: 48px;
`;
const Input = styled.input`
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-size: 1rem;
`;
const TextArea = styled.textarea`
  background: #111;
  border: 1px solid #222;
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-size: 1rem;
  min-height: 120px;
`;
const Button = styled.button`
  background: #00ff6a;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 8px;
`;
const ErrorMsg = styled.div`
  color: #ff5e62;
  margin-bottom: 12px;
`;
const PostList = styled.div`
  margin-top: 32px;
`;
const PostItem = styled.div`
  background: #222;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
`;

export default function AdminPage() {
  const [user, setUser] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '', slug: '', excerpt: '', content: '', cover_image: '', meta_title: '', meta_description: '', meta_keywords: '', author: ''
  });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null);
      setLoading(false);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    setPosts(data || []);
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const { error } = await supabase.from('blogs').insert([{ ...form, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }]);
    if (error) setError(error.message);
    else {
      setForm({ title: '', slug: '', excerpt: '', content: '', cover_image: '', meta_title: '', meta_description: '', meta_keywords: '', author: '' });
      fetchPosts();
    }
    setSubmitting(false);
  }

  if (loading) return <AdminWrap>Loading...</AdminWrap>;
  if (!user) {
    return (
      <AdminWrap>
        <Title>Admin Login</Title>
        {error && <ErrorMsg>{error}</ErrorMsg>}
        <Form onSubmit={handleLogin}>
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button type="submit">Login</Button>
        </Form>
      </AdminWrap>
    );
  }

  return (
    <AdminWrap>
      <Title>Publish New Blog Post</Title>
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <Form onSubmit={handleSubmit}>
        <Input value={form.title} onChange={e => setForm(f => ({ ...f, title: (e.target as HTMLInputElement).value }))} placeholder="Title" required />
        <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: (e.target as HTMLInputElement).value }))} placeholder="Slug (unique, e.g. my-first-post)" required />
        <Input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: (e.target as HTMLInputElement).value }))} placeholder="Excerpt" required />
        <TextArea value={form.content} onChange={e => setForm(f => ({ ...f, content: (e.target as HTMLTextAreaElement).value }))} placeholder="Content (HTML or Markdown)" required />
        <Input value={form.cover_image} onChange={e => setForm(f => ({ ...f, cover_image: (e.target as HTMLInputElement).value }))} placeholder="Cover Image URL (optional)" />
        <Input value={form.meta_title} onChange={e => setForm(f => ({ ...f, meta_title: (e.target as HTMLInputElement).value }))} placeholder="Meta Title (SEO)" />
        <Input value={form.meta_description} onChange={e => setForm(f => ({ ...f, meta_description: (e.target as HTMLInputElement).value }))} placeholder="Meta Description (SEO)" />
        <Input value={form.meta_keywords} onChange={e => setForm(f => ({ ...f, meta_keywords: (e.target as HTMLInputElement).value }))} placeholder="Meta Keywords (comma separated)" />
        <Input value={form.author} onChange={e => setForm(f => ({ ...f, author: (e.target as HTMLInputElement).value }))} placeholder="Author" required />
        <Button type="submit" disabled={submitting}>{submitting ? 'Publishing...' : 'Publish'}</Button>
      </Form>
      <Title>Existing Blog Posts</Title>
      <PostList>
        {posts.map(post => (
          <PostItem key={post.id}>
            <b>{post.title}</b> <span style={{ color: '#bbb' }}>({post.slug})</span>
            <div style={{ fontSize: '0.95rem', color: '#888' }}>{new Date(post.created_at).toLocaleDateString()} &mdash; {post.author}</div>
          </PostItem>
        ))}
      </PostList>
    </AdminWrap>
  );
} 