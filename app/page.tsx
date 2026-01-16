import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { getSortedPropertiesData } from "@/lib/restaurants";

export default function Home() {
  const restaurants = getSortedPropertiesData();

  return (
    <>
      <Header />
      <main role="main">
        <h1 className="sr-only">테이스트 가이드 - 한국 지역별 맛집 정보</h1>
        <div className="flex flex-col gap-8 -mt-[10px]">
          {restaurants.length === 0 ? (
            <p className="text-gray-600">아직 등록된 맛집이 없습니다.</p>
          ) : (
            restaurants.map((property) => (
              <RestaurantCard key={property.slug} {...property} />
            ))
          )}
        </div>
      </main>
    </>
  );
}
