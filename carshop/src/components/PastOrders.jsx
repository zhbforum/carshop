"use client";

import { Clock } from "lucide-react";

export default function PastOrders({ orders }) {
  const formatDate = (date) =>
    new Date(date).toLocaleString("uk-UA", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="text-left max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-gray-800">
        <Clock className="w-6 h-6 text-lime-600 flex-shrink-0 self-start mt-1" />
        Останні замовлення
      </h2>

      <div className="space-y-4">
        {orders
          .slice()
          .reverse()
          .map((order, index) => (
            <div
              key={order.createdAt + index}
              className="bg-white rounded-lg shadow-2xl p-5 flex flex-col h-full"
            >
              <div className="text-sm text-gray-500 mb-2 flex items-center gap-2">
                📅 {formatDate(order.createdAt)}
              </div>

              {(order.name || order.phone || order.comment) && (
                <div className="text-sm text-gray-800 space-y-1 mb-2">
                  {order.name && (
                    <p>
                      <strong>Ім'я:</strong> {order.name}
                    </p>
                  )}
                  {order.phone && (
                    <p>
                      <strong>Телефон:</strong> {order.phone}
                    </p>
                  )}
                  <p>
                    <strong>Коментар:</strong>{" "}
                    {order.comment || <span className="text-gray-400">-</span>}
                  </p>
                </div>
              )}

              <ul className="text-sm text-gray-900 space-y-1 border-t border-gray-400 pt-2">
                {order.items.map((item, idx) => (
                  <li key={item.id + idx} className="grid grid-cols-[1fr_auto] gap-4 items-start">
                    <span>
                      {item.name} {item.quantity} шт.
                    </span>
                    <span>{item.price * item.quantity} ₴</span>
                  </li>
                ))}
              </ul>

              <div className="text-gray-900 font-semibold text-right min-w-[60px] border-t border-gray-400 mt-2 pt-4">
                Всього: {order.total} ₴
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
