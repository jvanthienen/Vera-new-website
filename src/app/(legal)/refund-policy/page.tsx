import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - Paddle Web Payments Starter",
  description: "Refund Policy",
};

export default function RefundPolicy() {
  return <h1 className="font-serif mt-20 text-center text-4xl font-bold tracking-tight sm:text-5xl">Refund Policy</h1>;
}
