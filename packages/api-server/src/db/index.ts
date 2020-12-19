import { createConnection, Connection } from 'typeorm'

let connection: Connection|null=null

export async function connectToDatabase() {
  connection = await createConnection()
}

export function getConnection() {
  if (!connection) throw new Error('Not connected!')
  return connection
}
