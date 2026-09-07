import Link from "next/link";
import profile from "@/data/profile.json";

export default function Footer() {
  return (
    <footer className="site-footer site-container">
      <Link href="/" className="footer-brand">kwkang.log</Link>
      <span className="footer-copyright">© {new Date().getFullYear()} {profile.nameEn}</span>
      <div className="footer-links">
        <a href={profile.links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={`mailto:${profile.links.email}`}>Email</a>
      </div>
    </footer>
  );
}
