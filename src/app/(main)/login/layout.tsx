export default async function Layout({
  header,
  children,
}: Readonly<{
  header: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <>
      {header}
      {children}
    </>
  );
}
