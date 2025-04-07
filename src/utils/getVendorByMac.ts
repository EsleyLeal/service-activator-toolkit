import { vendorMacs } from "../data/vendorMacs";

export function getVendorByMac(mac: string): string | null {
  const cleaned = mac.toUpperCase().replace(/[^A-F0-9]/g, "");
  const prefix = cleaned.slice(0, 6).match(/.{1,2}/g)?.join(":");
  const found = vendorMacs.find(entry => entry.prefix === prefix);
  return found?.vendor || null;
}
