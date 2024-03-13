export default function MainComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="main">{children}</main>;
}
