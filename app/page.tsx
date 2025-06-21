"use client";

import type React from "react";

import { useState } from "react";
import { Upload, Monitor, Smartphone, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
      <div className="relative h-48 bg-gradient-to-r from-blue-600 to-blue-700">
        {bannerImage && (
          <img
            src={bannerImage || "/placeholder.svg"}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-lg font-medium">
                Your banner will appear here
              </div>
              <div className="text-sm">Recommended: 1584 x 396 pixels</div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-6">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-xs">Profile</div>
                  <div className="text-xs">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-20">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{name}</h1>
              <p className="text-lg text-gray-700 mb-2">{headline}</p>
              <p className="text-sm text-gray-500 mb-3">
                Location • 500+ connections
              </p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Open to
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-600 text-blue-600"
                >
                  Add profile section
                </Button>
                <Button size="sm" variant="outline">
                  More
                </Button>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Company Logo</div>
              <div className="w-16 h-16 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LinkedInMobilePreview = () => (
    <div className="w-full max-w-sm mx-auto bg-white rounded-none overflow-hidden shadow-lg">
      {/* Banner Section - LinkedIn mobile has less height */}
      <div className="relative h-24 bg-gradient-to-r from-blue-600 to-blue-700">
        {bannerImage && (
          <img
            src={bannerImage || "/placeholder.svg"}
            alt="Banner"
            className="w-full h-full object-cover"
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
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture - smaller on mobile, positioned differently */}
        <div className="absolute -top-8 left-4">
          <div className="w-16 h-16 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-xs">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="pt-12">
          <h1 className="text-lg font-semibold text-gray-900 mb-1">{name}</h1>
          <p className="text-sm text-gray-700 mb-2">{headline}</p>
          <p className="text-xs text-gray-500 mb-3">
            Location • 500+ connections
          </p>

          {/* Mobile-specific button layout */}
          <div className="space-y-2">
            <Button
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 w-full text-sm"
            >
              Open to work
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="border-blue-600 text-blue-600 flex-1 text-xs"
              >
                Add section
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-xs">
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
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-blue-500">
        {bannerImage && (
          <img
            src={bannerImage || "/placeholder.svg"}
            alt="Banner"
            className="w-full h-full object-cover"
          />
        )}
        {!bannerImage && (
          <div className="flex items-center justify-center h-full text-white/70">
            <div className="text-center">
              <div className="text-lg font-medium">
                Your banner will appear here
              </div>
              <div className="text-sm">Recommended: 1500 x 500 pixels</div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture */}
        <div className="absolute -top-16 left-4">
          <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <div className="text-xs">Profile</div>
                  <div className="text-xs">Photo</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4 gap-2">
          <Button size="sm" variant="outline" className="rounded-full">
            More
          </Button>
          <Button size="sm" variant="outline" className="rounded-full">
            Message
          </Button>
          <Button size="sm" className="bg-black hover:bg-gray-800 rounded-full">
            Follow
          </Button>
        </div>

        {/* Profile Info */}
        <div className="pt-4">
          <div className="flex items-center gap-1 mb-1">
            <h1 className="text-xl font-bold text-gray-900">{name}</h1>
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 text-white text-xs">✓</div>
            </div>
          </div>
          <p className="text-gray-500 mb-3">
            @{name.toLowerCase().replace(/\s+/g, "")}
          </p>
          <p className="text-gray-900 mb-3">{headline}</p>
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

  const TwitterMobilePreview = () => (
    <div className="w-full max-w-sm mx-auto bg-white rounded-none overflow-hidden shadow-lg">
      {/* Banner Section - Twitter mobile maintains aspect ratio */}
      <div className="relative h-24 bg-gradient-to-r from-blue-400 to-blue-500">
        {bannerImage && (
          <img
            src={bannerImage || "/placeholder.svg"}
            alt="Banner"
            className="w-full h-full object-cover"
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
      </div>

      {/* Profile Section */}
      <div className="relative px-4 pb-4">
        {/* Profile Picture - Twitter mobile specific positioning */}
        <div className="absolute -top-8 left-4">
          <div className="w-16 h-16 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
            {profileImage ? (
              <img
                src={profileImage || "/placeholder.svg"}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
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
            className="rounded-full px-3 py-1 text-xs border-gray-300"
          >
            <span className="text-lg">•••</span>
          </Button>
          <Button
            size="sm"
            className="bg-black hover:bg-gray-800 rounded-full px-4 py-1 text-xs"
          >
            Follow
          </Button>
        </div>

        {/* Profile Info */}
        <div className="pt-2">
          <div className="flex items-center gap-1 mb-1">
            <h1 className="text-base font-bold text-gray-900">{name}</h1>
            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
              <svg
                className="w-2.5 h-2.5 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
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
      icon: Linkedin,
      bannerDimensions: "1584 x 396 pixels",
      profileDimensions: "400 x 400 pixels",
      DesktopComponent: LinkedInDesktopPreview,
      MobileComponent: LinkedInMobilePreview,
    },
    twitter: {
      name: "Twitter",
      icon: Twitter,
      bannerDimensions: "1500 x 500 pixels",
      profileDimensions: "400 x 400 pixels",
      DesktopComponent: TwitterDesktopPreview,
      MobileComponent: TwitterMobilePreview,
    },
  };

  const currentPlatform = platformConfig[platform];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Social Media Banner Preview Tool
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Preview how your profile will look on LinkedIn and Twitter before
              you upload. Perfect your professional presence with our free
              preview tool.
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 text-gray-600">
                <Linkedin className="w-5 h-5" />
                <span>LinkedIn</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Twitter className="w-5 h-5" />
                <span>Twitter</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Platform Selection */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Choose Platform</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-4">
              <Button
                variant={platform === "linkedin" ? "default" : "outline"}
                onClick={() => setPlatform("linkedin")}
                className="flex items-center gap-2 px-6 py-3"
              >
                <Linkedin className="w-5 h-5" />
                LinkedIn
              </Button>
              <Button
                variant={platform === "twitter" ? "default" : "outline"}
                onClick={() => setPlatform("twitter")}
                className="flex items-center gap-2 px-6 py-3"
              >
                <Twitter className="w-5 h-5" />
                Twitter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Customization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <currentPlatform.icon className="w-5 h-5" />
              Customize Your {currentPlatform.name} Profile
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
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headline">Professional Headline</Label>
                <Input
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter your professional title"
                />
              </div>
            </div>

            {/* Image Uploads */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Banner Upload */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Banner Image</h3>
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
                  />
                  <Button
                    variant="outline"
                    className="w-full h-12 border-dashed border-2"
                    asChild
                  >
                    <label htmlFor="banner-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Banner Image
                    </label>
                  </Button>
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
              </div>

              {/* Profile Upload */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Profile Image</h3>
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
                  />
                  <Button
                    variant="outline"
                    className="w-full h-12 border-dashed border-2"
                    asChild
                  >
                    <label htmlFor="profile-upload" className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Profile Image
                    </label>
                  </Button>
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
            </div>
          </CardContent>
        </Card>

        {/* Preview Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <currentPlatform.icon className="w-5 h-5" />
              {currentPlatform.name} Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Tabs defaultValue="desktop" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger
                  value="desktop"
                  className="flex items-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Desktop Preview
                </TabsTrigger>
                <TabsTrigger value="mobile" className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  Mobile Preview
                </TabsTrigger>
              </TabsList>

              <TabsContent value="desktop" className="mt-0">
                <div className="bg-gray-100 p-6 rounded-lg">
                  <currentPlatform.DesktopComponent />
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="mt-0">
                <div className="bg-gray-100 p-6 rounded-lg flex justify-center">
                  <currentPlatform.MobileComponent />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Tips Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Pro Tips for {currentPlatform.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Banner Image Tips</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    • Use {currentPlatform.bannerDimensions} for optimal quality
                  </li>
                  <li>
                    • Keep important content away from profile picture area
                  </li>
                  <li>• Use high-contrast colors for better visibility</li>
                  <li>• Ensure text is readable on mobile devices</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Profile Image Tips</h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>
                    • Use square images ({currentPlatform.profileDimensions})
                  </li>
                  <li>• Ensure your face is clearly visible</li>
                  <li>• Use good lighting and high resolution</li>
                  <li>• Professional headshots work best</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-600">
            Made with ❤️ for professionals who care about their online presence
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Free tool • No registration required • Your images stay private
          </p>
        </div>
      </div>
    </div>
  );
}
