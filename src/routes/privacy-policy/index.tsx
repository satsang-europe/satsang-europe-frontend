import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";

const CONTACT_EMAIL = "info@satsangeurope.org";

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const opensNewTab = href.startsWith("https://");

  return (
    <a
      href={href}
      rel={opensNewTab ? "noreferrer" : undefined}
      target={opensNewTab ? "_blank" : undefined}
    >
      {children}
      {opensNewTab ? <span aria-hidden="true"> ↗</span> : null}
    </a>
  );
}

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section
      aria-labelledby={`${id}-heading`}
      className="policy-section"
      id={id}
    >
      <h2 id={`${id}-heading`}>{title}</h2>
      <div className="section-content">{children}</div>
    </section>
  );
}

const pageStyles = `
  .privacy-page,
  .privacy-page * {
    box-sizing: border-box;
  }

  .privacy-page {
    --page-bg: #f5f7f4;
    --surface: #ffffff;
    --text: #202923;
    --muted: #56635b;
    --accent: #7b5200;
    --accent-bg: #eef3e9;
    --rule: #d9e1d8;
    background: var(--page-bg);
    color: var(--text);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-size: 16px;
    line-height: 1.7;
    min-height: 100vh;
    padding: 32px 20px 56px;
  }

  .privacy-page a {
    color: #185c49;
    font-weight: 600;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
  }

  .privacy-page a:hover {
    color: #103d31;
  }

  .privacy-page a:focus-visible {
    border-radius: 2px;
    outline: 3px solid #bd8a22;
    outline-offset: 3px;
  }

  .skip-link {
    left: 12px;
    padding: 8px 12px;
    position: absolute;
    top: -60px;
    z-index: 1;
  }

  .skip-link:focus {
    background: var(--surface);
    top: 12px;
  }

  .policy-shell {
    margin: 0 auto;
    max-width: 820px;
  }

  .policy-header {
    border-bottom: 1px solid var(--rule);
    padding: 28px 0 30px;
  }

  .eyebrow {
    color: var(--accent);
    font-size: 13px;
    font-weight: 700;
    margin: 0 0 8px;
    text-transform: uppercase;
  }

  .policy-header h1 {
    font-size: 36px;
    line-height: 1.2;
    margin: 0;
  }

  .updated {
    color: var(--muted);
    font-size: 14px;
    margin: 10px 0 0;
  }

  .introduction {
    color: var(--muted);
    font-size: 18px;
    line-height: 1.65;
    margin: 22px 0 0;
    max-width: 700px;
  }

  .summary {
    background: var(--accent-bg);
    border-left: 4px solid #64834c;
    margin: 28px 0;
    padding: 18px 22px;
  }

  .summary h2 {
    font-size: 18px;
    margin: 0 0 4px;
  }

  .summary p {
    color: var(--muted);
    margin: 0;
  }

  .contents {
    border-bottom: 1px solid var(--rule);
    padding: 8px 0 24px;
  }

  .contents h2 {
    font-size: 18px;
    margin: 0 0 10px;
  }

  .contents ul {
    columns: 2;
    margin: 0;
    padding-left: 20px;
  }

  .contents li {
    break-inside: avoid;
    margin: 3px 20px 3px 0;
  }

  .policy-section {
    border-bottom: 1px solid var(--rule);
    padding: 25px 0;
    scroll-margin-top: 20px;
  }

  .policy-section h2 {
    font-size: 21px;
    line-height: 1.35;
    margin: 0 0 10px;
  }

  .section-content p {
    color: var(--muted);
    margin: 0 0 12px;
  }

  .section-content p:last-child {
    margin-bottom: 0;
  }

  .policy-footer {
    color: var(--muted);
    padding-top: 24px;
  }

  .policy-footer p {
    margin: 0 0 8px;
  }

  @media (max-width: 600px) {
    .privacy-page {
      padding: 16px 18px 40px;
    }

    .policy-header {
      padding-top: 24px;
    }

    .policy-header h1 {
      font-size: 30px;
    }

    .introduction {
      font-size: 17px;
    }

    .contents ul {
      columns: 1;
    }

    .policy-section {
      padding: 22px 0;
    }
  }

  @media (prefers-reduced-motion: no-preference) {
    .policy-shell {
      animation: policy-enter 240ms ease-out both;
    }

    @keyframes policy-enter {
      from {
        opacity: 0;
        transform: translateY(6px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export const Route = createFileRoute("/privacy-policy/")({
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <>
      <style>{pageStyles}</style>

      <main className="privacy-page" lang="en">
        <a className="skip-link" href="#policy-content">
          Skip to privacy policy
        </a>

        <article className="policy-shell" id="policy-content">
          <header className="policy-header">
            <p className="eyebrow">Satsang Europe</p>
            <h1>Privacy Policy</h1>
            <p className="updated">Last updated: 27 September 2026</p>
            <p className="introduction">
              SATSANG EUROPE is designed to provide devotional content while
              collecting as little personal data as possible.
            </p>
          </header>

          <aside aria-labelledby="summary-heading" className="summary">
            <h2 id="summary-heading">Privacy at a glance</h2>
            <p>
              No account, advertising, analytics or tracking. We do not sell
              personal data. Your Istavrity date stays on your device.
            </p>
          </aside>

          <nav aria-label="Privacy policy sections" className="contents">
            <h2>Contents</h2>
            <ul>
              <li>
                <a href="#controller">Who is responsible</a>
              </li>
              <li>
                <a href="#device">Information on your device</a>
              </li>
              <li>
                <a href="#internet">Internet connections</a>
              </li>
              <li>
                <a href="#notifications">Notifications</a>
              </li>
              <li>
                <a href="#purposes">Purposes and legal bases</a>
              </li>
              <li>
                <a href="#retention">How long information is kept</a>
              </li>
              <li>
                <a href="#transfers">Recipients and transfers</a>
              </li>
              <li>
                <a href="#rights">Your data protection rights</a>
              </li>
              <li>
                <a href="#changes">Changes to this notice</a>
              </li>
            </ul>
          </nav>

          <PolicySection id="controller" title="Who is responsible">
            <p>
              Satsang Europe is responsible for this app and acts as the data
              controller where it processes personal data. For privacy questions
              or requests, contact{" "}
              <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </ExternalLink>
              .
            </p>
          </PolicySection>

          <PolicySection id="device" title="Information kept on your device">
            <p>
              Your selected Istavrity starting date, reminder preference and
              local notification schedules are stored in the app&apos;s private
              storage. The prayer PDF and upcoming-event content may also be
              cached locally so the app uses less data and loads faster.
              Notification content and your read/unread status may also be
              cached on your device.
            </p>
            <p>
              This local information is not sent to Satsang Europe. You can
              change the date, switch reminders off, clear the app&apos;s data
              or uninstall the app to remove it.
            </p>
          </PolicySection>

          <PolicySection
            id="internet"
            title="When the app connects to the internet"
          >
            <p>
              The app contacts Satsang Europe&apos;s backend hosted by Render to
              load event and notification information, and Google Cloud Storage
              to download the prayer PDF. If you choose Join Zoom, the Zoom app
              or website opens only after you tap the link.
            </p>
            <p>
              These services may receive technical request data such as your IP
              address, request time, device or browser information and network
              diagnostics needed to deliver and secure their services. Your
              Istavrity date is not included in these requests.
            </p>
            <p>
              Read the providers&apos; privacy information:{" "}
              <ExternalLink href="https://render.com/privacy">
                Render privacy policy
              </ExternalLink>
              ,{" "}
              <ExternalLink href="https://policies.google.com/privacy">
                Google privacy policy
              </ExternalLink>
              , and{" "}
              <ExternalLink href="https://www.zoom.com/en/trust/privacy/privacy-statement/">
                Zoom privacy statement
              </ExternalLink>
              .
            </p>
          </PolicySection>

          <PolicySection id="notifications" title="Notifications">
            <p>
              Prayer and Istavrity reminders are optional local notifications
              scheduled by your device. The app asks for notification permission
              only after you choose to enable a reminder. You can withdraw
              permission by switching reminders off or changing the app&apos;s
              notification settings on your device.
            </p>
            <p>
              If you enable Satsang Europe push updates, the app creates an
              app-specific Expo push token and sends only that token and your
              platform (iOS or Android) to the Satsang Europe backend. The token
              is not linked to an app account, name, email address or
              advertising identifier. It is used only to deliver the updates you
              requested through Expo and the Apple or Google notification
              service.
            </p>
            <p>
              The subscription remains active until you switch push
              notifications off, uninstall the app, or the notification service
              reports that the device is no longer registered. Learn more in the{" "}
              <ExternalLink href="https://expo.dev/privacy">
                Expo privacy policy
              </ExternalLink>
              .
            </p>
          </PolicySection>

          <PolicySection id="purposes" title="Purposes and legal bases">
            <p>
              We use limited technical request data where necessary to provide,
              maintain and secure app content. Our legal basis is our legitimate
              interest in operating a reliable nonprofit service. Where consent
              is required, such as optional device permissions, we rely on your
              consent and you may withdraw it at any time. The app does not use
              automated decision-making or profiling.
            </p>
          </PolicySection>

          <PolicySection id="retention" title="How long information is kept">
            <p>
              The event cache is refreshed after 24 hours. Notification content
              is cached on your device for 15 minutes before it is refreshed;
              active notifications stop appearing after their server-provided
              expiry. The saved Istavrity date, reminder setting and downloaded
              prayer PDF stay in the app&apos;s private storage until changed,
              disabled, cleared or the app is uninstalled. External hosting
              providers may keep technical logs for the periods described in
              their own privacy policies or as required by law.
            </p>
          </PolicySection>

          <PolicySection
            id="transfers"
            title="Recipients and international transfers"
          >
            <p>
              Render, Google and Zoom may process technical data in countries
              outside the European Economic Area. Push notification delivery
              also involves Expo and the Apple or Google notification service.
              Where the GDPR applies, such transfers must use a lawful
              safeguard, such as an adequacy decision or approved contractual
              protections. The providers&apos; privacy notices explain their
              processing and safeguards.
            </p>
          </PolicySection>

          <PolicySection id="rights" title="Your data protection rights">
            <p>
              Where applicable under the GDPR, you may request access,
              correction, deletion, restriction or portability of personal data,
              object to processing based on legitimate interests, and withdraw
              consent without affecting earlier lawful processing. Because most
              app data stays only on your device, Satsang Europe may not hold
              information that can identify you.
            </p>
            <p>
              You may also lodge a complaint with the data protection authority
              in your country. Contact us first if you would like help
              exercising your rights. Find an authority through the{" "}
              <ExternalLink href="https://www.edpb.europa.eu/about-edpb/about-edpb/members_en">
                European data protection authorities
              </ExternalLink>
              .
            </p>
          </PolicySection>

          <PolicySection id="changes" title="Changes to this notice">
            <p>
              We may update this notice when app features or legal requirements
              change. The revised notice and its new update date will appear on
              this page.
            </p>
          </PolicySection>

          <footer className="policy-footer">
            <p>
              Privacy questions:{" "}
              <ExternalLink href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </ExternalLink>
            </p>
            <p>
              This app is provided by Satsang Europe for the benefit of all
              seekers.
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
