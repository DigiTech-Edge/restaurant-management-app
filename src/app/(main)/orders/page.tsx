import PageHeader from "@/components/global/PageHeader";
import CompletedCard from "@/components/pages/orders/CompletedCard";
import OrderCard from "@/components/pages/orders/OrderCard";
import { updateSearchParams } from "@/services/actions/searchParams.action";

const orderStatuses = ["Incoming", "Processing", "Completed"];

const IncomingOrders = [
  {
    orders: [
      {
        name: "Bruschetta",
        quantity: 1,
        ingredients: "toasted bread, diced tomatoes, garlic, basil, olive oil",
        price: 80,
      },
      {
        name: "Stuffed Mushrooms",
        quantity: 2,
        ingredients: "button mushrooms, breadcrumbs, herbs, garlic, cheese",
        price: 160,
      },
      {
        name: "Spring Rolls",
        quantity: 3,
        ingredients:
          "rice paper, vegetables (carrots, cucumber, lettuce), herbs, rice noodles",
        price: 150,
      },
    ],
    orderTime: "18:00",
    tableNumber: "17",
    orderNumber: "123456",
    paymentMethod: "Cash",
    orderType: "Dine In",
  },
  {
    orders: [
      {
        name: "Margherita Pizza",
        quantity: 1,
        ingredients: "tomato sauce, mozzarella, basil",
        price: 120,
      },
      {
        name: "Caesar Salad",
        quantity: 1,
        ingredients:
          "romaine lettuce, croutons, parmesan cheese, caesar dressing",
        price: 90,
      },
    ],
    orderTime: "18:15",
    tableNumber: "23",
    orderNumber: "123457",
    paymentMethod: "Credit Card",
    orderType: "Dine In",
  },
];

const ProcessingOrders = [
  {
    orders: [
      {
        name: "Spaghetti Carbonara",
        quantity: 2,
        ingredients:
          "spaghetti, eggs, pecorino cheese, guanciale, black pepper",
        price: 180,
      },
      {
        name: "Tiramisu",
        quantity: 1,
        ingredients: "ladyfingers, coffee, mascarpone cheese, cocoa powder",
        price: 70,
      },
    ],
    orderTime: "17:45",
    tableNumber: "8",
    orderNumber: "123455",
    paymentMethod: "Cash",
    orderType: "Dine In",
  },
];

const CompletedOrders = [
  {
    orders: [
      {
        name: "Grilled Salmon",
        quantity: 2,
        ingredients: "salmon fillet, lemon, herbs, olive oil",
        price: 220,
      },
      {
        name: "Chocolate Mousse",
        quantity: 2,
        ingredients: "dark chocolate, heavy cream, eggs, sugar",
        price: 80,
      },
    ],
    orderTime: "19:30",
    tableNumber: "12",
    orderNumber: "123458",
    paymentMethod: "Credit Card",
    orderType: "Dine In",
  },
  {
    orders: [
      {
        name: "Vegetarian Lasagna",
        quantity: 1,
        ingredients: "lasagna noodles, vegetables, tomato sauce, cheese",
        price: 150,
      },
      {
        name: "Garlic Bread",
        quantity: 1,
        ingredients: "bread, garlic, butter, herbs",
        price: 40,
      },
    ],
    orderTime: "20:00",
    tableNumber: "5",
    orderNumber: "123459",
    paymentMethod: "Cash",
    orderType: "Takeout",
  },
];

export default function Orders({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const status = searchParams.status || "Incoming";

  const getStatusButtons = (status: string) => {
    switch (status.toLowerCase()) {
      case "incoming":
        return [
          { name: "Process", color: "#5F0101" },
          { name: "Print", color: "#5F0101" },
        ];
      case "processing":
        return [
          { name: "Complete", color: "#5F0101" },
          { name: "Print", color: "#5F0101" },
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <PageHeader title="Orders" />
      <div className="flex md:flex-row flex-col flex-wrap gap-6 my-8">
        {orderStatuses.map((orderStatus) => (
          <form
            key={orderStatus}
            action={updateSearchParams}
            className="flex-grow md:flex-grow-0"
          >
            <input type="hidden" name="status" value={orderStatus} />
            <button
              type="submit"
              className={`w-full md:w-60 min-w-[8rem] py-2 rounded-lg text-base ${
                status.toLowerCase() === orderStatus.toLowerCase()
                  ? "bg-[#5F0101] text-white"
                  : "bg-gray-200 text-[#5F0101] hover:opacity-70"
              }`}
            >
              {orderStatus}
            </button>
          </form>
        ))}
      </div>
      <div className="flex flex-wrap gap-4">
        {status.toLowerCase() === "incoming" &&
          IncomingOrders.map((order, index) => (
            <OrderCard
              key={index}
              {...order}
              delay={index * 0.2}
              statusButtons={getStatusButtons("incoming")}
              backgroundColor="#F3F4F6"
            />
          ))}
        {status.toLowerCase() === "processing" &&
          ProcessingOrders.map((order, index) => (
            <OrderCard
              key={index}
              {...order}
              delay={index * 0.2}
              statusButtons={getStatusButtons("processing")}
              backgroundColor="#F6D0D0"
            />
          ))}
        {status.toLowerCase() === "completed" &&
          CompletedOrders.map((order, index) => (
            <CompletedCard key={index} {...order} delay={index * 0.2} />
          ))}
      </div>
    </div>
  );
}
