# E-Mart E-Commerce Application: Comprehensive Project Details

## 1. Project Overview
**E-Mart** is a fully functional, React-based frontend e-commerce application. It features a modern, premium "glassmorphism" aesthetic, dual dark themes, and a robust product catalog that pulls directly from local asset directories. The application is designed with a responsive, component-based architecture making it highly scalable and easy to maintain.

## 2. Core Features
-   **Dual Dark Theme System**: Features a custom-built, premium dual-dark mode (Aurora Midnight & Crimson Sunrise) that uses root CSS variables for dynamic switching across the entire application interface.
-   **Premium "Side-Banner" Layout**: Every homepage category utilizes a customized "deal-container" layout. This consists of a high-quality promotional banner on the left alongside a horizontally scrolling product slider on the right.
-   **Shopping Cart State Management**: Uses a React context provider (`CartContext`) to globally manage the user's cart state, allowing seamless adding and tracking of products.
-   **Dynamic Currency Standard**: Cleanly utilizes the standard Indian Rupee (₹) symbol across all products.
-   **Category Filtering Mechanism**: The individual product pages feature a sidebar that actively filters products based on brand checkboxes.

## 3. Product Catalog & Categories
The application now supports **15 completely unique** product categories, successfully utilizing every single item stored in the `public/assets` directory. Each category has its own Homepage Banner, Grid Page, and Single Product view.

1.  **Mobiles**: Smartphones from top brands like Apple, Samsung, and OnePlus.
2.  **Computers**: Laptops and PCs.
3.  **Watches**: Analog and smartwatches.
4.  **Men's Fashion**: Clothing, footwear, and accessories for men.
5.  **Women's Fashion**: Dresses, tops, and fashion accessories.
6.  **Furniture**: Premium seating, beds, dining sets, and wardrobes.
7.  **AC**: Split, Window, and Tower air conditioning units.
8.  **Fridge**: Single door, double door, and multi-door refrigerators.
9.  **Rice Cookers**: Dedicated cooking appliances.
10. **Sneakers**: Trendy footwear.
11. **Fans**: Ceiling, pedestal, and table cooling fans.
12. **Books**: Classic literature, fantasy, and mystery novels.
13. **TVs**: Smart OLED, QLED, and 4K televisions.
14. **Speakers**: Portable and home audio gear from Bose, Sony, and more.
15. **Kitchen Appliances**: Blenders, kettles, microwaves, and juicers.

## 4. Application Routing & Component Structure
The application is governed by `react-router-dom` in `App.jsx`, directing users to:

-   **`/`**: The main Landing Page, rendering the `Products.jsx` container which lists all 15 category banner strips.
-   **`/:category`**: The grid-view pages (e.g., `/mobiles`, `/kitchen`, `/books`) where users can filter arrays of appliances by brand.
-   **`/:category/:id`**: The single product pages (e.g., `/mobiles/2`) that show high-resolution product images, descriptions, prices, and the "Add to Cart" button.
-   **`/cart`**: The shopping cart page that displays all selected items and dynamically calculates the final price based on the selected theme.
-   **`CategoryStrip.jsx`**: The top circular-icon navigation bar rendering local, high-quality AI generated visual representations for Top Offers, Travel, Beauty, Fans, and more.

## 5. Technology Stack
*   **Framework**: React.js (Vite)
*   **Routing**: React Router (`react-router-dom`)
*   **Styling**: Pure CSS (`App.css`, `index.css`) with CSS variable theming.
*   **State Management**: React Context API (`CartContext.jsx`, `UserContext.jsx`)
*   **Asset Management**: Local `/public/assets` architecture.
