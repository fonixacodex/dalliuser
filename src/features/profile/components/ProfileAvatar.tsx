"use client";

import Image from "next/image";

interface ProfileAvatarProps {
  avatar: string;
}

export default function ProfileAvatar({ avatar }: ProfileAvatarProps) {
  return (
    <div className="shrink-0">
      <div className="w-20 h-20 rounded-full bg-linear-to-r from-blue-500 to-purple-600 p-0.5">
        <div className="w-full h-full rounded-full bg-white dark:bg-gray-800 p-0.5">
          <Image
            src={avatar}
            alt="Profile"
            width={80}
            height={80}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}