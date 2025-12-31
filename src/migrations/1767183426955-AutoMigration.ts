import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1767183426955 implements MigrationInterface {
    name = 'AutoMigration1767183426955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "check_in" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "resolutionId" uuid, "anonymousUserId" uuid, CONSTRAINT "PK_9c026e16735aea10812a3888d6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "ai_responses" ADD "isKept" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "check_in" ADD CONSTRAINT "FK_409304450a29d9bd6e4530ca976" FOREIGN KEY ("resolutionId") REFERENCES "resolutions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "check_in" ADD CONSTRAINT "FK_a6ce24d2aeaf098a3d3f2cf159d" FOREIGN KEY ("anonymousUserId") REFERENCES "anonymous_users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "check_in" DROP CONSTRAINT "FK_a6ce24d2aeaf098a3d3f2cf159d"`);
        await queryRunner.query(`ALTER TABLE "check_in" DROP CONSTRAINT "FK_409304450a29d9bd6e4530ca976"`);
        await queryRunner.query(`ALTER TABLE "ai_responses" DROP COLUMN "isKept"`);
        await queryRunner.query(`DROP TABLE "check_in"`);
    }

}
