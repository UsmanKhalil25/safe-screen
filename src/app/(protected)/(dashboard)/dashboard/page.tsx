import Link from "next/link";
import { cookies } from "next/headers";
import {
  ArrowUpRight,
  Files,
  HardDrive,
  Share2,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

import { StatCard } from "./components/stat-card";
import { UploadFileDialog } from "./components/upload-file-dialog";
import { FilesListing } from "./components/file-listing";

const storageUsed = 3.2; // GB
const storageTotal = 10; // GB
const storagePercentage = (storageUsed / storageTotal) * 100;

export default async function DashboardPage() {
  const cookieStore = cookies();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
  const response = await fetch(`${BASE_URL}/api/files`, {
    headers: {
      Cookie: (await cookieStore).toString(),
    },
  });

  const data = await response.json();
  console.log("data: ", data);

  const statCards = [
    {
      title: "Storage",
      icon: HardDrive,
      content: (
        <>
          <div className="flex items-baseline gap-1">
            <div className="text-2xl font-bold">{storageUsed} GB</div>
            <div className="text-sm text-muted-foreground">
              / {storageTotal} GB
            </div>
          </div>
          <Progress value={storagePercentage} className="h-1.5 mt-3" />
          <p className="text-xs text-muted-foreground mt-2">
            {(storageTotal - storageUsed).toFixed(1)} GB available
          </p>
        </>
      ),
    },
    {
      title: "Protected Files",
      icon: ShieldCheck,
      content: (
        <>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">12</div>
            <Badge variant="outline" className="text-xs">
              +3 this month
            </Badge>
          </div>
          <div className="mt-4">
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/files">
                View all files <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </>
      ),
    },
    {
      title: "Active Shared Links",
      icon: Share2,
      content: (
        <>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">8</div>
            <Badge variant="outline" className="text-xs">
              3 password protected
            </Badge>
          </div>
          <div className="mt-4">
            <Button variant="link" size="sm" asChild>
              <Link href="/dashboard/links">
                Manage links <ArrowUpRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="h-full flex flex-col gap-6 p-6 pt-0 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your files and secure sharing options.
            </p>
          </div>
          <UploadFileDialog />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {statCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            icon={card.icon}
            content={card.content}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 rounded-xl border bg-card text-card-foreground shadow-sm">
        <FilesListing />
      </div>
    </div>
  );
}
