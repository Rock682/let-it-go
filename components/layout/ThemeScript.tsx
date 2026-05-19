export function ThemeScript() {
  const script = `(() => {const t=localStorage.getItem('theme');const d=document.documentElement;if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){d.classList.add('dark')}})();`;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
