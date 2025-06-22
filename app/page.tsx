"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TwitterCTA } from "@/components/TwitterCTA";
import Image from "next/image";

export default function SocialBannerPreview() {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [name, setName] = useState("Your Name");
  const [headline, setHeadline] = useState("Your Professional Title");
  const [platform, setPlatform] = useState<"linkedin" | "twitter">("linkedin");

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string) => void
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const LinkedInDesktopPreview = () => (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
      {/* Banner Section */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-blue-600 to-blue-700">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Linkedin Banner"
            width={1584}
            height={396}
            className="w-full h-full object-cover"
          />
        )}{" "}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-medium">
                Your banner will appear here
              </div>
              <div className="text-xs sm:text-sm">
                Recommended: 1584 x 396 pixels
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      {/* Profile Section */}
      <div className="relative px-3 sm:px-4 md:px-6 pb-4 md:pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-8 sm:-top-12 md:-top-16 left-3 sm:left-4 md:left-6">
          <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Linkedin User Profile Photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
                <div className="text-center">
                  <div className="text-xs">Profile</div>
                  <div className="text-xs hidden sm:block">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-12 sm:pt-16 md:pt-20">
          {" "}
          <div className="flex justify-between items-start">
            <div className="flex-1 pr-2">
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 block">
                {name}
              </span>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-2">
                {headline}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mb-3">
                Location • 500+ connections
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm"
                >
                  Open to
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600 text-xs sm:text-sm"
                >
                  Add profile section
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs sm:text-sm"
                >
                  More
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs sm:text-sm text-gray-500 mb-1">
                Company Logo
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const LinkedInMobilePreview = () => (
    <div className="w-full max-w-sm mx-auto bg-white rounded-none overflow-hidden shadow-lg">
      {/* Banner Section - LinkedIn mobile proper aspect ratio */}
      <div className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-700">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Linkedin Banner for Mobile"
            width={1584}
            height={396}
            className="w-full h-full object-cover object-center"
          />
        )}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-xs font-medium">Your banner</div>
              <div className="text-xs">will appear here</div>
            </div>
          </div>
        )}
      </div>{" "}
      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {" "}
        {/* Profile Picture - optimized for mobile LinkedIn display */}
        <div className="absolute -top-8 md:-top-16 left-4">
          <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Linkedin User Profile Photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
                <div className="text-center">
                  <div className="text-xs">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>{" "}
        {/* Profile Info */}
        <div className="pt-20">
          <div className="mb-3">
            <span className="text-xl font-semibold text-gray-900 block leading-tight">
              {name}
            </span>
            <p className="text-sm text-gray-700 mt-1 leading-tight">
              {headline}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Location • 500+ connections
            </p>
          </div>

          {/* Mobile-specific button layout - matches LinkedIn mobile app */}
          <div className="space-y-3">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 w-full text-sm font-medium rounded-full py-2"
            >
              Open to work
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-600 text-blue-600 flex-1 text-sm font-medium rounded-full"
              >
                Add section
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 text-sm font-medium rounded-full"
              >
                More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  const TwitterDesktopPreview = () => (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200">
      {/* Banner Section */}
      <div className="relative h-32 sm:h-40 md:h-48 bg-gradient-to-r from-blue-400 to-blue-500">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Twitter Banner"
            width={1500}
            height={500}
            className="w-full h-full object-cover"
          />
        )}{" "}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-sm sm:text-base md:text-lg font-medium">
                Your banner will appear here
              </div>
              <div className="text-xs sm:text-sm">
                Recommended: 1500 x 500 pixels
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative px-3 sm:px-4 pb-4">
        {/* Profile Picture */}
        <div className="absolute -top-8 sm:-top-12 md:-top-16 left-3 sm:left-4">
          <div className="w-16 h-16 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Twitter User Profile Photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
                <div className="text-center">
                  <div className="text-xs">Profile</div>
                  <div className="text-xs hidden sm:block">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-2 sm:pt-3 md:pt-4 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full text-xs sm:text-sm px-2 sm:px-3"
          >
            More
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-full text-xs sm:text-sm px-2 sm:px-3"
          >
            Message
          </Button>
          <Button
            size="sm"
            className="bg-black hover:bg-gray-800 rounded-full text-xs sm:text-sm px-2 sm:px-3"
          >
            Follow
          </Button>
        </div>

        {/* Profile Info */}
        <div className="pt-2 sm:pt-3 md:pt-4">
          {" "}
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900">
              {name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 24 24"
              fill="#1e40af"
              className="w-4 h-4 sm:w-5 sm:h-5"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2 sm:mb-3 text-sm sm:text-base">
            @{name.toLowerCase().replace(/\s+/g, "")}
          </p>
          <p className="text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
            {headline}
          </p>
          <div className="flex gap-4 text-xs sm:text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">123</strong> Following
            </span>
            <span>
              <strong className="text-gray-900">1.2K</strong> Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  const TwitterMobilePreview = () => (
    <div className="w-full max-w-sm mx-auto bg-white rounded-none overflow-hidden shadow-lg">
      {/* Banner Section - Twitter mobile proper aspect ratio */}
      <div className="relative h-28 bg-gradient-to-r from-blue-400 to-blue-500">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt="Twitter Banner for Mobile"
            width={1500}
            height={500}
            className="w-full h-full object-cover object-center"
          />
        )}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-xs font-medium">Your banner</div>
              <div className="text-xs">will appear here</div>
            </div>
          </div>
        )}
      </div>{" "}
      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {" "}
        {/* Profile Picture - Twitter mobile optimized sizing */}
        <div className="absolute -top-9 left-4">
          <div className="w-20 h-20 rounded-full border-4 border-white bg-gray-200 overflow-hidden shadow-sm">
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Twitter User Profile Photo"
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700">
                <div className="text-center">
                  <div className="text-xs">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Action Buttons - Twitter mobile layout */}
        <div className="flex justify-end pt-2 gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-full px-3 py-1 text-xs border-gray-300 h-8"
          >
            <span className="text-lg leading-none">•••</span>
          </Button>
          <Button
            size="sm"
            className="bg-black hover:bg-gray-800 rounded-full px-4 py-1 text-xs h-8 font-medium"
          >
            Follow
          </Button>
        </div>{" "}
        {/* Profile Info */}
        <div className="pt-4">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-base font-bold text-gray-900">{name}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="#1e40af"
              className="w-4 h-4"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944zm3.697 7.282a1 1 0 0 0 -1.414 0l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.32 1.497l2 2l.094 .083a1 1 0 0 0 1.32 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2 text-sm">
            @{name.toLowerCase().replace(/\s+/g, "")}
          </p>
          <p className="text-gray-900 mb-3 text-sm leading-relaxed">
            {headline}
          </p>
          {/* Twitter mobile stats */}
          <div className="flex gap-4 text-sm text-gray-500">
            <span>
              <strong className="text-gray-900">123</strong> Following
            </span>
            <span>
              <strong className="text-gray-900">1.2K</strong> Followers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
  const platformConfig = {
    linkedin: {
      name: "LinkedIn",
      icon: "/linkedin.svg",
      bannerDimensions: "1584 x 396 pixels",
      profileDimensions: "400 x 400 pixels",
      DesktopComponent: LinkedInDesktopPreview,
      MobileComponent: LinkedInMobilePreview,
    },
    twitter: {
      name: "Twitter",
      icon: "/twitter.svg",
      bannerDimensions: "1500 x 500 pixels",
      profileDimensions: "400 x 400 pixels",
      DesktopComponent: TwitterDesktopPreview,
      MobileComponent: TwitterMobilePreview,
    },
  };
  const currentPlatform = platformConfig[platform];
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100">
      {/* Hero Section */}
      <header>
        {" "}
        <nav className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center md:justify-start">
            <span className="text-base font-bold text-gray-900 flex items-center">
              <Image
                src="/logo.svg"
                alt="BannerPeek Logo - Social Media Banner Preview Tool"
                width={48}
                height={48}
                className="inline-block mr-2 w-8 h-8"
                priority
                quality={100}
              />
              BannerPeek
            </span>
          </div>
        </nav>{" "}
        {/* Hero Content */}
        <section className="max-w-6xl mx-auto px-4 py-8 text-center">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Preview Your Social Media Banners Before Going Live
          </h1>
          <p className="text-sm md:text-base text-gray-600 mb-8 max-w-3xl mx-auto">
            See exactly how your LinkedIn and Twitter banners and profile photos
            will appear on desktop and mobile devices. Free tool, no
            registration required, your images stay private.
          </p>
        </section>
      </header>{" "}
      <main className="max-w-6xl mx-auto px-4 pb-8">
        <article>
          {/* Platform Selection */}
          <section aria-labelledby="platform-selection">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle id="platform-selection" className="text-center">
                  <h2 className="text-xl">Choose Platform</h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {" "}
                <div className="flex justify-center gap-4">
                  <Button
                    variant={platform === "linkedin" ? "secondary" : "outline"}
                    onClick={() => setPlatform("linkedin")}
                    className="flex items-center gap-2 px-6 py-3"
                    aria-pressed={platform === "linkedin"}
                    aria-label="Select LinkedIn platform"
                  >
                    <Image
                      src="/linkedin.svg"
                      alt="LinkedIn Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    LinkedIn
                  </Button>
                  <Button
                    variant={platform === "twitter" ? "secondary" : "outline"}
                    onClick={() => setPlatform("twitter")}
                    className="flex items-center gap-2 px-6 py-3"
                    aria-pressed={platform === "twitter"}
                    aria-label="Select Twitter platform"
                  >
                    <Image
                      src="/twitter.svg"
                      alt="Twitter Icon"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    Twitter
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>{" "}
          {/* Profile Customization */}
          <section aria-labelledby="profile-customization">
            <Card className="mb-8">
              <CardHeader>
                {" "}
                <CardTitle id="profile-customization">
                  <h2 className="text-xl flex items-center gap-2">
                    <Image
                      src={currentPlatform.icon}
                      alt={`${currentPlatform.name} Icon`}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    Customize Your {currentPlatform.name} Profile
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name and Headline */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="headline">Professional Headline</Label>
                    <Input
                      id="headline"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Enter your professional title"
                      className="text-sm"
                    />
                  </div>
                </div>
                {/* Image Uploads */}
                <div className="grid md:grid-cols-2 gap-6">
                  {" "}
                  {/* Banner Upload */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">
                      Banner Image
                    </h3>
                    <p className="text-sm text-gray-600">
                      Recommended: {currentPlatform.bannerDimensions}
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setBannerImage)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="banner-upload"
                      />{" "}
                      <label
                        htmlFor="banner-upload"
                        className="w-full h-10 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors bg-white"
                      >
                        <Image
                          src="/upload.svg"
                          alt="Upload Icon"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Upload Banner Image
                        </span>
                      </label>
                    </div>
                    {bannerImage && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBannerImage(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Banner
                      </Button>
                    )}
                  </div>{" "}
                  {/* Profile Upload */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900">
                      Profile Image
                    </h3>
                    <p className="text-sm text-gray-600">
                      Recommended: {currentPlatform.profileDimensions}
                    </p>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, setProfileImage)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        id="profile-upload"
                      />{" "}
                      <label
                        htmlFor="profile-upload"
                        className="w-full h-10 border-dashed border-2 border-gray-300 rounded-md flex items-center justify-center gap-2 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors bg-white"
                      >
                        <Image
                          src="/upload.svg"
                          alt="Upload Icon"
                          width={16}
                          height={16}
                          className="w-4 h-4"
                        />
                        <span className="text-sm font-medium text-gray-700">
                          Upload Profile Image
                        </span>
                      </label>
                    </div>
                    {profileImage && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setProfileImage(null)}
                        className="text-red-600 hover:text-red-700"
                      >
                        Remove Profile
                      </Button>
                    )}
                  </div>
                </div>{" "}
              </CardContent>
            </Card>
          </section>
          {/* Preview Section */}
          <section aria-labelledby="preview-section">
            <Card>
              <CardHeader>
                {" "}
                <CardTitle id="preview-section">
                  <h2 className="text-xl flex items-center gap-2">
                    <Image
                      src={currentPlatform.icon}
                      alt={currentPlatform.name}
                      width={20}
                      height={20}
                      className="w-5 h-5"
                    />
                    {currentPlatform.name} Preview
                  </h2>
                </CardTitle>{" "}
              </CardHeader>{" "}
              <CardContent className="p-6">
                <Tabs defaultValue="desktop" className="w-full">
                  {" "}
                  <TabsList className="grid w-full grid-cols-2 mb-6 text-black">
                    <TabsTrigger
                      value="desktop"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Image
                        src="/monitor.svg"
                        alt="Monitor Icon"
                        width={16}
                        height={16}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      <span className="hidden xs:inline">Desktop</span> Preview
                    </TabsTrigger>
                    <TabsTrigger
                      value="mobile"
                      className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
                    >
                      <Image
                        src="/smartphone.svg"
                        alt="Smartphone Icon"
                        width={16}
                        height={16}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      <span className="hidden xs:inline">Mobile</span> Preview
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="desktop" className="mt-0">
                    <div className="bg-gray-100 p-3 sm:p-4 md:p-6 rounded-lg">
                      <currentPlatform.DesktopComponent />
                    </div>
                  </TabsContent>
                  <TabsContent value="mobile" className="mt-0">
                    <div className="bg-gray-100 p-3 sm:p-4 md:p-6 rounded-lg flex justify-center">
                      <currentPlatform.MobileComponent />
                    </div>{" "}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </section>
          {/* Tips Section */}
          <section aria-labelledby="tips-section">
            <Card className="mt-8">
              <CardHeader>
                <CardTitle id="tips-section">
                  <h2 className="text-xl">
                    Pro Tips for {currentPlatform.name}
                  </h2>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {" "}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Banner Image Tips</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>
                        • Use {currentPlatform.bannerDimensions} for optimal
                        quality
                      </li>
                      <li>
                        • Keep important content away from profile picture area
                      </li>
                      <li>• Use high-contrast colors for better visibility</li>
                      <li>• Ensure text is readable on mobile devices</li>
                      <li>
                        • Test how banner appears on both desktop and mobile
                      </li>
                      <li>• Mobile displays banner with reduced height</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Profile Image Tips</h3>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>
                        • Use square images ({currentPlatform.profileDimensions}
                        )
                      </li>
                      <li>• Ensure your face is clearly visible</li>
                      <li>• Use good lighting and high resolution</li>
                      <li>• Professional headshots work best</li>
                      <li>• Profile photo appears larger on mobile</li>
                      <li>• Center your face for consistent mobile cropping</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>{" "}
        </article>

        <TwitterCTA className="max-w-6xl mx-auto px-4 mb-8" />

        {/* Footer */}
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm font-semibold md:text-base px-4">
            Made with ❤️ for professionals
          </p>
          <p className="text-xs text-muted-foreground mt-2 px-8 md:text-sm">
            Free tool • No registration required • Your images stay private in
            your browser
          </p>
        </footer>
      </main>
    </main>
  );
}
