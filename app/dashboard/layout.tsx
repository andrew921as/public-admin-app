import SettingsMenu from "@/components/SettingsMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SettingsMenu />
      {children}
    </>
    )
}
