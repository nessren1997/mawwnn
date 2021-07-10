const tmp = (pathname: string, title: string) => ({ path: `/dashboard/manage/${pathname}`, title: title });

export const PermissionToMenuItem = (per: string) => {
  switch (per) {
    // case "manage cities":
    //   return tmp("cities", "Cities");

    case "manage branches":
      return tmp("branches", "Branches");

    case "manage products":
      return tmp("products", "Products");

    case "manage careers":
      return tmp("careers", "Careers");

    case "manage sliders":
      return tmp("sliders", "Slider");

    case "manage brands":
      return tmp("brands", "Brands");

    case "manage jobs":
      return tmp("jobs", "Jobs");

    case "manage coupons":
      return tmp("coupons", "Coupons");

    case "see gifts" || "manage gifts" || "manage cities":
      return [tmp("gifts", "Gifts"), tmp("winners", "Winners"), tmp("gifts-items", "Gift Items"), tmp("cities", "Cities")];

    case "manage events":
      return tmp("events", "Events");

    case "manage categories":
      return tmp("categories", "Categories");

    case "see orders" || "manage orders":
      return tmp("orders", "Orders");

    case "manage about-us":
      return tmp("about-us", "About Us");

    case "manage order-settings":
      return tmp("order-settings", "Order Settings");

    case "manage news-letters":
      return tmp("news-letters", "News Letters");

    case "manage users and roles":
      return tmp("users", "Users");

    case "manage delivery centers":
      return tmp("receiving-centers", "reciving_centers");
  }
};
