"use client";

import React, { useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { useSession } from "next-auth/react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  ingredients: string;
}

interface InvoicePDFProps {
  orders: OrderItem[];
  orderTime: string;
  tableNumber: string;
  orderNumber: string;
  paymentMethod: string;
  orderType: string;
  isCompleted?: boolean;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "30 40",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "2 solid #f0f0f0",
    paddingBottom: 15,
  },
  restaurantName: {
    fontSize: 24,
    marginBottom: 8,
    color: "#2d3748",
    fontWeight: "bold",
  },
  orderInfo: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 5,
  },
  orderDetailColumn: {
    width: "50%",
    marginBottom: 10,
  },
  orderDetail: {
    flexDirection: "row",
    marginBottom: 6,
  },
  label: {
    width: 80,
    color: "#64748b",
    fontSize: 10,
  },
  value: {
    flex: 1,
    color: "#1a202c",
    fontSize: 10,
  },
  table: {
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    borderBottomStyle: "solid",
    paddingVertical: 8,
    minHeight: 30,
    alignItems: "center",
  },
  tableHeader: {
    backgroundColor: "#f8fafc",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    borderTopStyle: "solid",
  },
  itemName: {
    flex: 2,
    paddingRight: 15,
    fontSize: 10,
    color: "#2d3748",
  },
  quantity: {
    flex: 1,
    textAlign: "center",
    fontSize: 10,
    color: "#2d3748",
  },
  price: {
    flex: 1,
    textAlign: "right",
    fontSize: 10,
    color: "#2d3748",
    fontWeight: "bold",
  },
  total: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 20,
    paddingTop: 10,
    borderTop: "2 solid #f0f0f0",
  },
  totalLabel: {
    fontWeight: "bold",
    marginRight: 15,
    fontSize: 12,
    color: "#2d3748",
  },
  totalAmount: {
    fontSize: 12,
    color: "#2d3748",
    fontWeight: "bold",
  },
  qrSection: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 5,
  },
  qrText: {
    fontSize: 10,
    marginBottom: 10,
    color: "#64748b",
    fontStyle: "italic",
  },
  qrCode: {
    width: 100,
    height: 100,
  },
  footer: {
    marginTop: 20,
    textAlign: "center",
    color: "#64748b",
    fontSize: 9,
    borderTop: "1 solid #f0f0f0",
    paddingTop: 15,
  },
  headerAddress: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 4,
  },
  headerPhone: {
    color: "#64748b",
    fontSize: 10,
    marginTop: 2,
  },
});

const InvoicePDF: React.FC<InvoicePDFProps> = ({
  orders = [],
  orderTime,
  tableNumber,
  orderNumber,
  paymentMethod,
  orderType,
  isCompleted,
}) => {
  const { data: session } = useSession();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

  const total =
    orders?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  const generateQRValue = () => {
    if (!session?.user?.id) return "";
    const baseUrl = "https://my-restaurant-347.web.app/menu";
    const params = new URLSearchParams({
      tableNumber: tableNumber,
      restaurantId: session.user.id,
      payment: "paid",
      orderNumber: orderNumber,
      timestamp: new Date().toISOString(),
    });
    return `${baseUrl}?${params.toString()}`;
  };

  useEffect(() => {
    if (isCompleted) {
      // Create a temporary div to render the QR code
      const tempDiv = document.createElement("div");
      const qrCode = <QRCodeCanvas value={generateQRValue()} size={128} />;
      // @ts-ignore
      import("react-dom/client").then((ReactDOM) => {
        const root = ReactDOM.createRoot(tempDiv);
        root.render(qrCode);

        // Wait for the QR code to render
        setTimeout(() => {
          const canvas = tempDiv.querySelector("canvas");
          if (canvas) {
            // Convert canvas to base64
            const base64Data = canvas.toDataURL("image/png");
            setQrCodeUrl(base64Data);
          }
        }, 100);
      });
    }
  }, [isCompleted, session?.user?.id]);

  return (
    <div className="relative">
      <PDFViewer style={{ width: "100%", height: "600px" }}>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.header}>
              <Text style={styles.restaurantName}>
                {session?.user?.restaurant?.name || "Restaurant Name"}
              </Text>
              <Text style={styles.headerAddress}>123 Restaurant Street</Text>
              <Text style={styles.headerPhone}>
                {session?.user?.restaurant?.phone || "Phone Number"}
              </Text>
            </View>

            <View style={styles.orderInfo}>
              <View style={styles.orderDetailColumn}>
                <View style={styles.orderDetail}>
                  <Text style={styles.label}>Order #:</Text>
                  <Text style={styles.value}>{orderNumber}</Text>
                </View>
                <View style={styles.orderDetail}>
                  <Text style={styles.label}>Date:</Text>
                  <Text style={styles.value}>{orderTime}</Text>
                </View>
                <View style={styles.orderDetail}>
                  <Text style={styles.label}>Table #:</Text>
                  <Text style={styles.value}>{tableNumber}</Text>
                </View>
              </View>
              <View style={styles.orderDetailColumn}>
                <View style={styles.orderDetail}>
                  <Text style={styles.label}>Payment:</Text>
                  <Text style={styles.value}>{paymentMethod}</Text>
                </View>
                <View style={styles.orderDetail}>
                  <Text style={styles.label}>Type:</Text>
                  <Text style={styles.value}>{orderType}</Text>
                </View>
              </View>
            </View>

            <View style={styles.table}>
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={styles.itemName}>Item</Text>
                <Text style={styles.quantity}>Qty</Text>
                <Text style={styles.price}>Price</Text>
              </View>
              {orders.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.quantity}>{item.quantity}</Text>
                  <Text style={styles.price}>
                    Ghc {(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.total}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalAmount}>Ghc {total.toFixed(2)}</Text>
            </View>

            {isCompleted && (
              <View style={styles.qrSection}>
                <Text style={styles.qrText}>
                  Scan QR code after payment to confirm
                </Text>
                {qrCodeUrl && <Image src={qrCodeUrl} style={styles.qrCode} />}
              </View>
            )}

            <View style={styles.footer}>
              <Text>Thank you for choosing us!</Text>
              <Text style={{ marginTop: 3 }}>
                We hope to serve you again soon.
              </Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </div>
  );
};

export default InvoicePDF;
