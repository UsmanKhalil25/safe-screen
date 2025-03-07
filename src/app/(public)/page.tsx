"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  Share2,
  Lock,
  FileCheck,
  Users,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredItems } from "@/components/ui/staggered-items";

import { Header } from "./components/header";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <AnimatedSection
                direction="left"
                className="flex flex-col justify-center space-y-4"
                duration={0.7}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Secure File Storage & Sharing Made Simple
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    SafeScreen provides a secure place to store your files and
                    share them with others using protected links.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </motion.div>
                </div>
              </AnimatedSection>
              <AnimatedSection
                direction="right"
                className="flex items-center justify-center"
                duration={0.7}
              >
                <motion.div
                  className="relative w-full max-w-[500px] aspect-video overflow-hidden rounded-xl border shadow-xl"
                  initial={{ y: 20 }}
                  animate={{ y: [20, 0, 20] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src="/placeholder.svg?height=500&width=800"
                    width={800}
                    height={500}
                    alt="SafeScreen Dashboard Preview"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </motion.div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted/50"
        >
          <div className="container px-4 md:px-6">
            <AnimatedSection
              className="flex flex-col items-center justify-center space-y-4 text-center"
              duration={0.7}
            >
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Everything you need for secure file management
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeScreen combines powerful security features with an
                  intuitive interface to keep your files protected.
                </p>
              </div>
            </AnimatedSection>
            <StaggeredItems
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
              staggerDelay={0.1}
              containerDelay={0.2}
            >
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">End-to-End Encryption</h3>
                <p className="text-center text-muted-foreground">
                  Your files are encrypted before they leave your device,
                  ensuring maximum security.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Share2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Sharing</h3>
                <p className="text-center text-muted-foreground">
                  Share files with anyone using protected links with optional
                  passwords and expiration dates.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">File Version History</h3>
                <p className="text-center text-muted-foreground">
                  Access previous versions of your files and restore them with a
                  single click.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Team Collaboration</h3>
                <p className="text-center text-muted-foreground">
                  Work together with your team on shared files with granular
                  permission controls.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Access Controls</h3>
                <p className="text-center text-muted-foreground">
                  Set permissions for who can view, edit, or share your files
                  and folders.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-6 w-6 text-primary"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold">Activity Monitoring</h3>
                <p className="text-center text-muted-foreground">
                  Track who accessed your files and when, with detailed activity
                  logs.
                </p>
              </div>
            </StaggeredItems>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, secure, and straightforward
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SafeScreen makes secure file storage and sharing as easy as
                  1-2-3.
                </p>
              </div>
            </AnimatedSection>
            <StaggeredItems
              className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3"
              direction="up"
              staggerDelay={0.2}
            >
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  1
                </motion.div>
                <h3 className="text-xl font-bold">Upload Your Files</h3>
                <p className="text-center text-muted-foreground">
                  Simply drag and drop your files into SafeScreen. They're
                  automatically encrypted for protection.
                </p>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Upload illustration"
                    className="rounded-lg border shadow-sm"
                  />
                </motion.div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  2
                </motion.div>
                <h3 className="text-xl font-bold">Organize & Manage</h3>
                <p className="text-center text-muted-foreground">
                  Create folders, add tags, and organize your files however you
                  prefer.
                </p>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Organize illustration"
                    className="rounded-lg border shadow-sm"
                  />
                </motion.div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <motion.div
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-3xl font-bold text-primary-foreground"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  3
                </motion.div>
                <h3 className="text-xl font-bold">Share Securely</h3>
                <p className="text-center text-muted-foreground">
                  Generate secure links to share with others, with optional
                  passwords and expiration dates.
                </p>
                <motion.div
                  whileHover={{
                    y: -5,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    width={300}
                    height={200}
                    alt="Share illustration"
                    className="rounded-lg border shadow-sm"
                  />
                </motion.div>
              </div>
            </StaggeredItems>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Trusted by thousands
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users have to say about SafeScreen.
                </p>
              </div>
            </AnimatedSection>
            <StaggeredItems
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3"
              direction="up"
              distance={20}
              staggerDelay={0.15}
            >
              <motion.div
                className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "SafeScreen has completely transformed how our team shares
                    sensitive documents with clients. The secure links feature
                    is a game-changer."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sarah Johnson</p>
                    <p className="text-xs text-muted-foreground">
                      Financial Advisor
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "As a healthcare provider, data security is paramount.
                    SafeScreen gives us peace of mind with its end-to-end
                    encryption and access controls."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Dr. Michael Chen</p>
                    <p className="text-xs text-muted-foreground">
                      Medical Director
                    </p>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-col justify-between space-y-4 rounded-lg border bg-background p-6 shadow-sm"
                whileHover={{
                  y: -10,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <div className="flex space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-yellow-400"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    "The ability to set expiration dates on shared links has
                    been invaluable for our legal team. SafeScreen is now an
                    essential part of our workflow."
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted p-1">
                    <div className="h-8 w-8 rounded-full bg-primary/20" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Amanda Rodriguez</p>
                    <p className="text-xs text-muted-foreground">
                      Legal Counsel
                    </p>
                  </div>
                </div>
              </motion.div>
            </StaggeredItems>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <AnimatedSection className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple, transparent pricing
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you or your team.
                </p>
              </div>
            </AnimatedSection>
            <StaggeredItems
              className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3"
              containerDelay={0.2}
            >
              <motion.div
                className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Personal</h3>
                  <p className="text-muted-foreground">
                    Perfect for individual use
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    10GB storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Secure file sharing
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    End-to-end encryption
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    7-day file history
                  </li>
                </ul>
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full">Get Started</Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-col rounded-lg border bg-primary p-6 shadow-sm"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-primary-foreground">
                    Professional
                  </h3>
                  <p className="text-primary-foreground/80">
                    For professionals and small teams
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold text-primary-foreground">
                    $19
                  </span>
                  <span className="ml-1 text-primary-foreground/80">
                    /month
                  </span>
                </div>
                <ul className="mt-6 space-y-2 text-primary-foreground">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    100GB storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Advanced sharing controls
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Team collaboration
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    30-day file history
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Priority support
                  </li>
                </ul>
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full bg-background text-primary hover:bg-background/90">
                    Get Started
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex flex-col rounded-lg border bg-background p-6 shadow-sm"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Enterprise</h3>
                  <p className="text-muted-foreground">
                    For large organizations
                  </p>
                </div>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <ul className="mt-6 space-y-2">
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Unlimited storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Advanced security features
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Custom integration
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Unlimited file history
                  </li>
                  <li className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4 text-primary"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    24/7 dedicated support
                  </li>
                </ul>
                <motion.div
                  className="mt-8"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full">Contact Sales</Button>
                </motion.div>
              </motion.div>
            </StaggeredItems>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <AnimatedSection
              className="flex flex-col items-center justify-center space-y-4 text-center"
              direction="up"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to secure your files?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
                  Join thousands of users who trust SafeScreen with their most
                  important data.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-background text-primary hover:bg-background/90"
                  >
                    Get Started for Free
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Schedule a Demo
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">SafeScreen</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure file storage and sharing for individuals and teams.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Enterprise
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:text-primary">
                    GDPR
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} SafeScreen. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
