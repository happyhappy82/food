"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4" role="main">
      <h1 className="text-4xl font-black text-gray-900 mb-4">
        문제가 발생했습니다
      </h1>
      <p className="text-gray-600 mb-8 max-w-md">
        페이지를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          다시 시도
        </button>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}
