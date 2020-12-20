import { MigrationInterface, QueryRunner } from 'typeorm'

export class RootTenant1608490434944 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO tenant (id, name, handle) VALUES ('a5cf67f3-bc52-43f6-9988-68c45d1a2d10', 'ZAuth Root Tenant', 'root')"
    )

    await queryRunner.query(`
        INSERT INTO application (id, name, tenant) VALUES('a5cf67f3-bc52-43f6-9988-68c45d1a2d11', 'zauth-oauth', 'a5cf67f3-bc52-43f6-9988-68c45d1a2d10'
      `)

    await queryRunner.query(`
        INSERT INTO application (id, name, tenant) VALUES('a5cf67f3-bc52-43f6-9988-68c45d1a2d12', 'zauth-management', 'a5cf67f3-bc52-43f6-9988-68c45d1a2d10')
      `)
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
