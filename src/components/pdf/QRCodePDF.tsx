import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

// PDF styles
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
  tableInfo: {
    fontSize: 18,
    color: "#1a202c",
    marginBottom: 5,
  },
  qrContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  instructions: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8fafc",
    borderRadius: 5,
  },
  instructionTitle: {
    fontSize: 14,
    color: "#2d3748",
    marginBottom: 10,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 5,
    lineHeight: 1.4,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#64748b",
    fontSize: 10,
    paddingTop: 15,
    borderTop: "1 solid #f0f0f0",
  },
});

interface QRCodeDocumentProps {
  table: {
    number: number;
    capacity: number;
  };
  qrCodeUrl: string;
  restaurantName?: string;
}

export const QRCodeDocument = ({
  table,
  qrCodeUrl,
  restaurantName = "Our Restaurant",
}: QRCodeDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.restaurantName}>{restaurantName}</Text>
        <Text style={styles.tableInfo}>Table {table.number}</Text>
        <Text style={styles.tableInfo}>Capacity: {table.capacity} persons</Text>
      </View>

      <View style={styles.qrContainer}>
        <Image src={qrCodeUrl} style={styles.qrCode} />
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>How to Use This QR Code:</Text>
        <Text style={styles.instructionText}>
          1. Open your smartphone's camera
        </Text>
        <Text style={styles.instructionText}>
          2. Point it at the QR code above
        </Text>
        <Text style={styles.instructionText}>
          3. Tap the notification that appears
        </Text>
        <Text style={styles.instructionText}>
          4. Browse our digital menu and place your order
        </Text>
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionTitle}>Note to Staff:</Text>
        <Text style={styles.instructionText}>
          • Place this QR code visibly on Table {table.number}
        </Text>
        <Text style={styles.instructionText}>
          • Ensure the QR code is clean and undamaged
        </Text>
        <Text style={styles.instructionText}>
          • Help guests if they need assistance scanning
        </Text>
        <Text style={styles.instructionText}>
          • For technical support, contact the restaurant manager
        </Text>
      </View>

      <View style={styles.footer}>
        <Text>Generated on {new Date().toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);
