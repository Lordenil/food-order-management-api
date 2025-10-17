import pool from "./db";

async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("✅ Conexión a PostgreSQL exitosa");

    const result = await client.query("SELECT version() as postgres_version");
    console.log("Versión de PostgreSQL:", result.rows[0].postgres_version);

    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log("Tablas en la base de datos:");
    tables.rows.forEach((table, index) => {
      console.log(`${index + 1}. ${table.table_name}`);
    });

    client.release();
  } catch (error) {
    console.error("❌ Error conectando a PostgreSQL:", error);
  } finally {
    await pool.end();
  }
}

if (require.main === module) {
  testConnection();
}

export { testConnection };
