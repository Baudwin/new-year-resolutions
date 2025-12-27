import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1766844653039 implements MigrationInterface {
    name = 'AutoMigration1766844653039'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "ai_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "model" character varying NOT NULL, "responseText" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "resolution_id" uuid, CONSTRAINT "REL_c279e84821c85d3bb87a7538e4" UNIQUE ("resolution_id"), CONSTRAINT "PK_3252c57346b1206934c19513797" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resolutions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "category" character varying, "isPublic" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "anonymous_user_id" uuid, CONSTRAINT "PK_e30e6dd3e4cc52a23555b4b1a4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "anonymous_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c1a63a32b14a1c8ee0a00c58421" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "usage_limits" ("anonymous_user_id" uuid NOT NULL, "date" date NOT NULL, "aiRequestsCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_a159569adfd09bf5575728b13ec" PRIMARY KEY ("anonymous_user_id", "date"))`);
        await queryRunner.query(`ALTER TABLE "ai_responses" ADD CONSTRAINT "FK_c279e84821c85d3bb87a7538e48" FOREIGN KEY ("resolution_id") REFERENCES "resolutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resolutions" ADD CONSTRAINT "FK_4d0daf267928bc834adb04dcdee" FOREIGN KEY ("anonymous_user_id") REFERENCES "anonymous_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usage_limits" ADD CONSTRAINT "FK_08df680c15147c9d8ca0cd0615a" FOREIGN KEY ("anonymous_user_id") REFERENCES "anonymous_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usage_limits" DROP CONSTRAINT "FK_08df680c15147c9d8ca0cd0615a"`);
        await queryRunner.query(`ALTER TABLE "resolutions" DROP CONSTRAINT "FK_4d0daf267928bc834adb04dcdee"`);
        await queryRunner.query(`ALTER TABLE "ai_responses" DROP CONSTRAINT "FK_c279e84821c85d3bb87a7538e48"`);
        await queryRunner.query(`DROP TABLE "usage_limits"`);
        await queryRunner.query(`DROP TABLE "anonymous_users"`);
        await queryRunner.query(`DROP TABLE "resolutions"`);
        await queryRunner.query(`DROP TABLE "ai_responses"`);
    }

}
