// lib/reservations.js
export async function getReservationAnalytics() {
  // Fetch data from your database
  return {
    totalTables: 20,
    reservedTables: 8,
    servedTables: 6,
    occupancyRate: 40,
  };
}
