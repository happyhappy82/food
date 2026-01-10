import Header from "@/components/Header";
import RestaurantCard from "@/components/RestaurantCard";
import { getSortedPropertiesData } from "@/lib/restaurants";

export default function Home() {
  const restaurants = getSortedPropertiesData();

  return (
    <>
      <Header />
      <main>
        <div className="relative -top-[10px] flex flex-col gap-8">
          {restaurants.length === 0 ? (
            <p>No restaurants yet. Create your first property in content/restaurants/</p>
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
