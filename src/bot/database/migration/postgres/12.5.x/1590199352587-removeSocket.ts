import { MigrationInterface, QueryRunner } from 'typeorm';

export class removeSocket1590199352587 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "socket"`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "socket" ("id" varchar PRIMARY KEY NOT NULL, "userId" integer NOT NULL, "type" varchar(10) NOT NULL, "accessToken" varchar(36), "refreshToken" varchar(36), "accessTokenTimestamp" bigint NOT NULL DEFAULT (0), "refreshTokenTimestamp" bigint NOT NULL DEFAULT (0))`, undefined);
  }

}
