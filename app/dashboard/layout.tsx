import SettingsDropdownMenu from "@/components/SettingsDropdownMenu";
import SettingsMenu from "@/components/SettingsMenu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden md:block">
        <SettingsMenu />
      </div>
      <div className="block md:hidden">
        <SettingsDropdownMenu />
      </div>
      {children}
    </>
    )
}
