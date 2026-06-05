"use client";

import { BadgeCheck, Link2 } from "lucide-react";
import Link from "next/link";
import { ProfileUser } from "../types/profile.types";

interface ProfileBioProps {
  user: ProfileUser;
}

export default function ProfileBio({ user }: ProfileBioProps) {
  const socialLinks = [
    { icon: () => <span className="text-lg">📷</span>, url: "https://instagram.com", color: "text-pink-500", label: "اینستاگرام" },
    { icon: () => <span className="text-lg">🐦</span>, url: "https://twitter.com", color: "text-blue-400", label: "توییتر" },
    { icon: () => <span className="text-lg">🔗</span>, url: "https://linkedin.com", color: "text-blue-600", label: "لینکدین" },
    { icon: () => <span className="text-lg">💻</span>, url: "https://github.com", color: "text-gray-700 dark:text-gray-300", label: "گیت‌هاب" },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center gap-1">
        <p className="font-semibold text-gray-900 dark:text-white">
          {user.name}
        </p>
        {user.isVerified && <BadgeCheck size={18} className="text-blue-500" />}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
        @{user.username}
      </p>
      <p className="text-sm text-gray-800 dark:text-gray-300 mt-2">
        {user.bio}
      </p>
 
      <div className="flex gap-3 mt-3">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <Link
              key={index}
              href={social.url}
              target="_blank"
              className={`${social.color} hover:opacity-80 transition-opacity`}
            >
              <Icon />
            </Link>
          );
        })}
      </div>
    </div>
  );
}