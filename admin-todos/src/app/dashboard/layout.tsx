import { Sidebar, TopMenu } from "@/components";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar></Sidebar>
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu></TopMenu>
        <div className="p-6 bg-white m-2 rounded pb-5">{children}</div>
      </div>
    </>
  );
}
