This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## API Endpoints

### Menu Management

#### Get All Menu Items
```http
GET /restaurant/main/get-all-menu-items/:restaurantId
```
Retrieves all menu items for a specific restaurant.

**Parameters:**
- `restaurantId`: Restaurant ID (path parameter)

**Headers:**
- `Authorization`: Bearer token

**Response:**
- Returns an array of menu items

#### Delete Category
```http
DELETE /restaurant/main/delete-category/:categoryId
```
Deletes a specific category.

**Parameters:**
- `categoryId`: Category ID (path parameter)

**Headers:**
- `Authorization`: Bearer token

**Notes:**
- Categories associated with menu items cannot be deleted
- Returns no response body

### Table Management

#### Delete Table
```http
DELETE /restaurant/main/delete-table/:tableId
```
Deletes a specific table from the restaurant.

**Parameters:**
- `tableId`: Table ID (path parameter)

**Headers:**
- `Authorization`: Bearer token

**Notes:**
- Tables with reservations for today or future dates cannot be deleted
- Tables with unpaid orders cannot be deleted
- Returns no response body

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
