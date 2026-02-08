import { headers } from "next/headers";

const IP_HEADER_PRIORITY = [
  "cf-connecting-ip",
  "x-client-ip",
  "x-forwarded-for",
  "x-real-ip",
  "x-cluster-client-ip",
  "forwarded-for",
  "forwarded",
];

export async function getIPAddress() {
  const headerList = await headers();
  for (const header of IP_HEADER_PRIORITY) {
    const value = headerList.get(header);
    if (typeof value === "string") {
      const ip = value.split(",")[0].trim();
      if (ip) return ip;
    }
  }
  return "0.0.0.0";
}
