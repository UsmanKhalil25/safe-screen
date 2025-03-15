"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FeatureListItem } from "./feature-list-item";

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  interval?: string;
  features: string[];
  buttonText: string;
  variant?: "default" | "inverted";
}

export function PricingCard({
  name,
  description,
  price,
  interval,
  features,
  buttonText,
  variant = "default",
}: PricingCardProps) {
  const isInverted = variant === "inverted";

  return (
    <motion.div
      className={`flex flex-col justify-between rounded-lg border ${
        isInverted ? "bg-primary" : "bg-background"
      } p-6 shadow-sm h-full`}
      whileHover={{ scale: isInverted ? 1.05 : 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <h3
          className={`text-2xl font-bold ${
            isInverted ? "text-primary-foreground" : ""
          }`}
        >
          {name}
        </h3>
        <p
          className={
            isInverted ? "text-primary-foreground/80" : "text-muted-foreground"
          }
        >
          {description}
        </p>
      </div>
      <div className="mt-4 flex items-baseline">
        <span
          className={`text-4xl font-bold ${
            isInverted ? "text-primary-foreground" : ""
          }`}
        >
          {price}
        </span>
        {interval && (
          <span
            className={`ml-1 ${
              isInverted
                ? "text-primary-foreground/80"
                : "text-muted-foreground"
            }`}
          >
            {interval}
          </span>
        )}
      </div>
      <ul
        className={`mt-6 space-y-2 ${
          isInverted ? "text-primary-foreground" : ""
        }`}
      >
        {features.map((feature) => (
          <FeatureListItem key={feature} variant={variant}>
            {feature}
          </FeatureListItem>
        ))}
      </ul>
      <motion.div
        className="mt-8"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          className={`w-full ${
            isInverted
              ? "bg-background text-primary hover:bg-background/90"
              : ""
          }`}
        >
          {buttonText}
        </Button>
      </motion.div>
    </motion.div>
  );
}
