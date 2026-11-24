import "./globals.css";

export const metadata = {
  title: "Ankit Kothe | DevOps & Cloud Engineer",
  description:
    "Portfolio of Ankit Kothe, MCA candidate focused on DevOps, cloud infrastructure and backend engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
