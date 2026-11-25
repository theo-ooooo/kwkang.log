import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import profile from "@/data/profile.json";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="site-frame">
      <Header githubUrl={profile.links.github} />
      <main id="main-content" className="site-main site-container" tabIndex={-1}>{children}</main>
      <Footer />
    </div>
  );
}
