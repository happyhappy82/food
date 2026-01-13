import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mb-14 flex flex-row place-content-between" role="banner">
      <nav className="flex items-center gap-3" aria-label="메인 네비게이션">
        <Link
          href="/"
          className="inline-block"
          aria-label="테이스트 가이드 홈으로 이동"
        >
          <Image
            src="/logo.png"
            alt="테이스트 가이드 로고"
            width={180}
            height={40}
            priority
          />
        </Link>
      </nav>
    </header>
  );
}
