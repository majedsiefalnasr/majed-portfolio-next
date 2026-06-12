import { SocialLinks } from "@/components/shared/SocialLinks";
import { CvLinks } from "@/components/shared/CvLinks";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="mt-auto px-5 sm:px-8">
      {/* Centered stack per the Figma: social icons over the copyright. */}
      <div className="mx-auto flex max-w-page flex-col items-center gap-6 py-10">
        <SocialLinks />
        <CvLinks />
        <p className="text-sm text-body">
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
